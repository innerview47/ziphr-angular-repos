import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown'
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { PaginationModule } from 'ngx-bootstrap/pagination'
import { NgxBootstrapIconsModule } from 'ngx-bootstrap-icons'
import { Star, StarFill, Check } from 'ngx-bootstrap-icons'
import { FormsModule } from '@angular/forms'
import { BsDropdownModule } from 'ngx-bootstrap/dropdown'
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { ReposComponent } from '@/_views/profile/repos/repos.component';
import { UsersComponent } from '@/_views/profile/users/users.component';
import { HeaderComponent } from '@/_views/profile/header/header.component';
import { ProfileComponent } from '@/_views/profile/profile.component';
import { ReposSearchComponent } from '../../_components/repos-search/repos-search.component';

const icons = {
  Star,
  StarFill,
  Check
}

@NgModule({
  declarations: [
    ReposComponent,
    UsersComponent,
    HeaderComponent,
    ProfileComponent,
    ReposSearchComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    PaginationModule.forRoot(),
    MarkdownModule.forRoot({loader: HttpClient}),
    NgxBootstrapIconsModule.pick(icons),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    TabsModule.forRoot()
  ],
  providers: []
})
export class SharedModule { }
