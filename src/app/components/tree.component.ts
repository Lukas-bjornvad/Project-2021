import {FlatTreeControl} from '@angular/cdk/tree';
import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { AppRoutingModule } from "../app-routing.module";
import { Data, gottenData, FlatNode, TreeNode } from "../data/data";
import { DataService } from '../data/data.service';


@Component({
  selector: 'tree-struc',
  templateUrl: 'tree.component.html',
  styleUrls: ['tree.component.css'],
})
export class TreeFlat implements OnInit{
  private _transformer = (node: TreeNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }
  TREE_DATA:TreeNode[] = [{name: 'Fantasy'}];
  out:any;
  constructor(private apiService:DataService) { }
  ngOnInit() {    
    //this.TREE_DATA = dat.treeDat
    let dataset:gottenData;
    this.apiService.getFilms().subscribe((data)=>{
      dataset = <gottenData> data;
      this.TREE_DATA = dataset.data; 
      this.dataSource.data = this.TREE_DATA;
      console.log(this.TREE_DATA);
    });}

  
  activenode :TreeNode = {name:"",  comments:[]}

  treeControl = new FlatTreeControl<FlatNode>(
      node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
      this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: FlatNode) => node.expandable;

  click(node:TreeNode):void{ 
   this.getnode(node.name);
   console.log(this.activenode);
  }

  getnode(name:string){
    this.TREE_DATA.forEach(element => {
      element.children?.forEach(element2=>{element2.children?.forEach (element3=> {
        if(element3.name==name)this.activenode=element3;});
      });     
    });
  }

  updatenode(newnode:TreeNode){
    this.TREE_DATA.forEach(element => {
      element.children?.forEach(element2=>{element2.children?.forEach (element3=> {
        if(element3.name==newnode.name)element3=newnode;});
      });     
    });
    this.apiService.updateComments(this.TREE_DATA);
  }

  
}
