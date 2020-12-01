import {Component, OnDestroy} from '@angular/core';
import {Observable} from 'rxjs';
import {PhotosStateQueryService} from '../../state/photos-state-query.service';
import {takeWhile} from 'rxjs/operators';
import {PhotosQuery} from '../../models/photos-query';
import {PhotosService} from '../../services/photos.service';

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
        private photosService: PhotosService
    ) {
        this.photos$ = this.photosQueryService.getPhotos$;
        this.photos$.pipe(takeWhile(() => this.alive))
            .subscribe(photos => console.log('test-photos', photos));
    }

    ngOnDestroy(): void {
        this.alive = false;
    }
}
