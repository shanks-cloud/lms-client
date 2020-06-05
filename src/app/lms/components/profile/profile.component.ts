import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { MemberService } from '../../services/member.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})


export class ProfileComponent implements OnInit {

  states = [];
  cities = [];

  profileForm = new FormGroup({
    memberId: new FormControl(''),
    firstName: new FormControl(''),
    middleName: new FormControl(''),
    lastName: new FormControl(''),
    mobileNumber: new FormControl(''),
    emailId: new FormControl(''),
    addressLine1: new FormControl(''),
    addressLine2: new FormControl(''),
    state: new FormControl(''),
    city: new FormControl(''),
    zip: new FormControl(''),
    country: new FormControl(''),
  });

  constructor(private memberService: MemberService) { }

  ngOnInit(): void {

    this.states = [

      "Andhra Pradesh",
      "Assam",
      "Bihar",
      "Chhagttisgarh",
      "Delhi",
      "Goa",
      "Gujarat",
      "Haryana",
      "Karnataka",
      "Kerala",
      "Jammu and Kashmir",
      "Jharkhand",
      "Maharashtra",
      "Madhya Pradesh",
      "Odisha",
      "Pondicherry",
      "Punjab",
      "Rajasthan",
      "Tamil Nadu",
      "Telangana",
      "Uttar Pradesh",
      "Uttarakhand",
      "West Bengal"
    ];


    this.cities = [
      "New Delhi",
      "Hyderabad",
      "Patna",
      "Raipur",
      "New Delhi",
      "Panaji",
      "Ahmedabad",
      "Chandigarh",
      "Bengauluru",
      "Trivandrum",
      "Srinagar",
      "Ranchi",
      "Mumbai",
      "Bhopal",
      "Bubaneshwar",
      "Pondicherry",
      "Jaipur",
      "Chennai",
      "Amaravati",
      "Lucknow",
      "Deharadun",
      "Kolkotta"
    ]

  }

  // onSubmit() {
  //   console.log("Registration form values with Stringify...." + JSON.stringify(this.profileForm.value));

  //   this.memberService.addProfile(this.profileForm.value).subscribe((data) => {
  //     console.log("profile details saved sucessfully");
  //   })

  // }


}
