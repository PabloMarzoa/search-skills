import {Injectable} from '@angular/core';
import {Store, StoreConfig} from '@datorama/akita';
import {PhotosQuery} from '../models/photos-query';

export interface PhotosState {
    filter: string | null;
    page: number;
    photos: PhotosQuery;
}

export function createInitialName(): PhotosState {
    return {filter: null, page: 1, photos: {total: 0, total_pages: 0, results: []}};
}

@Injectable()
@StoreConfig({ name: 'filter' })
export class PhotosStateStore extends Store<PhotosState> {

    constructor() {
        super(createInitialName());
    }

    setFilter(filter: string): void {
        this.update({filter});
    }

    setPage(page: number): void {
        this.update({page});
    }

    setPhotos(photos: PhotosQuery): void {
        this.update({photos});
    }
}
