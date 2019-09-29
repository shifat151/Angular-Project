import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';
import { Ingredient } from 'src/app/shared/ingredients.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list-show',
  templateUrl: './shopping-list-show.component.html',
  styleUrls: ['./shopping-list-show.component.css']
})
export class ShoppingListShowComponent implements OnInit, OnDestroy {
   ingredients: Ingredient[];
   private igChangeSub: Subscription;
  constructor( private slService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.slService.getIngredients();
    this.igChangeSub = this.slService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );

  }
  ngOnDestroy(): void {
    this.igChangeSub.unsubscribe();
  }

}
