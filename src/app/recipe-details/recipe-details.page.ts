import { Component, OnInit } from '@angular/core';
import { WordpressService } from '../services/wordpress.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.page.html',
  styleUrls: ['./recipe-details.page.scss'],
  providers:[ WordpressService ]
})
export class RecipeDetailsPage implements OnInit {

  items: any[];
  recipeId;
  content;
  title;
  image;
  inBrief;
  difficulty;
  utensils;
  servingSize;
  ingredients;
  steps;
  video;
  calories;
  fat;
  carbs;
  protein;
  cookingTime;

  constructor(
    public wordpressService: WordpressService, 
    private route: ActivatedRoute, 
    private router: Router
  ) { 

  }

  ngOnInit() {
    this.recipeId = this.route.snapshot.paramMap.get('id');
    if(this.wordpressService.wp_org){
        this.wordpressService.getRecipe(this.recipeId).subscribe(data => {
          this.content = data.content.rendered;
          this.title=data.title.rendered;
          this.image = data.fimg_url;
          this.inBrief = data.acf.in_brief;
          this.difficulty = data.acf.difficulty;
          this.utensils = data.acf.utensils;
          this.servingSize = data.acf.serving_size;
          this.ingredients = data.acf.ingredients;
          this.steps = data.acf.steps;
          this.video = data.acf.video;
          this.calories = data.acf.calories;
          this.fat = data.acf.fat;
          this.carbs = data.acf.carbs;
          this.protein = data.acf.proteins;
          this.cookingTime = data.acf.cooking_time;

        });
    }
  }

}
