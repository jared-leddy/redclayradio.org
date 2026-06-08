// NPM Modules
import { Injectable } from '@nestjs/common';
import axios from 'axios';

// Shared Modules
import type { MusicBrainzArea, MusicBrainzArtist, MusicBrainzArtistSearch } from '@redclayradio/utils/interfaces';

// MusicBrainz requires a descriptive User-Agent identifying the application and a contact.
const USER_AGENT = 'RedClayRadio/1.0 ( https://redclayradio.org )';
const API_URL = 'https://musicbrainz.org/ws/2';
// Cap how far up the area hierarchy we walk looking for the subdivision (state).
const MAX_AREA_DEPTH = 4;

/**
 * Reads artist metadata from the MusicBrainz web service. Given an artist name
 * it resolves the best match's origin (formatted as "City, State, Country" from
 * MusicBrainz's own area names) and its genre-candidate tags. This is a pure
 * upstream client: it knows nothing about our entities or genre vocabulary.
 *
 * Upstream/network failures are left to propagate to the global filters.
 */
@Injectable()
export default class MusicBrainzService {
  /**
   * Looks the artist up by name and returns its origin and genre-candidate tags.
   * Returns an empty tag list and no location when no match is found.
   */
  async searchArtistMetadata(name: string): Promise<{ location?: string; tags: string[] }> {
    const artist = await this.searchArtist(name);

    if (!artist) {
      return { tags: [] };
    }

    const location = await this.resolveLocation(artist);
    const tags = this.extractTags(artist);

    return { location, tags };
  }

  /**
   * Searches MusicBrainz for an artist by name and returns the top-scored match,
   * or `undefined` when there are no results.
   */
  private async searchArtist(name: string): Promise<MusicBrainzArtist | undefined> {
    const response = await axios<MusicBrainzArtistSearch>({
      method: 'get',
      url: `${API_URL}/artist/`,
      headers: { 'User-Agent': USER_AGENT },
      params: { fmt: 'json', query: this.escapeLuceneQuery(name) }
    });

    return response.data.artists?.[0];
  }

  /**
   * Returns the names of the artist's tags that have a positive vote count,
   * preserving MusicBrainz's ordering. Downvoted tags (count <= 0) are dropped.
   */
  private extractTags(artist: MusicBrainzArtist): string[] {
    return (artist.tags ?? []).filter((tag) => tag.count > 0).map((tag) => tag.name);
  }

  /**
   * Builds a "City, State, Country" string from the artist's areas using
   * MusicBrainz's raw names. The state is resolved by walking the founding
   * city's area hierarchy. Any part that can't be resolved is omitted, so the
   * result degrades to "City, Country" or less, and is `undefined` when nothing
   * is known.
   */
  private async resolveLocation(artist: MusicBrainzArtist): Promise<string | undefined> {
    const parts: string[] = [];
    const beginArea = artist['begin-area'];

    if (beginArea?.type === 'City' && beginArea.name) {
      parts.push(beginArea.name);
    }

    if (beginArea?.id) {
      const subdivision = await this.findSubdivision(beginArea.id);

      if (subdivision) {
        parts.push(subdivision);
      }
    }

    if (artist.area?.name) {
      parts.push(artist.area.name);
    }

    return parts.length ? parts.join(', ') : undefined;
  }

  /**
   * Walks up the `part of` chain from an area until it reaches a subdivision
   * (state/province) and returns its name, or `undefined` if none is found
   * within {@link MAX_AREA_DEPTH} hops.
   */
  private async findSubdivision(areaId: string, depth = 0): Promise<string | undefined> {
    if (depth >= MAX_AREA_DEPTH) {
      return undefined;
    }

    const area = await this.lookupArea(areaId);

    if (area.type === 'Subdivision') {
      return area.name;
    }

    const parent = area.relations?.find(
      (relation) => relation.type === 'part of' && relation.direction === 'backward'
    )?.area;

    if (!parent?.id) {
      return undefined;
    }

    return this.findSubdivision(parent.id, depth + 1);
  }

  /**
   * Fetches a single area with its hierarchy relations.
   */
  private async lookupArea(areaId: string): Promise<MusicBrainzArea> {
    const response = await axios<MusicBrainzArea>({
      method: 'get',
      url: `${API_URL}/area/${areaId}`,
      headers: { 'User-Agent': USER_AGENT },
      params: { fmt: 'json', inc: 'area-rels' }
    });

    return response.data;
  }

  /**
   * Escapes Lucene query-syntax special characters so an artist name is matched
   * literally (e.g. the slash in "AC/DC").
   */
  private escapeLuceneQuery(value: string): string {
    return value.replace(/([+\-!(){}[\]^"~*?:\\/&|])/g, '\\$1');
  }
}
