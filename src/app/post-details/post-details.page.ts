import { Component, OnInit } from '@angular/core';
import { WordpressService } from '../services/wordpress.service';
import { FavoritesService } from '../services/favorites.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import * as firebase from 'firebase';
import { Favorite } from '../models/favorite';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../services/firestore/firebase-authentication.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.page.html',
  styleUrls: ['./post-details.page.scss'],
  providers:[ WordpressService, FavoritesService ]
})
export class PostDetailsPage implements OnInit {

  favorite:Favorite = {
    postId: "",
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
    private firestore: AngularFirestore,
    private authServ: AuthService,
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

/*   async toggleFavorite() {
    const loading = await this.loadingCtrl.create({
      message: 'Saving...',
      spinner: 'crescent',
      duration: 3000
    });
    loading.present();
    if(this.favorite.id == null) {
      //save the new note
      this.favorite.postId = this.postId;
      this.favoritesService.addFavorite(this.favorite).then((favoriteDoc) => {
        this.favorite.id = favoriteDoc.id;
        this.isFavorite = true;
        loading.dismiss();
      });
    } else {
      this.favoritesService.updateFavorite(this.favorite);
      loading.dismiss();
    }
   
  } */

  async toggleFavorite() {

    const loading = await this.loadingCtrl.create({
      message: 'Saving...',
      spinner: 'crescent',
      duration: 3000
    });
    loading.present();

    const user: firebase.User = await this.authServ.getUser();
    this.firestore.collection('users').doc(`${user.uid}`).collection('favorites').doc(this.postId)
    .get()
    .subscribe(docSnapshot => {
      if (docSnapshot.exists) {
        // check if recipe exists, if yes, delete the thing
        this.favoritesService.deleteFavorite(this.postId)
        this.isFavorite = false;
        loading.dismiss();
      } else {
        // save the fucking recipe
        this.favoritesService.addFavorite(this.postId)
        this.isFavorite = true;
        loading.dismiss();
      }
    });
  }
  
}
 