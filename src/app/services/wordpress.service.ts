import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class WordpressService {
    items: any[];
    categories: any[];
    public wp_org: boolean = true;
    mainUrl: String = "https://kitchenbrigade.org/wp-json/wp/v2/";

    constructor(private http: HttpClient) {
        if (this.wp_org == false) {
            this.mainUrl = "http://demo.wp-api.org/wp-json/wp/v2/";
        }
    }

    public getPosts(page: number): any {
        return this.http.get(this.mainUrl + "posts/?_embed&status=publish&page=" + page);
    }

    public getPostsByCat(categoryName: string, page: number): any {
        if (this.wp_org) {
            return this.http.get(this.mainUrl + "posts/?status=publish&categories=" + categoryName + "&page=" + page);
        }
        return this.http.get(this.mainUrl + "posts/?status=publish&category=" + categoryName + "&page=" + page);
    }

    public getCategories(): any {
        if (this.wp_org) {
            return this.http.get(this.mainUrl + "categories?order_by=count&order=desc");
        }
        return this.http.get(this.mainUrl + "categories?order_by=count&order=DESC");
    }

    public search(searchStr: string, page: number): any {
        return this.http.get(this.mainUrl + "posts/?status=publish&search=" + searchStr + "&page=" + page);
    }

    public getPost(postId: string): any {
        return this.http.get(this.mainUrl + "posts/" + postId);
    }

    public getRecipes(page: number): any {
        return this.http.get(this.mainUrl + "recipe/?_embed&status=publish&page=" + page);
    }

    public getRecipe(recipeId: string): any {
        return this.http.get(this.mainUrl + "recipe/" + recipeId);
    }
}