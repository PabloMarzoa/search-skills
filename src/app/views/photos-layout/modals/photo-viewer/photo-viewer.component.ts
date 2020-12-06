import {AfterViewInit, Component, ElementRef, Inject, Renderer2, ViewChild} from '@angular/core';
import {Photo} from '../../models/photo';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {fromEvent, race} from 'rxjs';
import {take, takeUntil} from 'rxjs/operators';
import {PhotosRestService} from '../../services/photos-rest.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
    templateUrl: 'photo-viewer.component.html',
    styleUrls: ['photo-viewer.component.scss']
})
export class PhotoViewerComponent implements AfterViewInit {
    @ViewChild('imageContainer', {static: false}) imageContainer: ElementRef;
    @ViewChild('image', {static: false}) image: ElementRef;

    public photo: Photo;
    public rotation = 0;
    public zoom = 0;

    private readonly ZOOM_STEP = 200;
    private origin: {cursor: [number, number], scroll: [number, number]} = {cursor: [0, 0], scroll: [0, 0]};

    constructor(
        private renderer: Renderer2,
        private snackBar: MatSnackBar,
        private restService: PhotosRestService,
        private dialogRef: MatDialogRef<PhotoViewerComponent>,
        @Inject(MAT_DIALOG_DATA) private data: {photo: Photo}
    ) {
        this.photo = data.photo;
    }

    ngAfterViewInit(): void {
        this.resetImageContainer();
        this.renderer.setStyle(this.image.nativeElement, 'background-image', `url(${this.photo.urls.full})`);
    }

    public mouseWheelZoom(event: WheelEvent): void {
        const zoomDiff = event.deltaY > 0 ? -this.ZOOM_STEP : this.ZOOM_STEP;
        this.zoom = Math.max(0, this.zoom + zoomDiff);
        const rect = (this.image.nativeElement as HTMLElement).getBoundingClientRect();
        const relativePositionX = 100 / rect.width * event.offsetX; // percentage position 0 -100% from left to right
        const relativePositionY = 100 / rect.height * event.offsetY; // percentage position 0 -100% from top to bottom
        this.setScrollAndSize(relativePositionX * zoomDiff / 100, relativePositionY * zoomDiff / 100, this.zoom); // percentages of zoom
    }

    public onStartDragByTouch(event: TouchEvent): void {
        this.origin = {
            cursor: [event.targetTouches[0].screenX, event.targetTouches[0].screenY],
            scroll: [this.imageContainer.nativeElement.scrollLeft, this.imageContainer.nativeElement.scrollTop]
        };
        fromEvent(this.image.nativeElement, 'touchmove')
            .pipe(takeUntil(fromEvent(document, 'touchend')))
            .subscribe((e: TouchEvent) => {
                const x = e.targetTouches[0].screenX;
                const y = e.targetTouches[0].screenY;
                this.dragImageWithMouse(x, y);
            });
    }

    public onStartDragWithMouse(event: MouseEvent): void {
        this.origin = {
            cursor: [event.x, event.y],
            scroll: [this.imageContainer.nativeElement.scrollLeft, this.imageContainer.nativeElement.scrollTop]
        };
        fromEvent(this.image.nativeElement, 'mousemove')
            .pipe(takeUntil(race([
                fromEvent(document, 'mouseup'),
                fromEvent(this.image.nativeElement, 'mouseleave')
            ])))
            .subscribe((e: MouseEvent) => {
                this.dragImageWithMouse(e.x, e.y);
            });
    }

    public onRotate(angle: number): void {
        if (this.image) {
            this.rotation = +this.rotation + angle;
            this.renderer.setStyle(this.image.nativeElement, 'transform', `rotate(${this.rotation}deg)`);
        }
    }

    public onZoomOut(): void {
        this.zoom = Math.max(this.zoom - this.ZOOM_STEP, 0);
        const scroll = -this.ZOOM_STEP / 2; // 50 percent 2 axes (center)
        this.setScrollAndSize(scroll, scroll, this.zoom);
    }

    public onZoomIn(): void {
        this.zoom = Math.max(this.zoom + this.ZOOM_STEP, 0);
        const scroll = this.ZOOM_STEP / 2; // 50 percent 2 axes (center)
        this.setScrollAndSize(scroll, scroll, this.zoom);
    }

    public onDownloadImage(): void {
        this.restService.downloadImage(this.photo.urls.full).pipe(take(1)).subscribe(res => {
            const file = new Blob([res], {type: res.type});
            const blob = window.URL.createObjectURL(file);
            const link = document.createElement('a');
            link.href = blob;
            link.download = this.photo.description || this.photo.alt_description || 'photo';
            link.dispatchEvent(new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
                view: window
            }));
            window.URL.revokeObjectURL(blob);
            link.remove();
        }, error => {
            console.error('Download error: ', error);
            this.snackBar.open('Download error. Please, try it later', null,
                {horizontalPosition: 'end', verticalPosition: 'top', duration: 5000});
        });
    }

    public onClose(): void {
        this.dialogRef.close();
    }

    private resetImageContainer(): void {
        this.rotation = 0;
        this.zoom = 0;
        this.onRotate(0);
        this.setScrollAndSize(0, 0, 0);
    }

    private dragImageWithMouse(x: number, y: number): void {
        const scrollDeltaX = this.origin.cursor[0] - x;
        const scrollDeltaY = this.origin.cursor[1] - y;
        this.imageContainer.nativeElement.scrollLeft = this.origin.scroll[0] + scrollDeltaX;
        this.imageContainer.nativeElement.scrollTop = this.origin.scroll[1] + scrollDeltaY;
    }

    private setScrollAndSize(scrollX, scrollY, zoom): void {
        if (this.image) {
            const imageWidth = this.imageContainer.nativeElement.offsetWidth + zoom;
            const imageHeight = this.imageContainer.nativeElement.offsetHeight + zoom;
            this.renderer.setStyle(this.image.nativeElement, 'width', `${imageWidth}px`);
            this.renderer.setStyle(this.image.nativeElement, 'height', `${imageHeight}px`);
        }
        if (this.imageContainer) {
            this.imageContainer.nativeElement.scrollTop = this.imageContainer.nativeElement.scrollTop + scrollY;
            this.imageContainer.nativeElement.scrollLeft = this.imageContainer.nativeElement.scrollLeft + scrollX;
        }
    }
}
