import {Injectable} from '@angular/core';
import {PhotosStateStore} from '../state/photos-state.store';
import {PhotosStateQueryService} from '../state/photos-state-query.service';
import {combineLatest} from 'rxjs';
import {PhotosRestService} from './photos-rest.service';
import {debounceTime, distinctUntilChanged, take} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable()
export class PhotosService {

    constructor(
        private snackBar: MatSnackBar,
        protected photosStore: PhotosStateStore,
        private photosRestService: PhotosRestService,
        private photosQueryService: PhotosStateQueryService
    ) {
        this.listenStoreChanges();
    }

    setFilter(filter: string): void {
        this.setPage(1);
        this.photosStore.setFilter(filter);
    }

    setPage(page: number): void {
        this.photosStore.setPage(page);
    }

    setPageSize(pageSize: number): void {
        this.setPage(1);
        this.photosStore.setPageSize(pageSize);
    }

    private listenStoreChanges(): void {
        combineLatest(
            this.photosQueryService.filter$,
            this.photosQueryService.page$,
            this.photosQueryService.pageSize$,
            (filter, page, perPage) => ({filter, page, perPage})
        ).pipe(debounceTime(250), distinctUntilChanged()).subscribe(res => {
            this.getPhotos(res.filter, res.page, res.perPage);
        });
    }

    private getPhotos(filter: string, page: number, perPage: number): void {
        if (filter) {
            this.photosRestService.getPhotosByFilterAndPage(filter, page, perPage).pipe(take(1)).subscribe(res => {
                this.photosStore.setPhotos(res);
            }, error => {
                console.error('Get photos error: ', error);
                this.photosStore.reset();
                this.snackBar.open('Sorry, can not show any photo. Please, try it later', null,
                    {horizontalPosition: 'end', verticalPosition: 'top', duration: 5000});
            });
        } else {
            this.photosRestService.getPhotos(page, perPage).pipe(take(1)).subscribe(res => {
                this.photosStore.setPhotos({total_pages: 1, total: perPage, results: res});
            }, error => {
                console.error('Get photos error: ', error);
                this.photosStore.reset();
                this.snackBar.open('Sorry, can not show any photo. Please, try it later', null,
                    {horizontalPosition: 'end', verticalPosition: 'top', duration: 5000});
            });
        }
    }
}
