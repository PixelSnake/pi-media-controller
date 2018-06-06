import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './containers/settings/settings.component';
import { SpotifyCallbackComponent } from './containers/spotify-callback/spotify-callback.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SettingsComponent,
    SpotifyCallbackComponent
  ],
  exports: [
    SettingsComponent,
    SpotifyCallbackComponent
  ]
})
export class SettingsModule { }
