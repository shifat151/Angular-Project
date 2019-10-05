import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { Ingredient } from 'src/app/shared/ingredients.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
   recipeIngredients = new FormArray([]);


  constructor(private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router:Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        console.log(this.editMode);
        this.initForm();
      }
    );
  }

  onSubmit(){
    // Send data to recipeService
    // const newRecipe=new Recipe(this.recipeForm.value['name'],
    // this.recipeForm.value['description'],
    // this.recipeForm.value['imagePath'],
    // this.recipeForm.value['Ingredients']);

    if (this.editMode){
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else{
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.recipeForm.reset();
    this.onCancel();

  }
  onAddIngredient(){
    (<FormArray> this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null,
          [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })

    );
  }
  onCancel(){
    this.router.navigate(['../'],{relativeTo:this.route})
  }

  onDeleteIngredient(index:number){
      (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  private initForm(){

    let recipeName = '';
    let recipeImagePAth = '';
    let recipeDescription = '';


    if (this.editMode){
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePAth = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe.ingredients){
        for (let ingredient of recipe.ingredients){
          this.recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount,
                [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])

            })
          );
        }
      }

    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePAth, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': this.recipeIngredients
    });
  }

  getControls(){
    return(<FormArray> this.recipeForm.get('ingredients')).controls;
  }

}
