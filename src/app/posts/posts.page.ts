import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WordpressService } from '../services/wordpress.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit {

  items: any[];
  attachs: any[];
  thumbs =  new Map();
  thumbsArr: any[];
  page: number;
  loaded:boolean;
  loading:boolean;

  constructor(
    public wordpressService: WordpressService,
    public router: Router
  ) { }

  getKeys(map){
    return Array.from(map.keys());
  }

  goTo(str: string){
    this.router.navigate([ 'app/post-details/'+ str ]);
  }

  loadPosts(){
    this.loading = true;
    if(this.wordpressService.wp_org){
      this.wordpressService.getPosts(this.page).subscribe(data => {
        this.items = data;
        console.log('Post data:', data);
        for (let res of data) {
          if(!this.thumbs.has(res.id)){
            this.thumbs.set(res.id, {id: res.id, title: res.title.rendered, image: res.fimg_url, content: res.content.rendered});
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
