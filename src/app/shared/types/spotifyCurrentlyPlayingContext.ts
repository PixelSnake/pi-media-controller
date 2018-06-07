import { SpotifyCurrentlyPlayingContextItem } from './spotifyCurrentlyPlayingContextItem'

export interface SpotifyCurrentlyPlayingContext {
  device: {
    id: string
    is_active: boolean
    is_restricted: boolean
    name: string
    type: string
    volume_percent: number
  }

  shuffle_state: boolean
  repeat_state: string
  timestamp: string

  context: {
    external_urls: {
      spotify: string
    }
    href: string
    type: string
    uri: string
  }

  progress_ms: string
  is_playing: boolean
  item: SpotifyCurrentlyPlayingContextItem
}
