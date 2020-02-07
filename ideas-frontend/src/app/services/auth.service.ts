import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@env/environment';
import { ApiService } from './api.service';
import { AuthType, AuthDTO } from '@app/models/auth';
import { mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { User } from '@app/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api: string = environment.api_server + '/auth';

  constructor(
    private http: HttpClient
  ) { }

  private auth(authType: AuthType, data: AuthDTO) {
    return this.http.post(`${this.api}/${authType}`, data).pipe(
      mergeMap((user: User) => {
        this.token = user.access_token;
        return of(user);
      })
    );
  }

  login(data: AuthDTO) {
    return this.auth('login', data);
  }

  register(data: AuthDTO) {
    return this.auth('register', data);
  }

  whoami() {
    return this.http.get(`${this.api}/whoami`, {
      headers: { authorization: `Bearer ${this.token}` }
    });
  }

  get token() {
    return localStorage.getItem('idea_token');
  }

  set token(val: string) {
    if (val) {
      localStorage.setItem('idea_token', val);
    } else {
      localStorage.clear();
    }
  }

  deleteToken() {
    localStorage.clear();
  }
}
