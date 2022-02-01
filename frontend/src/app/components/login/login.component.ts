import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;
  loginForm = new FormGroup({
    email : new FormControl('', [Validators.required, Validators.email]),
    password : new FormControl(''),
  });

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }
  onSubmit() {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    };
    let obs = this.http.post('http://localhost:3000/api/auth/login', JSON.stringify(this.loginForm.value),options);
    obs.subscribe(res=>{
      this.router.navigate(['home']);
    },err => { alert('Username or password is incorrect')});
  }
}
