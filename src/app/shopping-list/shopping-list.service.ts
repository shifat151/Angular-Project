import { Ingredient } from '../shared/ingredients.model';
import { EventEmitter } from '@angular/core';

export class ShoppingListService{
ingredientsChanged= new EventEmitter<Ingredient[]>();

  private ingredients:Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  getIngredients(){
    // this will just show the copy off the ingredients
    return this.ingredients.slice();
  }
  addIngredients(ingredient:Ingredient){
    this.ingredients.push(ingredient);
    //For showing the change of add ingridient
    this.ingredientsChanged.emit(this.ingredients.slice());
  }

  addIngredientsn(ingredients:Ingredient[]){
    // for(let ingredient of ingredients){
    //   this.addIngredients(ingredient);
    // }
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.emit(this.ingredients.slice())
  }
}
