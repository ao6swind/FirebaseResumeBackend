import { Milestone } from './../../../models/milestone.model';
import { ScreenImage } from './../../../models/screen.model';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Project } from '../../../models/project.model';
import { Keyword } from './../../../models/keyword.model';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.less']
})
export class CreateComponent implements OnInit {

  //
  private formProject: FormGroup;
  private project: Project = new Project();
  private fb_projects: AngularFireList<Project>;
  private db_projects: AngularFirestoreCollection<Project>;

  private counter_keyword: number = 0;
  private counter_screen: number = 0;
  private counter_milestone: number = 0;
  
  constructor(
    private router: Router,
    private builder: FormBuilder, 
    private db: AngularFirestore,
    private fb: AngularFireDatabase
  ) { }

  ngOnInit() {
    this.fb_projects = this.fb.list('zh_TW_projects');
    this.db_projects = this.db.collection<Project>('zh_TW_projects');
    this.formProject = this.builder.group({
      title:        [ null, [ Validators.required ] ],
      type:         [ null, [ Validators.required ] ],
      is_public:    [ null, [ Validators.required ] ],
      url:          [ null, [ Validators.required ] ],
      description:  [ null ],
      keywords:     [ null ]
    });
  }

  submit()
  {
    for (const i in this.formProject.controls) 
    {
      this.formProject.controls[ i ].markAsDirty();
      this.formProject.controls[ i ].updateValueAndValidity();
    }
  }

  addColumn(name: string): void 
  {
    let column;
    switch(name)
    {
      case 'keyword':
        this.counter_keyword++;
        column = new Keyword();
        column.instance = `${name}#${this.counter_keyword}`;
        this.project.keywords.push(column);
        break;
      case 'screen':
        this.counter_screen++;
        column = new ScreenImage();
        column.instance = `${name}#${this.counter_screen}`;
        this.project.screens.push(column);
        break;
      case 'milestone':
        this.counter_milestone++;
        column = new Milestone();
        column.instance = `${name}#${this.counter_milestone}`;
        this.project.milestones.push(column);
        break;
    }
    
    this.formProject.addControl(column.instance, new FormControl(null, Validators.required));
  }

  removeColumn(name:string, index: number): void
  {
    let column;
    switch(name)
    {
      case 'keyword':
        column = this.project.keywords[index];
        this.project.keywords.splice(index, 1);
        break;
      case 'screen':
        column = this.project.screens[index];
        this.project.screens.splice(index, 1);
        break;
      case 'milestone':
        column = this.project.milestones[index];
        this.project.milestones.splice(index, 1);
        break;
    }
    this.formProject.removeControl(column.instance);
  }
}
