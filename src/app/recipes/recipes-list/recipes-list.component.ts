import { Component, OnInit, EventEmitter,Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {

  @Output() recipeWasSelected=new EventEmitter<Recipe>()
  // recipes= [{name:'A test Recipe', description:'This is simply a test',
  //   imagePath:'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg'},
  // {name:'A test Recipe', description:'This is simply a test',
  //  imagePath:'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg'}]

  recipes:Recipe[] = [
    new Recipe('A test Recipe', 'This is simply a test',
    'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg' ),
    new Recipe('Another Recipe', 'This is another test recpe',
    'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg' )
  ];

  constructor() { }

  ngOnInit() {
  }
  onRecipeSelected(recipe:Recipe){
    this.recipeWasSelected.emit(recipe);
  }
}
