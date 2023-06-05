import { Component, OnInit } from '@angular/core';
import { UserInformationComponent } from './user-information/user-information.component';
import { HeaderComponent } from './header/header.component';

@Component({
    selector: 'app-github-profile',
    templateUrl: './github-profile.component.html',
    styleUrls: ['./github-profile.component.scss'],
    standalone: true,
    imports: [HeaderComponent, UserInformationComponent],
})
export class GithubProfileComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
