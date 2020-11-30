import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'pictures', pathMatch: 'full'},
  {
    path: 'pictures',
    loadChildren: () => import('./views/search-layout/search-layout.module').then(m => m.SearchLayoutModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouting { }
