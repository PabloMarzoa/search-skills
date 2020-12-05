import {ChangeDetectorRef, Directive, ElementRef, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {fromEvent} from 'rxjs';
import {takeWhile} from 'rxjs/operators';

// tslint:disable-next-line:directive-selector
@Directive({selector: '[divOverflowIndicator]'})
export class DivOverflowIndicatorDirective implements OnInit, OnDestroy {
    private alive = true;

    constructor(
        private el: ElementRef,
        private renderer: Renderer2,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        setTimeout(() => { // Fix initial check
            this.checkOverflow();
        }, 1000);
        fromEvent(this.el.nativeElement, 'scroll')
            .pipe(takeWhile(() => this.alive))
            .subscribe(() => {
                this.checkOverflow();
            });
        fromEvent(this.el.nativeElement, 'mouseover')
            .pipe(takeWhile(() => this.alive))
            .subscribe(() => {
                this.checkOverflow();
            });
    }

    ngOnDestroy(): void {
        this.alive = false;
    }

    private checkOverflow(): void {
        const scrollTop = this.el.nativeElement.scrollTop;
        const scrollHeight = this.el.nativeElement.scrollHeight;
        const offsetHeight = this.el.nativeElement.offsetHeight;
        const hasScrollTop = scrollTop !== 0;
        const hasScrollBottom = scrollTop !== (scrollHeight - offsetHeight);
        this.renderer.removeClass(this.el.nativeElement, 'overflow-top');
        this.renderer.removeClass(this.el.nativeElement, 'overflow-bottom');
        this.renderer.removeClass(this.el.nativeElement, 'overflow-top-bottom');
        if (hasScrollTop && !hasScrollBottom) {
            this.renderer.addClass(this.el.nativeElement, 'overflow-top');
        } else if (!hasScrollTop && hasScrollBottom) {
            this.renderer.addClass(this.el.nativeElement, 'overflow-bottom');
        } else if (hasScrollTop && hasScrollBottom) {
            this.renderer.addClass(this.el.nativeElement, 'overflow-top-bottom');
        }
    }
}
