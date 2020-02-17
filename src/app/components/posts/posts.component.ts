import { Component, OnInit } from '@angular/core';
import { WordpressService } from '../../services/wordpress.service';
import { ActivatedRoute, Router } from '@angular/router';

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
