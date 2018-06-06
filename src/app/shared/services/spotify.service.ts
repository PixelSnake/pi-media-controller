import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment'
import { tap } from 'rxjs/operators'
import { SpotifyCurrentlyPlayingContext } from '../types/spotifyCurrentlyPlayingContext'

@Injectable()
export class SpotifyService {

  public static authBaseUrl = 'https://accounts.spotify.com'
  public static apiBaseUrl = 'https://api.spotify.com/v1'

  private static accessToken: string
  private static refreshToken: string

  private _isConnected = false

  constructor(private http: HttpClient) {
  }

  authorize() {
    const params = {
      client_id: environment.spotify.clientId,
      response_type: 'code',
      redirect_uri: environment.spotify.redirectUri,
      scope: environment.spotify.scopes
    }
    window.open(`${SpotifyService.authBaseUrl}/authorize?client_id=${params.client_id}&response_type=${params.response_type}&redirect_uri=${params.redirect_uri}&scope=${params.scope}`)
  }

  getToken(code: string) {
    return this.http
      .get(`${environment.apiBaseUrl}/spotify/token?code=${code}`)
      .pipe(
        tap((res: any) => {
          SpotifyService.accessToken = res.access_token
          SpotifyService.refreshToken = res.refresh_token
          this._isConnected = true
        })
      )
  }

  getCurrentlyPlaying() {
    return this.http.get<SpotifyCurrentlyPlayingContext>(`${SpotifyService.apiBaseUrl}/me/player`)
  }

  get isConnected() {
    return this._isConnected
  }

}
