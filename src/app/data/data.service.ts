
import { Injectable } from '@angular/core';  
import {HttpClient, HttpHeaders} from '@angular/common/http';  

import {User, gottenData, TreeNode} from "./data"

@Injectable({
    providedIn: 'root'
})
export class DataService {
  dataUrl = 'http://localhost:5000/api/data';  // URL to web api
  datapusher:gottenData={type:"", data:[]};
  constructor(public httpClient : HttpClient) {   
  }  
getFilms(){  
  return this.httpClient.get(this.dataUrl+"/film");
} 
getUsers(){  
    return this.httpClient.get(this.dataUrl+"/users");
  } 

  updateUsers(data:User[]){ 
    this.datapusher.data=data
    this.datapusher.type="users"
    console.log(this.datapusher)
    return this.httpClient.post(this.dataUrl+"/users",this.datapusher)
  } 
  updateComments(data:TreeNode[]){ 
    this.datapusher.data=data
    this.datapusher.type="film"
    console.log(this.datapusher)
    return this.httpClient.post(this.dataUrl+"/film",this.datapusher)
  } 
}
