import { Component, OnInit } from '@angular/core';
import { WordpressService } from '../services/wordpress.service';
import { ActivatedRoute } from '@angular/router';
import { FavoritesService } from '../services/favorites.service';
import { LoadingController } from '@ionic/angular';
import { Favorite } from '../models/favorite';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../services/firestore/firebase-authentication.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.page.html',
  styleUrls: ['./recipe-details.page.scss'],
  providers:[ WordpressService, FavoritesService ]
})
export class RecipeDetailsPage implements OnInit {

  favorite:Favorite = {
    recipeId: "",
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
  link;

  constructor(
    public wordpressService: WordpressService, 
    public favoritesService: FavoritesService, 
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    private authServ: AuthService,
    private loadingCtrl: LoadingController,
    private socialSharing: SocialSharing
  ) { 

  }

  ngOnInit() {
    this.recipeId = this.route.snapshot.paramMap.get('id');
    if(this.wordpressService.wp_org){
        this.wordpressService.getRecipe(this.recipeId).subscribe(data => {
          this.title=data.title.rendered;
          this.image = data.fimg_url;
          this.link = data.link;
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

    const user: firebase.User = await this.authServ.getUser();
    this.firestore.collection('users').doc(`${user.uid}`).collection('favorites').doc(this.recipeId)
    .get()
    .subscribe(docSnapshot => {
      if (docSnapshot.exists) {
        // check if recipe exists, if yes, delete the thing
        this.favoritesService.deleteFavorite(this.recipeId)
        this.isFavorite = false;
        loading.dismiss();
      } else {
        // save the fucking recipe
        this.favoritesService.addFavorite(this.recipeId)
        this.isFavorite = true;
        loading.dismiss();
      }
    });
  }

  shareRecipe() {
    this.socialSharing.share(null, null, null, this.link).then((res) => {
      // shared
    }).catch((e) => {
      // Error!
    });
  }


}
