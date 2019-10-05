import { Recipe } from './recipe.model';
import {  Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredients.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';


@Injectable()
export class RecipeService {


  recipesChanged=new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe('Steak Meal', 'Very tasty and crispy',
    'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg',
    [
      new Ingredient('Meat', 1),
      new Ingredient('Vegeable', 3)
    ] ),
    new Recipe('Cheese Cake', 'Yammy and perfect appetizer',
    'https://cdn.pixabay.com/photo/2017/01/11/11/33/cake-1971556_960_720.jpg',
    [
      new Ingredient('Cheese', 3),
      new Ingredient('wheat', 5)
    ] )
  ];

  constructor(private slservice: ShoppingListService) {}
  getRecipes(){
    return this.recipes.slice();
  }

  addIngredientsToShoppingList( ingredients: Ingredient[]) {
    this.slservice.addIngredientsn(ingredients);
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }
  addRecipe(recipe:Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }
  updateRecipe(index:number, newRecipe:Recipe){
    this.recipes[index]=newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }
  deleteRecipe(index:number){
    this.recipes.splice(index,1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
