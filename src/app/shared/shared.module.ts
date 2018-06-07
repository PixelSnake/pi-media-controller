import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from './components/icon/icon.component';
import { ApiService } from './services/api.service'
import { HttpClientModule } from '@angular/common/http'
import { SpotifyService } from './services/spotify.service';
import { GestureReceiverComponent } from './components/gesture-receiver/gesture-receiver.component';
import { ButtonDirective } from './directives/button/button.directive';
import { ButtonPrimaryDirective } from './directives/button-primary/button-primary.directive'

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [
    IconComponent,
    GestureReceiverComponent,
    ButtonDirective,
    ButtonPrimaryDirective
  ],
  exports: [
    IconComponent,
    GestureReceiverComponent,
    ButtonDirective,
    ButtonPrimaryDirective
  ],
  providers: [
    ApiService,
    SpotifyService
  ]
})
export class SharedModule { }
