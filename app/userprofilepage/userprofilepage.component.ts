import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-userprofilepage',
  templateUrl: './userprofilepage.component.html',
  styleUrls: ['./userprofilepage.component.css'],
})
export class UserprofilepageComponent implements OnInit {
  router: any;
  returnUrl: any;
  message: any;
  userprofilepage!: FormGroup;
  token: any = localStorage.getItem('token');
  user: any;
  statelist: any;
  languages: any = [];
  // imageUrl!: string;

  constructor(private service: ApiService, private formBuilder: FormBuilder) {
    this.service.getstate().subscribe((res: any) => (this.statelist = res));

    this.service.getlang().subscribe((res: any) => (this.languages = res));
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

    this.userprofilepage = this.formBuilder.group(
      {
        image: new FormControl('', [Validators.required]),
        email: ['', Validators.required],
        name: ['', Validators.required],
        mobile: ['', Validators.required],
        password: ['', Validators.required],
        confirmpassword: ['', Validators.required],
        gender: ['', Validators.required],
        state: this.formBuilder.control('', Validators.required),
        languages: this.formBuilder.array([], Validators.required),
      },
      { validator: this.passwordMatchValidator }
    );
  }
  get f() {
    return this.userprofilepage.controls;
  }

  imageSrc!: string | ArrayBuffer;

  onFileChange(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imageSrc = reader.result as string;

        this.user.image = this.imageSrc;

        this.service.updateUserprofile(this.user).subscribe((res: any) => {
          console.log(res + 'User updated successfully.');
        });
      };
    }
  }

  get languageArray() {
    return this.userprofilepage.get('languages') as FormArray;
  }

  toggleLanguageSelection(language: string) {
    const index = this.languageArray.controls.findIndex(
      (control) => control.value === language
    );
    if (index === -1) {
      this.languageArray.push(new FormControl(language));
    } else {
      this.languageArray.removeAt(index);
    }
  }

  updateUser(user: any) {
    this.service.updateUserprofile(user).subscribe((res: any) => {
      console.log(res + 'User updated successfully.');
    });
  }

  passwordMatchValidator(group: FormGroup) {
    const passwordControl = group.get('password');
    const confirmPasswordControl = group.get('confirmpassword');

    if (!passwordControl || !confirmPasswordControl) {
      return null;
    }

    const password = passwordControl.value;
    const confirmPassword = confirmPasswordControl.value;

    console.log(password === confirmPassword);

    group.controls['confirmpassword'].setErrors({
      passwordMismatch: password !== confirmPassword,
    });
    return password === confirmPassword ? null : { passwordMismatch: true };
  }
}
