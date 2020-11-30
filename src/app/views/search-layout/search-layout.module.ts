import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SearchLayoutRouting} from './search-layout.routing';
import {MatIconModule} from '@angular/material/icon';
import {SearchLayoutComponent} from './view/search-layout.component';

@NgModule({
  imports: [
    CommonModule,
    SearchLayoutRouting,
    MatIconModule
  ],
  declarations: [
    SearchLayoutComponent
  ],
  providers: []
})
export class SearchLayoutModule {}
