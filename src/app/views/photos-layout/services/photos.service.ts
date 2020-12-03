import {Injectable} from '@angular/core';
import {PhotosStateStore} from '../state/photos-state.store';
import {PhotosStateQueryService} from '../state/photos-state-query.service';
import {combineLatest} from 'rxjs';
import {PhotosRestService} from './photos-rest.service';
import {debounceTime, take} from 'rxjs/operators';

@Injectable()
export class PhotosService {

    constructor(
        protected photosStore: PhotosStateStore,
        private photosQueryService: PhotosStateQueryService,
        private photosRestService: PhotosRestService
    ) {
        this.listenStoreChanges();
    }

    setFilter(filter: string): void {
        this.photosStore.setFilter(filter);
    }

    setPage(page: number): void {
        this.photosStore.setPage(page);
    }

    setPageSize(pageSize: number): void {
        this.photosStore.setPageSize(pageSize);
    }

    private listenStoreChanges(): void {
        combineLatest(
            this.photosQueryService.filter$,
            this.photosQueryService.page$,
            this.photosQueryService.pageSize$,
            (filter, page, perPage) => ({filter, page, perPage})
        ).pipe(debounceTime(250)).subscribe(res => {
            this.getPhotos(res.filter, res.page, res.perPage);
        });
    }

    private getPhotos(filter: string, page: number, perPage: number): void {
        if (filter) {
            this.photosRestService.getPhotosByFilterAndPage(filter, page, perPage).pipe(take(1)).subscribe(res => {
                this.photosStore.setPhotos(res);
            });
        } else {
            this.photosRestService.getPhotos(page, perPage).pipe(take(1)).subscribe(res => {
                this.photosStore.setPhotos({total_pages: 1, total: 10, results: res});
            });
        }
    }
}
