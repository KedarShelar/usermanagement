import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { AuthGuard } from '../guard/auth.guard';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  loginForm!: FormGroup;
  message!: string;
  returnUrl!: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private service: ApiService,
    private guard: AuthGuard
  ) {}

  ngOnInit() {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      this.router.navigate(['/user']);
    } else {
      this.router.navigate(['/signin']);
    }

    this.loginForm = this.formBuilder.group({
      id: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.returnUrl = '/user';
  }

  get f() {
    return this.loginForm.controls;
  }

  logIn() {
    if (this.loginForm.invalid) {
      return;
    }

    const email = this.f['id'].value;
    const password = this.f['password'].value;

    this.service.findUserByemail(email).subscribe(
      (user) => {
        if (user && user.password === password) {
          console.log('Login successful');
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('token', email);
          this.guard.isLoggedIn;
          this.router.navigate([this.returnUrl]);
        } else {
          this.message = 'Invalid username or password';
        }
      },
      (error) => {
        console.error('Error during login:', error);
        this.message = 'An error occurred while logging in';
      }
    );
  }
}
