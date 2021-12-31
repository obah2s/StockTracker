import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  public registrationForm = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {
    /*this.registrationForm.valueChanges.subscribe(res => console.log(res));*/
  }
/*
  register(): void {
    console.log(this.registrationForm.value);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.registrationForm.value) 
    };
    fetch('http://localhost:3000/api/auth/signup', options).then(res => {
      console.log(res);
      if (res.status === 200) {
        alert('Registration successful!');
      }
    });

  }*/

  register(): void {
    console.log(this.registrationForm.value);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      //body: JSON.stringify(this.registrationForm.value) 
    };
    let obs = this.http.post('http://localhost:3000/api/auth/signup', JSON.stringify(this.registrationForm.value), options);
    obs.subscribe(()=> alert('Registration successful!'));
  }
}
