import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { NgModule } from '@angular/core';






const appRoute:Routes=[

  {path:'', redirectTo:'/recipes', pathMatch:'full'},
  // Lazy loading activated
  {path:'recipes', loadChildren:'./recipes/recipe.module#RecipesModule'},
   {path:'shopping-list',loadChildren: './shopping-list/shopping-list.module#ShoppingListModule'},
  {
    path: 'auth',
    loadChildren:'./Auth/auth.module#AuthModule'

  }
]

@NgModule({
  imports:[
    // preloadingStrategy for preloading lazy-loadeed
    RouterModule.forRoot(appRoute, {preloadingStrategy: PreloadAllModules})
  ],
    exports: [RouterModule]


})

export class AppRoutingModule{

}
