import {Component} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import {PhotosStateQueryService} from '../../state/photos-state-query.service';
import {PhotosService} from '../../services/photos.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
    templateUrl: 'photos-paginator.component.html',
    styleUrls: ['photos-paginator.component.scss'],
    selector: 'photos-paginator'
})
export class PhotosPaginatorComponent {
    public pageSize$: Observable<number>;
    public itemsLength$: Observable<number>;


    constructor(
        private photosQueryService: PhotosStateQueryService,
        private photosService: PhotosService
    ) {
        this.itemsLength$ = this.photosQueryService.photos$.pipe(map(items => items.total_pages));
        this.pageSize$ = this.photosQueryService.pageSize$;
    }

    onPageChanges(ev: PageEvent): void {
        this.photosService.setPage(ev.pageIndex + 1);
        this.photosService.setPageSize(ev.pageSize);
    }
}
