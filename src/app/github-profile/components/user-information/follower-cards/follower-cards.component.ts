import { Component, Input } from '@angular/core';
import { Followers } from 'src/app/github-profile/models/followers.models';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-follower-cards',
  templateUrl: './follower-cards.component.html',
  styleUrls: ['./follower-cards.component.scss'],
  standalone: true,
  imports: [NgFor, NgIf],
})
export class FollowerCardsComponent {
  @Input() followers!: Followers[];
}
