import { Component, Input } from '@angular/core';
import { Repository } from 'src/app/github-profile/models/repository.models';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-user-repository',
  templateUrl: './user-repository.component.html',
  styleUrls: ['./user-repository.component.scss'],
  standalone: true,
  imports: [NgFor, NgIf],
})
export class UserRepositoryComponent {
  @Input() repositories: Repository[] = [];
}
