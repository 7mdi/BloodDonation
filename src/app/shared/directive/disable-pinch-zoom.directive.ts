import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appDisablePinchZoom]'
})
export class DisablePinchZoomDirective {

  constructor() { }
  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  }

  @HostListener('gesturechange', ['$event'])
  onGestureChange(event: Event) {
    event.preventDefault();
  }

}
