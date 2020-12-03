import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PhotosLayoutRouting} from './photos-layout.routing';
import {MatIconModule} from '@angular/material/icon';
import {PhotosLayoutComponent} from './view/photos-layout.component';
import {PhotosRestService} from './services/photos-rest.service';
import {PhotosGridComponent} from './components/photos-grid/photos-grid.component';
import {PhotosStateStore} from './state/photos-state.store';
import {PhotosStateQueryService} from './state/photos-state-query.service';
import {PhotosService} from './services/photos.service';
import {PhotosPaginatorComponent} from './components/photos-paginator/photos-paginator.component';
import {MatPaginatorModule} from '@angular/material/paginator';

@NgModule({
    imports: [
        CommonModule,
        PhotosLayoutRouting,
        MatIconModule,
        MatPaginatorModule
    ],
    declarations: [
        PhotosLayoutComponent,
        PhotosGridComponent,
        PhotosPaginatorComponent
    ],
    exports: [
        PhotosGridComponent,
        PhotosPaginatorComponent
    ],
    providers: [
        PhotosRestService,
        PhotosService,
        PhotosStateStore,
        PhotosStateQueryService
    ]
})
export class PhotosLayoutModule {}
