import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import {
  UserListResult,
  UserResult,
} from 'src/app/github-profile/models/user-list.models';
import { GithubApiService } from 'src/app/github-profile/services/github-api.service';
import { GithubRepositoriesService } from 'src/app/github-profile/services/github-repositories.service';
import { NgIf, NgFor } from '@angular/common';

@Component({
    selector: 'app-search-user',
    templateUrl: './search-user.component.html',
    styleUrls: ['./search-user.component.scss'],
    standalone: true,
    imports: [
        ReactiveFormsModule,
        NgIf,
        NgFor,
    ],
})
export class SearchUserComponent implements OnInit {
  @Output() search = new EventEmitter();
  @Input() isSearching!: boolean;

  myForm!: FormGroup;
  userList!: UserListResult;
  isSelected = false;
  error!: Error;

  constructor(
    private githubUser: GithubApiService,
    private githubRepo: GithubRepositoriesService
  ) {}

  ngOnInit(): void {
    this.myForm = new FormGroup({
      searchBar: new FormControl('', Validators.required),
      searchButton: new FormControl(''),
    });

    this.searchBar?.valueChanges
      .pipe(
        debounceTime(400),
        switchMap((user) => {
          if (user !== '') {
            this.githubUser.getUserList(user);
            return this.githubUser.userList$;
          }
          return of({ total_count: 0, incomplete_results: false, items: [] });
        })
      )
      .subscribe({
        next: (userList) => {
          this.userList = userList;
        },
        error: (error) => {
          error.subscribe({
            error: (error: Error) => {
              console.log(error.message);
            },
          });
        },
      });
  }

  selectSearchBarElement(user: UserResult) {
    this.searchBar?.setValue(user.login);
    this.onSelected(false);
  }

  onSelected(value: boolean) {
    this.isSelected = value;
  }

  setUserData(user: string) {
    this.githubUser.getUser(user);
    this.githubRepo.getRepositoryUser(user);
    this.githubUser.getFollowersUser(user);
    this.onSelected(false);
    this.search.emit();
  }

  public get searchBar() {
    return this.myForm.get('searchBar');
  }

  public get searchButton() {
    return this.myForm.get('searchButton');
  }
}
