import { Component, OnInit } from '@angular/core';
import {PostService} from '../service/postService';
import {Post} from '../model/Post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  public posts: Post[] = [];
  constructor(private postService: PostService) { }

  ngOnInit() {
  }

  findPostByHashtag(hashtag: string): void {
    this.posts = [];
    this.postService.getPosts(hashtag).subscribe(posts => {
      this.posts = posts;
      console.log('Finalizado');
    });
  }
}
