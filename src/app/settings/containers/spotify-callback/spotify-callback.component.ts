import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { SpotifyService } from '../../../shared/services/spotify.service'

@Component({
  selector: 'app-spotify-callback',
  templateUrl: './spotify-callback.component.html',
  styleUrls: ['./spotify-callback.component.scss']
})
export class SpotifyCallbackComponent implements OnInit {

  error = false

  constructor(private route: ActivatedRoute,
              private router: Router,
              private spotify: SpotifyService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(q => {
      if (q.code) {
        this.spotify.getToken(q.code)
          .subscribe(() => this.router.navigate(['/']), () => {
            this.error = true
            setTimeout(() => this.router.navigate(['settings']), 2000)
          })
      }
    })
  }

}
