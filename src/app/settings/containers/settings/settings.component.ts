import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../../shared/services/spotify.service'

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private spotify: SpotifyService) { }

  ngOnInit() {
  }

  authorizeSpotify() {
    this.spotify.authorize()
  }

}
