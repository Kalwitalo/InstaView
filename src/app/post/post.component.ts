import {Component, OnInit} from '@angular/core';
import {PostService} from '../service/postService';
import {Post} from '../model/Post';
import Glide from '@glidejs/glide';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  public posts: Post[] = [];

  constructor(private postService: PostService) {
  }

  ngOnInit() {
    /* Get the element you want displayed in fullscreen */
    new Glide('.glide', {
      type: 'carousel',
      startAt: 0,
      autoplay: 5000,
    }).mount();
  }


  openFullScreen(): void {
    const elem = document.getElementById('carousel');

    const docElmWithBrowsersFullScreenFunctions = elem as HTMLElement & {
      mozRequestFullScreen(): Promise<void>;
      webkitRequestFullscreen(): Promise<void>;
      msRequestFullscreen(): Promise<void>;
    };

    if (docElmWithBrowsersFullScreenFunctions.requestFullscreen) {
      docElmWithBrowsersFullScreenFunctions.requestFullscreen();
    } else if (docElmWithBrowsersFullScreenFunctions.mozRequestFullScreen) { /* Firefox */
      docElmWithBrowsersFullScreenFunctions.mozRequestFullScreen();
    } else if (docElmWithBrowsersFullScreenFunctions.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
      docElmWithBrowsersFullScreenFunctions.webkitRequestFullscreen();
    } else if (docElmWithBrowsersFullScreenFunctions.msRequestFullscreen) { /* IE/Edge */
      docElmWithBrowsersFullScreenFunctions.msRequestFullscreen();
    }
  }

  findPostByHashtag(hashtag: string): void {
    this.posts = [];
    this.postService.getPosts(hashtag).subscribe(posts => {
      this.posts = posts;
      console.log('Finalizado');
    });
  }
}
