import { Component, Input, OnInit } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { User } from '../user';
import { UserService } from '../user.service';
import { ApiService } from '../api.service';
import { ApiUrlsService } from '../api-urls.service';
import { RouterModule, Routes, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  	users: User[];
  	searchText: any;
  	usersdata: any = [];
  	errors: any ='';
  	userId: any = '';
  	newuser: any = [];
  	constructor(
  		private userService: UserService,
  		private apiService: ApiService,
  		private apiurlsService: ApiUrlsService,
  		private router: Router
  	) {}

  	ngOnInit() {
  		this.getUsers();
  	}
  	/// list of users
  	getUsers(): void {
   	 	this.userService.getUsers()
        .subscribe(users => this.users = users);
        console.log(this.users);
        this.newuser = JSON.parse(localStorage.getItem('currentUser'));
        if(this.newuser != '' && this.newuser != undefined && this.newuser != null){
        	this.users= this.users.concat(this.newuser);
        	console.log(this.users);
        	localStorage.setItem('updatedUsers', JSON.stringify(this.users));
        }else{
        	localStorage.setItem('updatedUsers', JSON.stringify(this.users));
        }

  	}

  	findAll(){
  		this.apiurlsService.findAll(this.searchText)
	      .subscribe(
	        data => {
	        	alert('Without api call the search result, will not be availble');
	          	this.users = this.users;         
	        },
	        err => {
	        	alert('Error');
	          	this.errors = err;
	        }
	    );
  	}

  	clearVal(){
  		this.searchText = '';
  	}

  	/// edit record
  	editItem(indexVal){
  		this.userId = indexVal;
  		const Params = {
  			"id":this.userId
         }
	    this.apiurlsService.edit(Params)
	      .subscribe(
	        data => {
	        	this.getUsers();
	        	alert("Without api call,it won't work");
	        	///this.router.navigate(['/edituser']);        
	        },
	        err => {
	        	alert('Error');
	          	this.errors = err;
	        }
	    );  		
  	}

  	///delete record
  	deleteItem(indexVal){
  		this.userId = indexVal;
	    const Params = {
  			"id":this.userId
         }
	    this.apiurlsService.delete(Params)
	      .subscribe(
	        data => {
	          	for(let i = 0; i < this.users.length; ++i){
		            if (this.users[i].id === indexVal) {
		                this.users.splice(i,1);
		            }
		        }
	          	alert('User Removed');         
	        },
	        err => {
		        alert('Couldnt Remove');
	          	this.errors = err;
	        }
	    );
  	}

  	ngOnDestroy() {
	    
  	}
}
