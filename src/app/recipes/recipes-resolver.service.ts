import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe.model';
import { DataStorageService } from '../shared/data-storage.service';
import { Observable } from 'rxjs';
import { RecipeService } from './recipe.service';


@Injectable({providedIn: 'root'})
export class RecipeResolverService implements Resolve<Recipe[]>{

  constructor(private dataStorageService: DataStorageService,
    private recipeService: RecipeService){

  }

  resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe[]>|Promise<Recipe[]>|Recipe[]{

     const recipes = this.recipeService.getRecipes();
     if (recipes.length === 0) {
    console.log(recipes);

   // not subscribing beacuse the resolver will subcribe for me to find out once the data is here
    return this.dataStorageService.fetchRecipeData();
    }
    else{
      return recipes;
    }


  }

}
