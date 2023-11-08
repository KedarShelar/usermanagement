import { Component, OnInit } from '@angular/core';
import { ApiService } from './service/api.service';
import { Router } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'dynamic_table';
  islogin = false;
  islogout = false;
  image!: any;
  token: any = localStorage.getItem('token');
  user: any;
  message: any;
  constructor(
    public _service: ApiService,
    private router: Router,
    public guard: AuthGuard,
    public service: ApiService
  ) {
    console.log(this.guard.isLoggedIn);
  }
  ngOnInit() {
    const email = this.token;

    this.service.findUserByemail(email).subscribe(
      (user) => {
        this.user = user;

        console.log(user);
      },
      (error) => {
        console.error('Error during login:', error);
        this.message = 'An error occurred while logging in';
      }
    );
  }

  logout(): void {
    console.log('Logout');
    this._service.logoutva();
    this.router.navigate(['signin']);
  }

  signIn(): void {
    this.router.navigate(['']);
  }

  signup(): void {
    this.router.navigate(['signup']);
  }
}
