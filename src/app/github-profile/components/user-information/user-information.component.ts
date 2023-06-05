import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Followers } from 'src/app/github-profile/models/followers.models';
import { Repository } from 'src/app/github-profile/models/repository.models';
import { GithubUser } from 'src/app/github-profile/models/user.models';
import { GithubApiService } from 'src/app/github-profile/services/github-api.service';
import { GithubLoaderService } from 'src/app/github-profile/services/github-loader.service';
import { GithubRepositoriesService } from 'src/app/github-profile/services/github-repositories.service';
import { FollowerCardsComponent } from './follower-cards/follower-cards.component';
import { UserRepositoryComponent } from './user-repository/user-repository.component';
import { UserCardComponent } from './user-card/user-card.component';
import { NgIf } from '@angular/common';
import { SearchUserComponent } from './search-user/search-user.component';

@Component({
    selector: 'app-user-information',
    templateUrl: './user-information.component.html',
    styleUrls: ['./user-information.component.scss'],
    standalone: true,
    imports: [
        SearchUserComponent,
        NgIf,
        UserCardComponent,
        UserRepositoryComponent,
        FollowerCardsComponent,
    ],
})
export class UserInformationComponent implements OnInit {
  user!: GithubUser | null;
  repository!: Repository[] | null;
  followers!: Followers[] | null;
  error!: Error | null;

  constructor(
    private githubUser: GithubApiService,
    private githubRepo: GithubRepositoriesService,
    private githubLoader: GithubLoaderService
  ) {}

  ngOnInit(): void {}

  setData() {
    this.githubUser.user$
      .pipe(
        tap({
          next: () => {
            this.githubLoader.startLoading();
          },
          error: () => {
            this.githubLoader.startLoading();
          },
        })
      )
      .subscribe({
        next: (user) => {
          this.setDefault();
          this.user = user;
          this.setRepository();
          this.setFollowers();
          this.githubLoader.isUserLoading = false;
        },
        error: (error: Observable<never>) => {
          error.subscribe({
            error: (error: Error) => {
              this.error = error;
              this.githubLoader.isLoading = false;
              this.setDefault();

              setTimeout(() => {
                this.error = null;
              }, 3000);
            },
          });
        },
      });
  }

  setRepository() {
    this.githubRepo.repository$.subscribe({
      next: (repository) => {
        this.repository = repository;
        setTimeout(() => {
          this.githubLoader.isRepositoryLoading = false;
          this.githubLoader.checkLoad();
        }, 200);
      },
      error: (error: Observable<never>) => {
        error.subscribe({
          error: (error: Error) => {
            this.error = error;
            this.setDefault();
            setTimeout(() => {
              this.error = null;
            }, 3000);
          },
        });
      },
    });
  }

  setFollowers() {
    this.githubUser.followers$.subscribe({
      next: (followers) => {
        this.followers = followers;
        setTimeout(() => {
          this.githubLoader.isfollowersLoading = false;
          this.githubLoader.checkLoad();
        }, 200);
      },
      error: (error: Observable<never>) => {
        error.subscribe({
          error: (error: Error) => {
            this.error = error;
            this.setDefault();
            setTimeout(() => {
              this.error = null;
            }, 3000);
          },
        });
      },
    });
  }

  setDefault() {
    this.user = null;
    this.repository = [];
    this.followers = [];
  }

  public get isLoading(): boolean {
    return this.githubLoader.isLoading;
  }
}
