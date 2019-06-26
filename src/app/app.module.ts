import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostComponent } from './post/post.component';
import {HttpClientModule} from '@angular/common/http';
import {PostService} from './service/postService';
import {MaterialModule} from './material.module';

@NgModule({
  declarations: [
    AppComponent,
    PostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
