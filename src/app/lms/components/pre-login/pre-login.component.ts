import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserDTO } from '../../model/UserDTO';
import { MemberService } from '../../services/member.service';


@Component({
  selector: 'app-pre-login',
  templateUrl: './pre-login.component.html',
  styleUrls: ['./pre-login.component.css']
})
export class PreLoginComponent implements OnInit {

  invalidLogin: boolean;
  loginSuccess: boolean;
  successMessage: string;
  emailId: string;
  msg: string;
  foundFlag: boolean;

  userDTO: UserDTO;
  loginForm: FormGroup;


  registerForm = new FormGroup({
    memberId: new FormControl('', [Validators.required]),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    emailId: new FormControl(''),
    password: new FormControl('')
  });


  constructor(private authService: AuthService, private router: Router, private memberService: MemberService) { }

  ngOnInit(): void {

    this.loginForm = new FormGroup({
      emailId: new FormControl(''),
      password: new FormControl('')
    });

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

    this.authService.fetchEmailId(this.userDTO).subscribe((data) => {
      console.log("data is..." + JSON.stringify(data));
      this.msg = "Email ID already exists !";
      this.foundFlag = true;


      setTimeout(() => {
        this.foundFlag = false;
        registerForm.reset();
      }, 3000);

    })

  }
}