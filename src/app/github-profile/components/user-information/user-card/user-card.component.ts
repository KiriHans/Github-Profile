import { Component, Input, OnInit } from '@angular/core';
import { GithubUser } from 'src/app/github-profile/models/user.models';
import { GithubApiService } from 'src/app/github-profile/services/github-api.service';
import { NgIf, DatePipe } from '@angular/common';

@Component({
    selector: 'app-user-card',
    templateUrl: './user-card.component.html',
    styleUrls: ['./user-card.component.scss'],
    standalone: true,
    imports: [NgIf, DatePipe],
})
export class UserCardComponent implements OnInit {
  @Input() user!: GithubUser;
  constructor(private githubUser: GithubApiService) {}

  ngOnInit(): void {}
}
