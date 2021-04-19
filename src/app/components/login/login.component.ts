import { Component, OnInit, Output } from '@angular/core';
import { User, gottenData } from "../../data/data";
import { DataService } from '../../data/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
 
  username ="";
  password ="";
  regpassword ="";
  passwordCheck="";
  changeText="Want to register an account?"
  whichpage = false;
  loggedIn=false;
  message="";
  users:User[]=[];
  constructor(private apiService:DataService) { }
  ngOnInit(): void {
    let chez:gottenData;
    let localValue = localStorage.getItem("loggedIn");
    if(localValue){
    this.loggedIn = JSON.parse(localValue)
    }
    this.apiService.getUsers().subscribe((data)=>{
      chez = <gottenData> data;
      this.users = chez.data;  
      console.log(chez)
    });
    
  }
  
  onSubmit(){
    let check = false;
    this.users.forEach(element => {
      if((element.username==this.username)&&(element.password==this.password)){
        check=true
      }
    });
    if(check){
      console.log("logged in")
      this.loggedIn = true;
      localStorage.setItem("loggedIn", JSON.stringify(this.loggedIn))
    }
  }

  ToggleLogin(){
    document.getElementById("login")?.toggleAttribute("hidden")
    document.getElementById("register")?.toggleAttribute("hidden")
    this.whichpage=!this.whichpage
    console.log(this.whichpage)
    if(this.whichpage){
      this.changeText = "Want to login?"
    }else{
      this.changeText="Want to register an account?"
    }
  }

  onRegister(newUser:User){
    let check = false;
    document.getElementById("password")
    this.users.forEach(element => {
      if((element.username==this.username)){
        check=true
      }
    });
    if(check){
      this.message = "user already exists"
    }else if(this.regpassword == this.passwordCheck){
      this.users.push(newUser)
      console.log(this.users)
      this.apiService.updateUsers(this.users)
    }else{
      this.message = "Passwords dont match"
    }
    }

    logOut(){
      localStorage.setItem("loggedIn", "false")
      window.location.reload();
    }
}
