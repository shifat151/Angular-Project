import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredients.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
  @ViewChild('f',{static:false}) slForm:NgForm;
  subscription:Subscription;
  editMode=false;
  editedItemIndex:number;
  private editedItem:Ingredient;


  // @ViewChild('nameInput',{static:true}) nameInputRef: ElementRef;
  // @ViewChild('amountInput',{static:true}) amountInputRef: ElementRef;
  constructor(private slService:ShoppingListService) { }

  ngOnInit() {
    //For editing the shopping list
    this.subscription=this.slService.startedEditing.subscribe(
      (index:number)=>{
        this.editMode=true;
        this.editedItemIndex=index;
        this.editedItem=this.slService.getIngredient(index);
        this.slForm.setValue({
          name:this.editedItem.name,
          amount:this.editedItem.amount
        })
      }
    );
  }
  //form validation
  onSubmit(form:NgForm){
      const value=form.value;
      const newIngredient=new Ingredient(value.name,value.amount);
      // this.ingredientAdded.emit(newIngredient);

      if(this.editMode){
        this.slService.updateIngredient(this.editedItemIndex,newIngredient);
      }
      else{
        this.slService.addIngredients(newIngredient);
      }
      this.editMode=false;
      form.reset();

  }
  onClear(){
    this.slForm.reset();
    this.editMode=false;
  }
  onDelete(){
    this.slService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();

  }
}
