import { Component, OnInit } from '@angular/core';
import { Favorite } from '../models/favorite';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AuthService } from '../services/firestore/firebase-authentication.service';
import { WordpressService } from '../services/wordpress.service';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.page.html',
  styleUrls: ['./saved.page.scss'],
})
export class SavedPage implements OnInit {

  userFavs = [];
  savedItems = null;

  postId;
  content;
  title;
  image;

  constructor(
    public wordpressService: WordpressService,
    public firestore: AngularFirestore,
    public authServ: AuthService
  ) { 
   
  }

  ngOnInit() {
    
    this.getSavedBookmarks();
    
    this.postId = 499;

    if(this.wordpressService.wp_org){
        this.wordpressService.getPost(this.postId).subscribe(data => {
          this.content = data.content.rendered;
          this.title=data.title.rendered;
          this.image = data.fimg_url;
        });
    }

  }

  async getSavedBookmarks() {
    const user: firebase.User = await this.authServ.getUser();
    this.savedItems = this.firestore.collection(`users/${user.uid}/favorites`).valueChanges().subscribe({
      next: (userFavs: Favorite[]) => {
        console.log('Favorites: ' + JSON.stringify(userFavs));
        this.userFavs = userFavs;
      },
      error: () => { console.log('Error'); },
      complete: () => { console.log('Complete'); }
    });
  }


}
