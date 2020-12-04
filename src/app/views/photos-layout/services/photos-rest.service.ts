import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {RestManagerService} from '../../../services/rest-manager.service';
import {Photo} from '../models/photo';
import {PhotosQuery} from '../models/photos-query';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class PhotosRestService {

    constructor(
        public http: HttpClient,
        private restManager: RestManagerService
    ) {}

    downloadImage(url): Observable<any> {
        return this.http.get(url, {responseType: 'blob'});
    }

    getPhotos(page: number, perPage: number): Observable<Photo[]> {
        return this.restManager.callGETMethod(`https://api.unsplash.com/photos?page=${page}&per_page=${perPage}`);
    }

    getPhotosByFilterAndPage(filter: string, page: number, perPage: number): Observable<PhotosQuery> {
        return this.restManager.callGETMethod(`https://api.unsplash.com/search/photos?query=${filter}&page=${page}&per_page=${perPage}`);
    }
}
