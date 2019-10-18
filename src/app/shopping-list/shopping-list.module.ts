import { NgModule } from '@angular/core';
import { ShoppingListShowComponent } from './shopping-list-show/shopping-list-show.component';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations:[
    ShoppingListComponent,
    ShoppingEditComponent,
    ShoppingListShowComponent,
  ],

  imports:[

    FormsModule,
    SharedModule,
    RouterModule.forChild([
      {path:'', component:ShoppingListComponent, children:[
        {path:'', component:ShoppingListShowComponent}
      ]},
    ])

  ]
})
export class ShoppingListModule{

}
