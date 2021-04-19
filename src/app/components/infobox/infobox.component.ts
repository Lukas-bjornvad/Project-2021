import { Component, Input, OnChanges, OnInit, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { TreeNode } from "../../data/data";

@Component({
  selector: 'app-infobox',
  templateUrl: './infobox.component.html',
  styleUrls: ['./infobox.component.css']
})
export class InfoboxComponent implements OnChanges {
  @Input()
  node: TreeNode = {name:""};
  
  @Output()
  newTreedat = new EventEmitter<TreeNode>()
  message="";
  hide=false;
  ngOnInit(): void {
  }

  ngOnChanges(changes:SimpleChanges){
    let change=changes.node.currentValue.name
    
    if(change.length>0 ){
      let prev = changes.node.previousValue.name
      if(prev?.length==0)
      document.getElementById("addcomment")?.toggleAttribute("hidden");
    }
  }
  onSubmit(newComment:string){
  let temp = [newComment]
  let checker = localStorage.getItem("loggedIn")
  if(checker){
    if(JSON.parse(checker)){
    if(!this.node.comments){
    this.node.comments = temp;}
    else{
   this.node.comments?.push(newComment);}
   this.newTreedat.emit(this.node);
    }else{
      this.message="login to be able to comment"
    }}else{
      this.message="login to be able to comment"
    }
  }
  
}
