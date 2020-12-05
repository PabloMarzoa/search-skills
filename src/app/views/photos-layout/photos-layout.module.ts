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
import {PhotosSearchComponent} from './components/photos-search/photos-search.component';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {PhotoViewerComponent} from './modals/photo-viewer/photo-viewer.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {PhotoTitlePipe} from './pipes/photo-title.pipe';
import {MatMenuModule} from '@angular/material/menu';
import {DivOverflowIndicatorDirective} from '../../directives/div-overflow-indicator.directive';

@NgModule({
    imports: [
        CommonModule,
        MatIconModule,
        MatPaginatorModule,
        MatInputModule,
        MatDialogModule,
        PhotosLayoutRouting,
        FormsModule,
        MatButtonModule,
        MatMenuModule
    ],
    declarations: [
        PhotosLayoutComponent,
        PhotosGridComponent,
        PhotosPaginatorComponent,
        PhotosSearchComponent,
        PhotoViewerComponent,
        PhotoTitlePipe,
        DivOverflowIndicatorDirective
    ],
    exports: [
        PhotosGridComponent,
        PhotosPaginatorComponent,
        PhotosSearchComponent
    ],
    providers: [
        PhotosRestService,
        PhotosService,
        PhotosStateStore,
        PhotosStateQueryService
    ]
})
export class PhotosLayoutModule {}
