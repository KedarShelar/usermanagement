import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  signupForm!: FormGroup;
  statelist: any;
  languages: any = [''];
  errors: any = [];
  selectedFile: File | null = null;
  imageSrc!: string;

  constructor(
    private formbuilder: FormBuilder,
    private _router: Router,
    private service: ApiService
  ) {
    this.service.getlang().subscribe((res: any) => (this.languages = res));
  }

  ngOnInit(): void {
    this.signupForm = this.formbuilder.group(
      {
        image: new FormControl('', [Validators.required]),

        email: new FormControl('', [
          Validators.required,
          Validators.email,
          this.emailValidator,
        ]),
        name: ['', Validators.required],
        mobile: new FormControl('', [
          Validators.required,
          this.mobileValidator,
        ]),
        password: ['', [Validators.required]],
        confirmpassword: ['', [Validators.required]],
        gender: ['', Validators.required],
        state: this.formbuilder.control('', Validators.required),
        languages: this.formbuilder.array([], Validators.required),
      },
      { validator: this.passwordMatchValidator }
    );

    this.service.getstate().subscribe((res: any) => (this.statelist = res));
  }

  get f() {
    return this.signupForm.controls;
  }
  onFileChange(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imageSrc = reader.result as string;

        this.signupForm.patchValue({
          image: reader.result,
        });
      };
    }
  }

  signUp() {
    console.log(this.signupForm);

    if (!this.signupForm.errors) {
      this.service.registeruser(this.signupForm.value).subscribe((res) => {
        console.log(res);
        alert('Signup Successfully');

        this._router.navigate(['/signin']);
        this.signupForm.reset();
      }),
        (err: any) => {
          console.log(err);
          alert('Signup Error');
        };
    } else {
      console.warn('Please fill out the details');
    }
  }

  getError(control: any): any {
    if (control.errors?.required && control.touched)
      return 'This field is required!';
    else if (control.errors?.error && control.touched)
      return 'Please enter valid information!';
    else return '';
  }

  emailValidator(control: AbstractControl) {
    const pattern = /^(?=.*\.)[A-Za-z0-9_.]+@[A-Za-z0-9.-]+?\.[A-Za-z]{2,20}$/;
    const value = control.value;

    return !pattern.test(value) && control.touched
      ? { emailerror: true }
      : null;
  }

  mobileValidator(control: AbstractControl) {
    const pattern = /^[789]\d{9}$/;
    const value = control.value;

    return !pattern.test(value) && control.touched
      ? { mobileerror: true }
      : null;
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

  get languageArray() {
    return this.signupForm.get('languages') as FormArray;
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
}
