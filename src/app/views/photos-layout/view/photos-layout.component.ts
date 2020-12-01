import {Component} from '@angular/core';
import {Observable} from 'rxjs';

@Component({
    templateUrl: 'photos-layout.component.html',
    styleUrls: ['photos-layout.component.scss']
})
export class PhotosLayoutComponent {

    public photos$: Observable<any[]>;

    constructor() {}
}
