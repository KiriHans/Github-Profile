import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { GithubUser } from '../models/user.models';
import { Followers } from '../models/followers.models';
import { UserListResult } from '../models/user-list.models';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'any' })
export class GithubApiService {
  private readonly URL = environment.apiGithubUrl;
  private readonly AUTH = `Bearer ${environment.apiKey}`;

  headers = new HttpHeaders().set('Authorization', this.AUTH);
  params = new HttpParams().set('per_page', '100');

  user$!: Observable<GithubUser>;
  userList$!: Observable<UserListResult>;

  followers$!: Observable<Followers[]>;

  constructor(private http: HttpClient) {}

  getUserList(user: string): void {
    this.userList$ = this.http
      .get<UserListResult>(`${this.URL}/search/users?q=${user}+type:user`, {
        headers: this.headers,
      })
      .pipe(
        catchError(() => {
          throw throwError(() => new Error("couldn't get user List..."));
        })
      );
  }

  getUser(user: string): void {
    this.user$ = this.http
      .get<GithubUser>(`${this.URL}/users/${user}`, { headers: this.headers })
      .pipe(
        catchError((error: Response) => {
          if (error.status == 404) {
            throw throwError(() => new Error("The user doesn't exist"));
          } else {
            throw throwError(() => new Error("couldn't get user..."));
          }
        })
      );
  }

  getFollowersUser(user: string): void {
    this.followers$ = this.http
      .get<Followers[]>(`${this.URL}/users/${user}/followers`, {
        headers: this.headers,
        params: this.params,
      })
      .pipe(
        catchError(() => {
          throw throwError(() => new Error("couldn't get user's followers"));
        })
      );
  }
}
