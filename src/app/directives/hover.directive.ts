import {Directive, ElementRef, HostListener, Renderer2} from '@angular/core';
import {Styling} from "../services/styling";

@Directive({
  selector: '[appHover]'
})
export class HoverDirective {

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  @HostListener('mouseenter') mouseover(eventData: Event) {
    this.renderer.setStyle(this.elRef.nativeElement, 'background-color', Styling.lightColor);
    // this.renderer.setStyle(this.elRef.nativeElement, 'border', '1px solid' + Styling.color);
  }

  @HostListener('mouseleave') mouseleave(eventData: Event) {
    this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'transparent');
    // this.renderer.setStyle(this.elRef.nativeElement, 'border', '1px solid #dfdfdf');
  }

}
