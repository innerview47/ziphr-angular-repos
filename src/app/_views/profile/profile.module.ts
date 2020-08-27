import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@/_modules/shared/shared.module'
import { ProfileRoutingModule } from './profile-routing.module'

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
