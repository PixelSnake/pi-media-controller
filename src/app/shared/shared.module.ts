import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from './components/icon/icon.component';
import { ApiService } from './services/api.service'
import { HttpClientModule } from '@angular/common/http'

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [
    IconComponent
  ],
  exports: [
    IconComponent
  ],
  providers: [
    ApiService
  ]
})
export class SharedModule { }
