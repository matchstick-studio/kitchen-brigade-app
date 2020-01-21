import { Component, OnInit } from '@angular/core';
import { WordpressService } from '../../services/wordpress.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  providers: [ WordpressService ]
})
export class PostsComponent implements OnInit {

  items: any[];
  attachs: any[];
  thumbs =  new Map();
  thumbsArr: any[];
  page: number;
  loaded:boolean;
  loading:boolean;

slideOptsPosts = {
  spaceBetween: 0,
  slidesPerView: 1.25,
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
  },
};

 slideOptsRecipes = {
   spaceBetween: 0,
   slidesPerView: 1.65,
 };

  constructor(
    public wordpressService: WordpressService
  ) { }

  getKeys(map){
    return Array.from(map.keys());
  }

  loadPosts(){
    this.loading = true;
    if(this.wordpressService.wp_org){
      this.wordpressService.getPosts(this.page).subscribe(data => {
        this.items = data;
        for (let res of data) {
          if(!this.thumbs.has(res.id)){
            this.thumbs.set(res.id, {id: res.id, title: res.title.rendered, image: res._embedded['wp:featuredmedia']['0'].source_url, content: res.content.rendered});
          }        
        }
        this.loading = false;
        this.loaded = true;
      });
    }
    else {
      this.wordpressService.getPosts(this.page).subscribe(data => {
        this.items = data.posts;
        for (let res of data.posts) {
          if(!this.thumbs.has(res.ID)){
            this.thumbs.set(res.ID, {id: res.ID, title: res.title, media: res.featured_media, content: res.content.replace('<li class="jetpack-recipe-print"><a href="#">Print</a></li>','')});
          }        
        }
        this.loading = false;
        this.loaded = true;
      });
    }
  }

  next() {
    this.page++;
    this.loadPosts();
  }

  ngOnInit() {
    this.loading = false;
    this.page = 1;
    this.loadPosts();
  }

}
