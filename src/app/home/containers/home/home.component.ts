import { Component, OnInit } from '@angular/core'
import { Vector } from '../../../shared/types/vector'
import { GestureInformation } from '../../../shared/types/gestureInformation'
import { ApiService } from '../../../shared/services/api.service'
import { SpotifyService } from '../../../shared/services/spotify.service'
import { SpotifyArtist } from '../../../shared/types/spotifyArtist'
import { DomSanitizer } from '@angular/platform-browser'
import { SpotifyCurrentlyPlayingContextItem } from '../../../shared/types/spotifyCurrentlyPlayingContextItem'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentlyPlaying: SpotifyCurrentlyPlayingContextItem

  constructor(private spotify: SpotifyService,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    if (this.spotify.isConnected) {
      this.pollForUpdates()
      setInterval(() => this.pollForUpdates(), 2000)
    }
  }

  pollForUpdates() {
    this.spotify.getCurrentlyPlaying()
      .subscribe(currentlyPlaying => this.currentlyPlaying = currentlyPlaying.item)
  }

  get background() {
    if (!this.currentlyPlaying) {
      return this.sanitizer.bypassSecurityTrustStyle(`url("assets/background-default.jpg")`)
    } else {
      return this.sanitizer.bypassSecurityTrustStyle(`url("${ this.currentlyPlaying.album.images[0].url }")`)
    }
  }

  get artists(): string {
    return this.currentlyPlaying.artists.map(a => a.name).join(', ')
  }
}
