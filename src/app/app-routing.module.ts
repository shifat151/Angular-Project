import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { NgModule } from '@angular/core';
import { ErrorPageComponent } from './error-page/error-page.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipesDetailComponent } from './recipes/recipes-detail/recipes-detail.component';
import { ShoppingListShowComponent } from './shopping-list/shopping-list-show/shopping-list-show.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';

const appRoute:Routes=[
    {path:'', redirectTo:'/recipes', pathMatch:'full'},
    {path:'recipes',component:RecipesComponent, children:[
    {path:'', component:RecipeStartComponent},
    {path:'new', component:RecipeEditComponent},
    {path:":id", component:RecipesDetailComponent},
    {path:":id/edit", component:RecipeEditComponent}
  ]},
  {path:'shopping-list', component:ShoppingListComponent, children:[
    {path:'', component:ShoppingListShowComponent}
  ]},
  // {path:'error-page', component:ErrorPageComponent},
  // {path:'**', redirectTo:'/error-page'}
]

@NgModule({
  imports:[
    RouterModule.forRoot(appRoute)
  ],
    exports: [RouterModule]


})

export class AppRoutingModule{

}
