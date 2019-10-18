import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appPlaceholder]'
})
export class PlaceholderDirective{
  // For creating dynamic alertComponent
  constructor(public viewContainerRef: ViewContainerRef){}
}
