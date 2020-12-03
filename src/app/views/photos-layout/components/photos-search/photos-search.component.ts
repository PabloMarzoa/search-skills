import {Component} from '@angular/core';
import {PhotosStateQueryService} from '../../state/photos-state-query.service';
import {PhotosService} from '../../services/photos.service';
import {Observable} from 'rxjs';

@Component({
    templateUrl: 'photos-search.component.html',
    styleUrls: ['photos-search.component.scss'],
    selector: 'photos-search'
})
export class PhotosSearchComponent {
    public filter: string;
    public filter$: Observable<string>;

    constructor(
        private photosQueryService: PhotosStateQueryService,
        private photosService: PhotosService
    ) {
        this.filter$ = this.photosQueryService.filter$;
    }

    filterHasChanged(event): void {
        this.photosService.setFilter(event);
    }
}
