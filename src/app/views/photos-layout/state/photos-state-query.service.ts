import {Injectable} from '@angular/core';
import {Query} from '@datorama/akita';
import {PhotosState, PhotosStateStore} from './photos-state.store';

@Injectable()
export class PhotosStateQueryService extends Query<PhotosState> {
    filter$ = this.select(state => state.filter);
    page$ = this.select(state => state.page);
    pageSize$ = this.select(state => state.per_page);
    photos$ = this.select(state => state.photos);

    constructor(protected store: PhotosStateStore) {
        super(store);
    }
}
