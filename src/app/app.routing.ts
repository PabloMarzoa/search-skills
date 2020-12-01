import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'photos', pathMatch: 'full'},
  {
    path: 'photos',
    loadChildren: () => import('./views/photos-layout/photos-layout.module').then(m => m.PhotosLayoutModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouting { }
