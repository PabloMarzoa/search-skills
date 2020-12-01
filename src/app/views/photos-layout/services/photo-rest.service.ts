import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {RestManagerService} from '../../../services/rest-manager.service';

@Injectable()
export class PhotoRestService {

    constructor(
        private restManager: RestManagerService
    ) {}

    getPhotos(): Observable<any> {
        return this.restManager.callGETMethod('https://api.unsplash.com/photos');
    }

    getPhotosByFilter(filter: string): Observable<any> {
        return this.restManager.callGETMethod(`https://api.unsplash.com/search/photos?query=${filter}`);
    }
}
