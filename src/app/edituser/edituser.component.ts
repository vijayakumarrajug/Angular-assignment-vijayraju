import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../user';
import { UserService } from '../user.service';
import { ApiService } from '../api.service';
import { ApiUrlsService } from '../api-urls.service';
import { RouterModule, Routes, Router } from '@angular/router';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {
	newuserslist: any =[];
	errors: any ='';
	userId: any = '';
  constructor(
  	private userService: UserService,
	private apiService: ApiService,
	private apiurlsService: ApiUrlsService,
	private router: Router
  ) { }

  ngOnInit() {
  	this.newuserslist = JSON.parse(localStorage.getItem('updatedUsers'));

  	console.log(this.newuserslist);
  }

  updateData(val){
  		this.userId = val;
	    const Params = {
  			"id":this.userId
         }
	    this.apiurlsService.edit(Params)
	      .subscribe(
	        data => {
	          	alert('User Updated');   
	          	this.router.navigateByUrl("/");      
	        },
	        err => {
		        alert('Couldnt Update');
	          	this.errors = err;
	        }
	    );  	
  }

}
