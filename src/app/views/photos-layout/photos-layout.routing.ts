import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {PhotosLayoutComponent} from './view/photos-layout.component';

export const routes: Routes = [
  {path: '', redirectTo: 'search', pathMatch: 'full'},
  {
    path: 'search',
    component: PhotosLayoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PhotosLayoutRouting {}
