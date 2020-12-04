import {Component, OnDestroy} from '@angular/core';
import {Observable} from 'rxjs';
import {PhotosStateQueryService} from '../../state/photos-state-query.service';
import {PhotosQuery} from '../../models/photos-query';
import {MatDialog} from '@angular/material/dialog';
import {Photo} from '../../models/photo';
import {PhotoViewerComponent} from '../../modals/photo-viewer/photo-viewer.component';

@Component({
    templateUrl: 'photos-grid.component.html',
    styleUrls: ['photos-grid.component.scss'],
    selector: 'photos-grid'
})
export class PhotosGridComponent implements OnDestroy {

    public photos$: Observable<PhotosQuery>;
    private alive = true;

    constructor(
        private photosQueryService: PhotosStateQueryService,
        private dialog: MatDialog
    ) {
        this.photos$ = this.photosQueryService.photos$;
    }

    ngOnDestroy(): void {
        this.alive = false;
    }

    onOpenPhoto(photo: Photo): void {
        this.dialog.open(PhotoViewerComponent, {data: {photo}});
    }
}
