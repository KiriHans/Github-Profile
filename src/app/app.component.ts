import { Component } from '@angular/core';
import { GithubProfileComponent } from './github-profile/components/github-profile.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [GithubProfileComponent],
})
export class AppComponent {
  title = 'github-profile';
}
