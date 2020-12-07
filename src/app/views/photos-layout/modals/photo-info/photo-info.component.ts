import {Component, Inject} from '@angular/core';
import {Photo, PhotoInfo} from '../../models/photo';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {PhotosRestService} from '../../services/photos-rest.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {take} from 'rxjs/operators';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
    templateUrl: 'photo-info.component.html',
    styleUrls: ['../modal-styles.scss']
})
export class PhotoInfoComponent {

    private photo: Photo;
    private photoInfo: PhotoInfo;
    public photoForm: FormGroup;
    public loading = true;

    constructor(
        private builder: FormBuilder,
        private snackBar: MatSnackBar,
        private restService: PhotosRestService,
        private dialogRef: MatDialogRef<PhotoInfoComponent>,
        @Inject(MAT_DIALOG_DATA) private data: {photo: Photo}
    ) {
        this.photo = data.photo;
        this.initPhotoForm();
        this.restService.getPhoto(this.photo.id).pipe(take(1)).subscribe((photo: PhotoInfo) => {
            this.photoInfo = photo;
            this.loading = false;
            this.patchFormData(photo);
        }, error => {
            console.error('Download info error: ', error);
            this.onClose();
            this.snackBar.open('Sorry, can not download photo info. Please, try it later', null,
                {horizontalPosition: 'end', verticalPosition: 'top', duration: 5000});
        });
    }

    public onClose(): void {
        this.dialogRef.close();
    }

    public patchFormData(photo: PhotoInfo): void {
        const parsedPhotoData = {
            username: photo.user.username || '--',
            likes: photo.likes || '--',
            downloads: photo.download || '--',
            make: photo.exif.make || '--',
            model: photo.exif.model || '--',
            focalLength: photo.exif.focal_length || '--',
            aperture: photo.exif.aperture || '--',
            exposureTime: photo.exif.exposure_time || '--',
            iso: photo.exif.iso || '--',
            dimensions: photo.width + 'x' + photo.height,
            published: new Date(photo.updated_at).toLocaleString()
        };
        this.photoForm.patchValue(parsedPhotoData);
    }

    private initPhotoForm(): void {
        this.photoForm = this.builder.group({
            username: ['', []],
            likes: ['', []],
            downloads: ['', []],
            make: ['', []],
            model: ['', []],
            focalLength: ['', []],
            aperture: ['', []],
            exposureTime: ['', []],
            iso: ['', []],
            dimensions: ['', []],
            published: ['', []]
        });
    }
}
