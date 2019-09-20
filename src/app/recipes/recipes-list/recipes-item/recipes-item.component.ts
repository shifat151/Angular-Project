import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef} from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipes-item',
  templateUrl: './recipes-item.component.html',
  styleUrls: ['./recipes-item.component.css']
})
export class RecipesItemComponent implements OnInit {

  // @ViewChild('recipeItemName', {static:true}) recipeItemName: ElementRef;
  // @ViewChild('recipeItemDescription', {static:true}) recipeItemDescription: ElementRef;
  // @ViewChild('recipeItemImagepath', {static:true}) recipeItemImagepath: ElementRef;

  // @Input() recipeItem: {name: string, description: string, imagePath: string};
  @Input() recipe: Recipe;
  // @Output() itemDesc = new EventEmitter<
  // {name: string, description: string, imagePath: string}>();



  constructor(private recipeService:RecipeService) { }

  ngOnInit() {}

  // passDescribe(){
  //   this.itemDesc.emit({name: this.recipeItemName.nativeElement.value,
  //      description:this.recipeItemDescription.nativeElement.value,
  //       imagePath:this.recipeItemImagepath.nativeElement.value});
  // }

  onSelected(){
    this.recipeService.recipeSelected.emit(this.recipe);
  }

}
