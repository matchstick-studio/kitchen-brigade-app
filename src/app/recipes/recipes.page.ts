import { Component, OnInit } from '@angular/core';
import { WordpressService } from '../services/wordpress.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
})
export class RecipesPage implements OnInit {

  items: any[];
  attachs: any[];
  thumbs =  new Map();
  thumbsArr: any[];
  page: number;
  loaded:boolean;
  loading:boolean;

  constructor(
    public wordpressService: WordpressService,
    private router: Router
  ) { }

  getKeys(map){
    return Array.from(map.keys());
  }

  goTo(str: string){
  this.router.navigate([ 'app/recipe-details/'+ str ]);
}

loadRecipes(){
  this.loading = true;
  if(this.wordpressService.wp_org){
    this.wordpressService.getRecipes(this.page).subscribe(data => {
      this.items = data;
      console.log('Recipe data:', data);
      for (let res of data) {
        if(!this.thumbs.has(res.id)){
          this.thumbs.set(res.id, {id: res.id, title: res.title.rendered, image: res.fimg_url});
        }        
      }
      this.loading = false;
      this.loaded = true;
    });
  }
}

next() {
  this.page++;
  this.loadRecipes();
}

ngOnInit() {
  this.loading = false;
  this.page = 1;
  this.loadRecipes();
}

}
