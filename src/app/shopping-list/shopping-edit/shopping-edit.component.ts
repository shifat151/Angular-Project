import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredients.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @Output() ingredientAdded=new EventEmitter<Ingredient>();
  @ViewChild('nameInput',{static:true}) nameInputRef: ElementRef;
  @ViewChild('amountInput',{static:true}) amountInputRef: ElementRef;
  constructor() { }

  ngOnInit() {
  }
  onAddItem(){
      const newIngredient=new Ingredient(this.nameInputRef.nativeElement.value,
      this.amountInputRef.nativeElement.value);
      this.ingredientAdded.emit(newIngredient);


  }
}
