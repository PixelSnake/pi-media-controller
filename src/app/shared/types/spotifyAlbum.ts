import { SpotifyArtist } from './spotifyArtist'

export interface SpotifyAlbum {
  album_type: string
  artists: SpotifyArtist[]
  available_markets: any[]
  external_urls: {
    spotify: string
  }
  href: string
  id: string
  images: {
    width: number
    height: number
    url: string
  }[]
  name: string
  release_date: string
  release_date_precision: string
  type: string
  uri: string
}
