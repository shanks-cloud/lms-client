import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { MemberService } from '../../services/member.service';
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

  userDTO: UserDTO;
  loginForm: FormGroup;


  registerForm = new FormGroup({
    memberId: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    emailId: new FormControl(''),
    password: new FormControl('')
  });


  constructor(private memberService: MemberService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

    this.loginForm = new FormGroup({
      emailId: new FormControl(''),
      password: new FormControl('')
    });

  }

  onRegister() {
    console.log("Registration form values...." + JSON.stringify(this.registerForm.value));

    this.memberService.register(this.registerForm.value).subscribe((data) => {
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

}