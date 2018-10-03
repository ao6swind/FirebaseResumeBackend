import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Project } from '../../../models/project.model';
import { UploadedFile } from '../../../models/file.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.less']
})
export class CreateComponent implements OnInit {
  
  //
  private mode: boolean = true;
  private formProject: FormGroup;
  private project: Project = new Project();
  private project_observe: Observable<Project>;
  private files: Array<UploadedFile> = new Array<UploadedFile>();
  private fb_projects: AngularFireList<Project>;
  private db_projects: AngularFirestoreCollection<Project>;
  
  constructor
  (
    private route: ActivatedRoute,
    private router: Router,
    private builder: FormBuilder, 
    private db: AngularFirestore,
    private fb: AngularFireDatabase
  ) 
  { 
    this.formProject = this.builder.group({
      title:        [ null, [ Validators.required ] ],
      type:         [ null, [ Validators.required ] ],
      is_public:    [ null, [ Validators.required ] ],
      url:          [ null, [ Validators.required ] ],
      description:  [ null ],
      keywords:     this.builder.array([]),
      milestones:   this.builder.array([]),
      screens:      this.builder.array([])
    });

    if(this.route.routeConfig.path != "create")
    {
      this.mode = false;
      this.route.params.subscribe(params => 
      {
        this.project_observe = this.fb.object<Project>(`zh_TW_projects/${params.id}`).valueChanges();
        this.project_observe.subscribe(item => 
        {
          this.project = (item as Project);
          for(let i = 0; i <= this.project.screens.length - 1; i++)
          {
            const file = new UploadedFile();
            file.content = this.project.screens[i].url;
            this.files.push(file);
          }
        });
      });
    }
  }

  ngOnInit() 
  {
    this.fb_projects = this.fb.list('zh_TW_projects');
    this.db_projects = this.db.collection<Project>('zh_TW_projects');
  }

  submit()
  {
    for (const i in this.formProject.controls) 
    {
      if (this.formProject.controls[i].hasOwnProperty('controls')) 
      {
        const formArray = <any>this.formProject.controls[i];
        for (const j in formArray.controls) 
        {
          const formControl = <any>formArray.controls[j]
          for(const k in formControl.controls)
          { 
            formControl.controls[k].markAsDirty();
            formControl.controls[k].updateValueAndValidity();
          }
        }
      }
      else
      {
        this.formProject.controls[i].markAsDirty();
        this.formProject.controls[i].updateValueAndValidity();
      }
    }
    
    if(this.formProject.valid)
    {
      const key = this.fb_projects.push(this.project).key;
      const storageRef = firebase.storage().ref().child('zh_TW_projects').child(key);

      for (let index = 0; index <= this.files.length - 1; index++)
      {
        const prefix = + new Date() + "-" + index.toString().padStart(2, "0") ;
        const filename = `${prefix}-${this.files[index].file.name}`;
        const task = storageRef
          .child(filename)
          .put(this.files[index].file)
          .then(res => 
          {
            storageRef.child(filename).getDownloadURL().then(url => 
            {
              this.project.screens[index].url = url;
              this.fb.object(`zh_TW_projects/${key}`).update(this.project);
            });
          });
      }
      
      this.router.navigate(['/project']);
    }
  }
}
