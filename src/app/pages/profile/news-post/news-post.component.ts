import { Component, Input } from '@angular/core';
import { NewsPost } from '../../layout/news.service';



@Component({
  selector: 'ngx-news-post',
  templateUrl: 'news-post.component.html',
})
export class NewsPostComponent {

  @Input() post: NewsPost;
}
