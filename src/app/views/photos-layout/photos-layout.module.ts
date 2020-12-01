import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PhotosLayoutRouting} from './photos-layout.routing';
import {MatIconModule} from '@angular/material/icon';
import {PhotosLayoutComponent} from './view/photos-layout.component';
import {PhotoRestService} from './services/photo-rest.service';

@NgModule({
  imports: [
    CommonModule,
    PhotosLayoutRouting,
    MatIconModule
  ],
  declarations: [
    PhotosLayoutComponent
  ],
  providers: [
    PhotoRestService
  ]
})
export class PhotosLayoutModule {}
