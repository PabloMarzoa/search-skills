import {Pipe, PipeTransform} from '@angular/core';
import {Photo} from '../models/photo';

@Pipe({
    name: 'title'
})
export class PhotoTitlePipe implements PipeTransform {

    transform(photo: Photo): string {
        return photo.description || 'No title';
    }
}
