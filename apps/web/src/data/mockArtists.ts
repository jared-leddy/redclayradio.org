// Shared Modules
import { ArtistStatus } from '@redclayradio/utils/enums';
import type { Artist } from '@redclayradio/utils/interfaces';

/**
 * Temporary in-memory roster used to develop the lineup table before the web
 * client is wired to the live `/artist` API. The spread of statuses and the
 * `isActive` flags exist to exercise the status tabs and row states — remove
 * this module once real data is fetched.
 */
const mockArtists: Artist[] = [
  {
    id: '0a1b2c3d-0001-4a00-8000-000000000001',
    name: 'Ramseur Drifters',
    genres: ['Alt-Country', 'Americana'],
    location: 'Ramseur, NC, USA',
    status: ArtistStatus.Approved,
    isActive: true
  },
  {
    id: '0a1b2c3d-0002-4a00-8000-000000000002',
    name: 'Piedmont Static',
    genres: ['Noise Rock', 'Shoegaze'],
    location: 'Greensboro, NC, USA',
    status: ArtistStatus.Approved,
    isActive: true
  },
  {
    id: '0a1b2c3d-0003-4a00-8000-000000000003',
    name: 'Catawba Howl',
    genres: ['Sludge Metal', 'Doom'],
    location: 'Charlotte, NC, USA',
    status: ArtistStatus.Approved,
    isActive: true
  },
  {
    id: '0a1b2c3d-0004-4a00-8000-000000000004',
    name: 'Saluda Saints',
    genres: ['Indie Rock'],
    location: 'Columbia, SC, USA',
    status: ArtistStatus.Pending,
    isActive: true
  },
  {
    id: '0a1b2c3d-0005-4a00-8000-000000000005',
    name: 'Red Clay Revival',
    genres: ['Southern Rock', 'Blues Rock'],
    location: 'Asheville, NC, USA',
    status: ArtistStatus.Approved,
    isActive: true
  },
  {
    id: '0a1b2c3d-0006-4a00-8000-000000000006',
    name: 'Neuse River Noise',
    genres: ['Post-Hardcore'],
    location: 'Raleigh, NC, USA',
    status: ArtistStatus.Pending,
    isActive: true
  },
  {
    id: '0a1b2c3d-0007-4a00-8000-000000000007',
    name: 'Foothills Funeral',
    genres: ['Blackened Hardcore'],
    location: 'Boone, NC, USA',
    status: ArtistStatus.Rejected,
    isActive: false
  },
  {
    id: '0a1b2c3d-0008-4a00-8000-000000000008',
    name: 'Lowcountry Ghosts',
    genres: ['Dream Pop', 'Slowcore'],
    location: 'Charleston, SC, USA',
    status: ArtistStatus.Approved,
    isActive: true
  },
  {
    id: '0a1b2c3d-0009-4a00-8000-000000000009',
    name: 'Haw River Heretics',
    genres: ['Punk', 'Cowpunk'],
    location: 'Bynum, NC, USA',
    status: ArtistStatus.Pending,
    isActive: true
  },
  {
    id: '0a1b2c3d-0010-4a00-8000-000000000010',
    name: 'Uwharrie Drone',
    genres: ['Ambient', 'Drone'],
    location: 'Albemarle, NC, USA',
    status: ArtistStatus.Approved,
    isActive: false
  },
  {
    id: '0a1b2c3d-0011-4a00-8000-000000000011',
    name: 'Tar Heel Tremor',
    genres: ['Math Rock', 'Emo'],
    location: 'Durham, NC, USA',
    status: ArtistStatus.Pending,
    isActive: true
  },
  {
    id: '0a1b2c3d-0012-4a00-8000-000000000012',
    name: 'Blue Ridge Banshees',
    genres: ['Folk Metal'],
    location: 'Asheville, NC, USA',
    status: ArtistStatus.Approved,
    isActive: true
  },
  {
    id: '0a1b2c3d-0013-4a00-8000-000000000013',
    name: 'Cape Fear Cassette',
    genres: ['Synthwave', 'Darkwave'],
    location: 'Wilmington, NC, USA',
    status: ArtistStatus.Rejected,
    isActive: false
  },
  {
    id: '0a1b2c3d-0014-4a00-8000-000000000014',
    name: 'Sandhills Sermon',
    genres: ['Stoner Rock'],
    location: 'Fayetteville, NC, USA',
    status: ArtistStatus.Pending,
    isActive: true
  },
  {
    id: '0a1b2c3d-0015-4a00-8000-000000000015',
    name: 'Yadkin Valley Volts',
    genres: ['Garage Rock'],
    location: 'Winston-Salem, NC, USA',
    status: ArtistStatus.Approved,
    isActive: true
  },
  {
    id: '0a1b2c3d-0016-4a00-8000-000000000016',
    name: 'Congaree Collapse',
    genres: ['Metalcore'],
    location: 'Columbia, SC, USA',
    status: ArtistStatus.Pending,
    isActive: true
  },
  {
    id: '0a1b2c3d-0017-4a00-8000-000000000017',
    name: 'Pee Dee Prophets',
    genres: ['Gospel Soul', 'Funk'],
    location: 'Florence, SC, USA',
    status: ArtistStatus.Approved,
    isActive: true
  },
  {
    id: '0a1b2c3d-0018-4a00-8000-000000000018',
    name: 'Smoky Mountain Sirens',
    genres: ['Bluegrass', 'Old-Time'],
    location: 'Sylva, NC, USA',
    status: ArtistStatus.Approved,
    isActive: true
  },
  {
    id: '0a1b2c3d-0019-4a00-8000-000000000019',
    name: 'Iron District Idols',
    genres: ['Industrial', 'EBM'],
    location: 'Charlotte, NC, USA',
    status: ArtistStatus.Rejected,
    isActive: false
  },
  {
    id: '0a1b2c3d-0020-4a00-8000-000000000020',
    name: 'Outer Banks Oracle',
    genres: ['Surf Rock', 'Psych'],
    location: 'Nags Head, NC, USA',
    status: ArtistStatus.Pending,
    isActive: true
  }
];

export default mockArtists;
