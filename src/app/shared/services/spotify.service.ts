import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment'
import { catchError, tap } from 'rxjs/operators'
import { SpotifyCurrentlyPlayingContext } from '../types/spotifyCurrentlyPlayingContext'
import { errorHandler } from '@angular/platform-browser/src/browser'
import { Observable, ObservableInput } from 'rxjs/Observable'

@Injectable()
export class SpotifyService {

  public static authBaseUrl = 'https://accounts.spotify.com'
  public static apiBaseUrl = 'https://api.spotify.com/v1'

  private accessToken: string
  private refreshToken: string
  private _isConnected = false

  constructor(private http: HttpClient) {
    const accessToken = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')

    if (accessToken && refreshToken) {
      this.accessToken = accessToken
      this.refreshToken = refreshToken
      this._isConnected = true
    }
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
          this.accessToken = res.access_token
          this.refreshToken = res.refresh_token

          localStorage.setItem('accessToken', this.accessToken)
          localStorage.setItem('refreshToken', this.refreshToken)

          this._isConnected = true
        })
      )
  }

  refresh() {
    return this.http
      .get(`${environment.apiBaseUrl}/spotify/token/refresh?refresh_token=${ this.refreshToken }`)
      .pipe(
        tap((res: any) => {
          this.accessToken = res.access_token

          localStorage.setItem('accessToken', this.accessToken)
          localStorage.setItem('refreshToken', this.refreshToken)

          this._isConnected = true
        })
      )
  }

  getCurrentlyPlaying() {
    return this.http.get<SpotifyCurrentlyPlayingContext>(`${SpotifyService.apiBaseUrl}/me/player`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`
      }
    }).pipe(catchError(this.errorHandler.bind(this)))
  }

  private errorHandler(err: any, caught: Observable<any>): ObservableInput<any> {
    if (err.error.error.status === 401) {
      this.refresh().subscribe()
    }
    return caught
  }

  get isConnected() {
    return this._isConnected
  }

}
