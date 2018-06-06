export interface SpotifyCurrentlyPlayingContext {
  timestamp: string
  device: {
    id: string
    is_active: boolean
    is_restricted: boolean
    name: string
    type: string
    volume_percent: number
  }
  progress_ms: string
  is_playing: boolean
  item: any
  shuffle_state: boolean
  repeat_state: string
  context: {
    external_urls: {
      spotify: string
    }
    href: string
    type: string
    uri: string
  }
}
