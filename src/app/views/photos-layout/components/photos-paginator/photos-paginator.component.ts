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
    public page$: Observable<number>;
    private lastPageSelected = 0;
    private lastPageSizeSelected = 0;

    constructor(
        private photosQueryService: PhotosStateQueryService,
        private photosService: PhotosService
    ) {
        this.page$ = this.photosQueryService.page$.pipe(map(index => index - 1));
        this.itemsLength$ = this.photosQueryService.photos$.pipe(map(items => items.total));
        this.pageSize$ = this.photosQueryService.pageSize$;
    }

    onPageChanges(ev: PageEvent): void {
        if (ev.pageIndex !== this.lastPageSelected) {
            this.lastPageSelected = ev.pageIndex;
            this.photosService.setPage(ev.pageIndex + 1);
        }
        if (ev.pageSize !== this.lastPageSizeSelected) {
            this.lastPageSizeSelected = ev.pageSize;
            this.photosService.setPageSize(ev.pageSize);
        }
    }
}
