import {Injectable} from '@angular/core';
import {Post} from '../model/Post';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class PostService {
  constructor(private http: HttpClient) {
  }

  getPosts(hashtag: string): Observable<Post[]> {
    const postsSubject = new Subject<Post[]>();
    const url = `https://www.instagram.com/explore/tags/${hashtag}/?__a=1`;
    this.http.get(url).subscribe(data => {

      // @ts-ignore
      const {graphql: {hashtag: {edge_hashtag_to_media: {edges}}}} = data;
      const posts: Post[] = [];
      for (const edge of edges) {
        const {node} = edge;
        const p = Post.formInstaHtagEdge(hashtag, node);
        posts.push(p);
      }
      postsSubject.next(posts);
    });

    return postsSubject.asObservable();
  }

}
