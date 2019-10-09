import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import {map, tap} from 'rxjs/operators';

@Injectable({providedIn:'root'})
export class DataStorageService{
  constructor(private http:HttpClient,
    private recipeService:RecipeService){}

  storeRecipesData(){
    const recipes=this.recipeService.getRecipes();
    this.http.put('https://course-project-dc7d6.firebaseio.com/recipes.json',
    recipes).
    subscribe(Response=>{
      console.log(Response);
    })

  }
//tap operators allows us to execute some code here to without altering the data that funnel through the operator
  fetchRecipeData(){
   return  this.http.get<Recipe[]>('https://course-project-dc7d6.firebaseio.com/recipes.json')
    .pipe(map(recipes=>{
      return recipes.map(recipe=>{
        return {...recipe,ingredients:recipe.ingredients? recipe.ingredients:[]};
      })
    }),tap(recipes=>{
      this.recipeService.setRecipes(recipes);
    })
    )

  }
}
