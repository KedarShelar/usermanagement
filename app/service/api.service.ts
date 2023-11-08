import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  onUserRestore = new Subject<any>();
  constructor(private Http: HttpClient) {}

  apiurl = 'http://localhost:3000';

  findUserByemail(email: string): Observable<any | undefined> {
    return this.Http.get<any[]>(`${this.apiurl}/signup`).pipe(
      map((res) => {
        const user = res.find((user) => user.email === email);

        return user;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  logoutva() {
    localStorage.setItem('isLoggedIn', 'false');
  }

  registeruser(data: any) {
    return this.Http.post<any>(`${this.apiurl}/signup`, data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getuser() {
    return this.Http.get<any>(`${this.apiurl}/data`);
  }

  updateuser(profile: any): Observable<any> {
    return this.Http.put(`${this.apiurl}/signup/${profile.id}`, profile);
  }

  updateUserprofile(user: any): Observable<any> {
    return this.Http.put<any>(`http://localhost:3000/signup/${user.id}`, user);
  }

  subscribeOnUserRestore() {
    return this.onUserRestore.asObservable();
  }

  restoreUser(data: any) {
    this.onUserRestore.next(data);
  }

  adduser(data: any) {
    return this.Http.post<any>(`${this.apiurl}/data`, data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  private serialNumber = 20;

  Permanentdeleteuser(user: any): Observable<any> {
    return this.Http.delete(`${this.apiurl}/data/${user.id}`, user);
  }

  getstate() {
    return this.Http.get<any>(`${this.apiurl}/states`);
  }

  getlang(): Observable<any[]> {
    return this.Http.get<any[]>(`${this.apiurl}/languages`);
  }
}
