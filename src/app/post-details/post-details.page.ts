import { Component, OnInit } from '@angular/core';
import { WordpressService } from '../services/wordpress.service';
import { FavoritesService } from '../services/favorites.service'
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import * as firebase from 'firebase';
import { Favorite } from '../models/favorite';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.page.html',
  styleUrls: ['./post-details.page.scss'],
  providers:[ WordpressService, FavoritesService ]
})
export class PostDetailsPage implements OnInit {

  favorite:Favorite = {
    postId: "",
    addedAt: new Date().getTime()
  };

  isFavorite = false;

  items: any[];
  postId;
  content;
  title;
  image;

  constructor(
    public wordpressService: WordpressService,
    public favoritesService: FavoritesService, 
    private route: ActivatedRoute, 
    private router: Router,
    private loadingCtrl: LoadingController
  ) { 

  }

  ngOnInit() {
    this.postId = this.route.snapshot.paramMap.get('id');

    if(this.wordpressService.wp_org){
        this.wordpressService.getPost(this.postId).subscribe(data => {
          this.content = data.content.rendered;
          this.title=data.title.rendered;
          this.image = data.fimg_url;
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
      this.favorite.postId = this.postId;
      this.favorite.addedAt = new Date().getTime();
      this.favoritesService.addFavorite(this.favorite).then((favoriteDoc) => {
        this.favorite.id = favoriteDoc.id;
        this.isFavorite = true;
        loading.dismiss();
      });
    } else {
      this.favoritesService.updateFavorite(this.favorite);
      loading.dismiss();
    }
   
  }
  
}
 