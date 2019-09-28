import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';
import { Ingredient } from 'src/app/shared/ingredients.model';

@Component({
  selector: 'app-shopping-list-show',
  templateUrl: './shopping-list-show.component.html',
  styleUrls: ['./shopping-list-show.component.css']
})
export class ShoppingListShowComponent implements OnInit {
   ingredients:Ingredient[];
  constructor( private slService:ShoppingListService) { }

  ngOnInit() {
    this.ingredients=this.slService.getIngredients();
    this.slService.ingredientsChanged.subscribe(
      (ingredients:Ingredient[])=>{
        this.ingredients=ingredients;
      }
    )
  }

}
