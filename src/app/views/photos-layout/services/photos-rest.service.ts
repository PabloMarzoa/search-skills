import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {RestManagerService} from '../../../services/rest-manager.service';
import {Photo} from '../models/photo';
import {PhotosQuery} from '../models/photos-query';

@Injectable()
export class PhotosRestService {

    constructor(
        private restManager: RestManagerService
    ) {}

    getPhotos(): Observable<Photo[]> {
        return this.restManager.callGETMethod('https://api.unsplash.com/photos');
    }

    getPhotosByFilterAndPage(filter: string, page: number): Observable<PhotosQuery> {
        return this.restManager.callGETMethod(`https://api.unsplash.com/search/photos?query=${filter}&page=${page}`);
    }
}
