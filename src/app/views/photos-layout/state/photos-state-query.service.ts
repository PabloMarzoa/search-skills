import {Injectable} from '@angular/core';
import {Query} from '@datorama/akita';
import {PhotosState, PhotosStateStore} from './photos-state.store';

@Injectable()
export class PhotosStateQueryService extends Query<PhotosState> {
    getFilter$ = this.select(state => state.filter);
    getPage$ = this.select(state => state.page);
    getPerPage$ = this.select(state => state.per_page);
    getPhotos$ = this.select(state => state.photos);

    constructor(protected store: PhotosStateStore) {
        super(store);
    }
}
