import { Component, OnInit } from '@angular/core';
import { WordpressService } from '../services/wordpress.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FavoritesService } from '../services/favorites.service';
import { LoadingController } from '@ionic/angular';
import { Favorite } from '../models/favorite';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.page.html',
  styleUrls: ['./recipe-details.page.scss'],
  providers:[ WordpressService, FavoritesService ]
})
export class RecipeDetailsPage implements OnInit {

  favorite:Favorite = {
    recipeId: "",
    addedAt: new Date().getTime()
  };

  isFavorite = false;

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
    public favoritesService: FavoritesService, 
    private route: ActivatedRoute, 
    private router: Router,
    private loadingCtrl: LoadingController
  ) { 

  }

  ngOnInit() {
    this.recipeId = this.route.snapshot.paramMap.get('id');
    if(this.wordpressService.wp_org){
        this.wordpressService.getRecipe(this.recipeId).subscribe(data => {
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

  async toggleFavorite() {
    const loading = await this.loadingCtrl.create({
      message: 'Saving...',
      spinner: 'crescent',
      duration: 3000
    });
    loading.present();
    if(this.favorite.id == null) {
      //save the new note
      this.favorite.recipeId = this.recipeId;
      this.favorite.addedAt = new Date().getTime();
      this.favoritesService.addFavorite(this.favorite).then((favoriteDoc) => {
        this.favorite.id = favoriteDoc.id;
        this.isFavorite = true;
        loading.dismiss();
      });
    } else {
      this.favoritesService.deleteFavorite(this.favorite.id);
      loading.dismiss();
    }
   
  }

}
