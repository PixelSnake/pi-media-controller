import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './home/containers/home/home.component'
import { SettingsComponent } from './settings/containers/settings/settings.component'
import { SpotifyCallbackComponent } from './settings/containers/spotify-callback/spotify-callback.component'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'settings',
    component: SettingsComponent,
    pathMatch: 'full'
  },
  {
    path: 'settings/spotify-callback',
    component: SpotifyCallbackComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
