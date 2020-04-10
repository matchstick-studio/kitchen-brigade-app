import { Component, OnInit } from '@angular/core';
import { WordpressService } from '../../services/wordpress.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
  providers: [ WordpressService ]
})
export class RecipesComponent implements OnInit {

  items: any[];
  attachs: any[];
  thumbs =  new Map();
  thumbsArr: any[];
  page: number;
  loaded:boolean;
  loading:boolean;

  slideOptsRecipes = {
    spaceBetween: 10,
    slidesPerView: 1,
    centeredSlides: true
  };

  constructor(
    public wordpressService: WordpressService,
    private route: ActivatedRoute, 
    private router: Router
  ) { }

  getKeys(map){
    return Array.from(map.keys());
  }

  escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
  }
  
  replaceAll(str, find, replace) {
    return str.replace(new RegExp(this.escapeRegExp(find), 'g'), replace);
  }

  goTo(str: string){
    this.router.navigate([ 'app/recipe-details/'+ str ]);
  }

  loadRecipes(){
    this.loading = true;
    if(this.wordpressService.wp_org){
      this.wordpressService.getRecipes(this.page).subscribe(data => {
        this.items = data.slice(0,6);
        console.log('Recipe data:', this.items);
        for (let res of this.items) {
          if(!this.thumbs.has(res.id)){
            this.thumbs.set(res.id, {id: res.id, title: res.title.rendered, image: res.fimg_url});
          }        
        }
        this.loading = false;
        this.loaded = true;
      });
    }
  }

  ngOnInit() {
    this.loading = false;
    this.page = 1;
    this.loadRecipes();
  }

}
