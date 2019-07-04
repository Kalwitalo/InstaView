import {Component, OnInit} from '@angular/core';
import {PostService} from '../service/postService';
import {Post} from '../model/Post';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  public posts: Post[] = [];

  private refreshIntervalId;
  private INTERVAL_TO_REFRESH = 1000 * 60 * 10;

  constructor(private postService: PostService,
              config: NgbCarouselConfig) {
    config.interval = 5000;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = false;
    config.showNavigationArrows = false;
    config.showNavigationIndicators = false;
  }

  ngOnInit() {
  }

  public openFullScreen(): void {
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

  public findPosts(hashtag: string): void {
    hashtag = hashtag.trim().replace(/\s/g, '');
    this.findPostByHashtag(hashtag);

    this.repeatSearchEach10Minutes(hashtag);
  }

  private repeatSearchEach10Minutes(hashtag: string): void {
    clearInterval(this.refreshIntervalId);

    this.refreshIntervalId = setInterval(() => {
      this.findPostByHashtag(hashtag);
    }, this.INTERVAL_TO_REFRESH);
  }

  private findPostByHashtag(hashtag: string): void {
    this.postService.getPosts(hashtag).subscribe(posts => {
      this.posts = [];
      this.posts = posts;
      console.log('Finalizado');
    });
  }
}
