import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'any' })
export class GithubLoaderService {
  isLoading = false;
  isUserLoading = false;
  isRepositoryLoading = false;
  isfollowersLoading = false;

  checkLoad() {
    if (!this.isUserLoading && !this.isRepositoryLoading && !this.isfollowersLoading) {
      this.isLoading = false;
    }
  }

  startLoading() {
    this.isLoading = true;
    this.isUserLoading = true;
    this.isRepositoryLoading = true;
    this.isfollowersLoading = true;
  }
}
