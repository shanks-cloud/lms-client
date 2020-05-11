import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MemberService } from '../../services/member.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-pre-login',
  templateUrl: './pre-login.component.html',
  styleUrls: ['./pre-login.component.css']
})
export class PreLoginComponent implements OnInit {

  invalidLogin: boolean;
  loginSuccess: boolean;
  successMessage: string;


  registerForm = new FormGroup({
    memberId: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    emailId: new FormControl(''),
    password: new FormControl('')
  });


  loginForm = new FormGroup({
    emailId: new FormControl(''),
    password: new FormControl('')
  });


  constructor(private memberService: MemberService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
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
    this.authService.authenticationService(this.loginForm.get('emailId').value, this.loginForm.get('password').value).subscribe((data => {
      this.router.navigate(['/home']);
    }))
  }


}
