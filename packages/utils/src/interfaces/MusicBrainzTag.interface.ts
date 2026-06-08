/**
 * A community tag on a MusicBrainz artist. `count` is the net vote score and may
 * be negative when a tag has been downvoted.
 */
export default interface MusicBrainzTag {
  count: number;
  name: string;
}
