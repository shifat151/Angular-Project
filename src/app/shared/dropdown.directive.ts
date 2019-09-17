import { Directive, HostListener, HostBinding, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit {
  @Input() directoryColor:string;
  // @HostBinding('class.open') isOpen=false;

  // @HostListener('click') toggleOpen(){
  //   this.isOpen=!this.isOpen;
  // }
  @HostBinding('style.color')Color:string='red';

  ngOnInit(): void {
    this.Color=this.directoryColor;

  }
  constructor() { }

}
