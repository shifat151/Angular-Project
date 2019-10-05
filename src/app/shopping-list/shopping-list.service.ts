import { Ingredient } from '../shared/ingredients.model';

import {Subject} from 'rxjs'

export class ShoppingListService{
ingredientsChanged= new Subject<Ingredient[]>();
startedEditing=new Subject<number>();

  private ingredients:Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  getIngredients(){
    // this will just show the copy off the ingredients
    return this.ingredients.slice();
  }
  getIngredient(index:number){
    return this.ingredients[index];
  }
  addIngredients(ingredient:Ingredient){
    this.ingredients.push(ingredient);
    //For showing the change of add ingridient
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredientsn(ingredients:Ingredient[]){
    // for(let ingredient of ingredients){
    //   this.addIngredients(ingredient);
    // }
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice())
  }
  //for updating ingredient in edit mode
  updateIngredient(index: number, newIngredient:Ingredient){
    this.ingredients[index]=newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index:number){
    this.ingredients.splice(index,1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
