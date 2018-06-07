import { SpotifyAlbum } from './spotifyAlbum'
import { SpotifyArtist } from './spotifyArtist'

export interface SpotifyCurrentlyPlayingContextItem {
  album: SpotifyAlbum
  artists: SpotifyArtist[]
  available_markets: any[]
  disc_number: number
  duration_ms: number
  explicit: boolean
  external_ids: {
    isrc: string
  }
  external_urls: {
    spotify: string
  }
  href: string
  id: string
  is_local: boolean
  name: string
  popularity: number
  preview_url: string
  track_number: number
  type: string
  uri: string
}
