import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {SearchLayoutComponent} from './view/search-layout.component';

export const routes: Routes = [
  {path: '', redirectTo: 'search', pathMatch: 'full'},
  {
    path: 'search',
    component: SearchLayoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchLayoutRouting {}
