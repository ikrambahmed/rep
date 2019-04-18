import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../../../../app.service';

@Component({
  selector: 'app-with-bg-image',
  templateUrl: './with-bg-image.component.html',
  styleUrls: ['./with-bg-image.component.css']
})
export class WithBgImageComponent implements OnInit {

  loginForm: FormGroup;

  credentials = {
    username: '',
    password: ''
  };

  constructor(private fb: FormBuilder,
    private appService: AppService,
    private router: Router) { }

ngOnInit() {
this.loginForm = this.fb.group({
username: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
password: ['', Validators.compose([Validators.required, Validators.minLength(3)])]
});
}


login(){
  this.appService.authenticate(this.credentials, ()=>{
    console.log('login lekbira') ; 
    this.router.navigateByUrl('/dashboard');
  });
  /*this.router.navigateByUrl('/home') ;*/
}


}
