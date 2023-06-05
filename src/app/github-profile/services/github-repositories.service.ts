import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Repository } from '../models/repository.models';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'any' })
export class GithubRepositoriesService {
  private readonly URL = environment.apiGithubUrl;
  private readonly AUTH = `Bearer ${environment.apiKey}`;

  headers = new HttpHeaders().set('Authorization', this.AUTH);
  params = new HttpParams().set('per_page', '100');

  repository$!: Observable<Repository[]>;

  constructor(private http: HttpClient) {}

  getRepositoryUser(user: string): void {
    this.repository$ = this.http
      .get<Repository[]>(`${this.URL}/users/${user}/repos`, {
        headers: this.headers,
        params: this.params,
      })
      .pipe(
        catchError((error: Response) => {
          if (error.status == 404) {
            throw throwError(() => new Error("The user doesn't exist"));
          } else {
            throw throwError(() => new Error("couldn't get user's followers"));
          }
        })
      );
  }
}
