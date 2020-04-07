import { Component, OnInit } from '@angular/core';
import { Favorite } from '../models/favorite';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AuthService } from '../services/firestore/firebase-authentication.service';
import { WordpressService } from '../services/wordpress.service';
import { FavoritesService } from '../services/favorites.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.page.html',
  styleUrls: ['./saved.page.scss'],
})
export class SavedPage implements OnInit {

  userFavs = [];
  savedItems = null;

  recipeId;
  content;
  title;
  image;
  items: any[];
  thumbs =  new Map();
  thumbsArr: any[];
  loaded:boolean;
  loading:boolean;

  constructor(
    public wordpressService: WordpressService,
    public firestore: AngularFirestore,
    public authServ: AuthService,
    public favoriteService: FavoritesService,
    public alertCtrl: AlertController,
    public router: Router
  ) { 
   
  }

  getKeys(map){
    return Array.from(map.keys());
  }

  goTo(str: string){
    this.router.navigate([ 'app/recipe-details/'+ str ]);
  }

  ngOnInit() {

    this.loading = false;

    this.getSavedBookmarks();

  }

  async getSavedBookmarks() {

    this.loading = true;

    const user: firebase.User = await this.authServ.getUser();
    this.savedItems = this.firestore.collection(`users/${user.uid}/favorites`).valueChanges().subscribe({
      next: (userFavs: Favorite[]) => {
        console.log('Favorites: ' + JSON.stringify(userFavs));
        this.userFavs = userFavs;
        for (let i = 0; i < userFavs.length; i++) {

          let recipe = this.userFavs[i].recipeId 

          this.wordpressService.getRecipe(recipe).subscribe(data => {
            this.items = data;
              if(!this.thumbs.has(data.id)){
                this.thumbs.set(data.id, {id: data.id, title: data.title.rendered, image: data.fimg_url});
              }
              this.loading = false;
              this.loaded = true;
          });

        }
      },
      error: () => { console.log('Error'); },
      complete: () => { console.log('Complete'); }
    });
  }

  ionRefresh(event) {
    console.log('Pull Event Triggered!');
    this.getSavedBookmarks();
    setTimeout(() => {
      console.log('Async operation has ended');
  
      //complete()  signify that the refreshing has completed and to close the refresher
      event.target.complete();
    }, 2000);
  }


}
