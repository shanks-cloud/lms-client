import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserDTO } from '../../model/UserDTO';

@Component({
  selector: 'app-pre-login',
  templateUrl: './pre-login.component.html',
  styleUrls: ['./pre-login.component.css']
})

export class PreLoginComponent implements OnInit {

  invalidLogin: boolean;
  loginSuccess: boolean;
  successMessage: string;

  msg: string;
  foundFlag: boolean;

  aadhaarPattern: string;
  namePattern: string;

  userDTO: UserDTO;

  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

    this.aadhaarPattern = "[0-9]*";
    this.namePattern = "[a-zA-Z ]*$";


    this.registerForm = new FormGroup({
      memberId: new FormControl('',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern(this.aadhaarPattern)
        ]),

      firstName: new FormControl('',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(30),
          Validators.pattern(this.namePattern)
        ]),

      lastName: new FormControl('',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(30),
          Validators.pattern(this.namePattern)
        ]),

      emailId: new FormControl('',
        [
          Validators.required,
          Validators.email
        ]),

      password: new FormControl('')
    });

    this.loginForm = new FormGroup({
      emailId: new FormControl(''),
      password: new FormControl('')
    });

  }

  get memberId() {
    return this.registerForm.get("memberId");
  }

  get firstName() {
    return this.registerForm.get("firstName");
  }

  get lastName() {
    return this.registerForm.get("lastName");
  }

  get emailId() {
    return this.registerForm.get("emailId");
  }


  onRegister() {
    console.log("Registration form values...." + JSON.stringify(this.registerForm.value));

    this.authService.register(this.registerForm.value).subscribe((data) => {
      console.log("profile details saved sucessfully");

      this.invalidLogin = false;
      this.loginSuccess = true;
      this.successMessage = 'Login Successful.';

      this.router.navigate(['/home']);

    })
  }


  onSignIn() {

    console.log("email id is " + this.loginForm.get('emailId').value);

    // this.userDTO.emailId = this.loginForm.get('emailId').value;
    // this.userDTO.password = this.loginForm.get('password').value;

    this.userDTO = {
      emailId: this.loginForm.get('emailId').value,
      password: this.loginForm.get('password').value
    };

    this.authService.authenticationService(this.userDTO).subscribe((data) => {
      this.router.navigate(['/home']);
    });
  }

  findEmailId(event: any, registerForm: NgForm) {
    console.log("event target value is " + event.target.value);

    this.userDTO = {
      emailId: this.registerForm.get('emailId').value,
      password: this.registerForm.get('password').value
    };


    if (event.target.value != '') {

      console.log("user DTO before calling fetchEmailId().. " + JSON.stringify(this.userDTO));

      this.authService.fetchEmailId(this.userDTO).subscribe((data) => {
        console.log("data is..." + JSON.stringify(data));

        if (data != null) {
          this.msg = "Email ID already exists !";
          this.foundFlag = true;

          setTimeout(() => {
            this.foundFlag = false;
            registerForm.reset;
          }, 3000);

        }

      })
    }
  }
}