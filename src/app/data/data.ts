import { Component, OnInit } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import {DataService} from "./data.service";
  
  export interface gottenData {
    type: string;
    data: any[];
  }


 // const dat = new DataService;
  export class Data{
    treeDat: TreeNode[]=[];
    userDat: User[]=[];
   // out= dat.getFilms;
  }
 
  export interface TreeNode {
    name: string;
    year? : number;
    director?: string;
    rating?: number;
    comments?: string[];
    children?: TreeNode[];
  }
  
  export interface MovieNode {
    title : string;
    year : Number;
    director: string;

  }

   export interface User {
    username: string;
    password: string;
  }

  export interface  FlatNode extends TreeNode{
    expandable: boolean;
    level: number;
  }