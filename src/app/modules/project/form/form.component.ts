import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Project } from '../../../models/project.model';
import { UploadedFile } from '../../../models/file.model';
import { NzMessageService } from 'ng-zorro-antd';
import { message } from './../../../variables/message';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.less']
})

export class FormComponent implements OnInit 
{
  //
  private is_create_mode: boolean = true;
  private formGroup: FormGroup;
  private $key: string = '';
  private project: Project = new Project();
  private observer: Observable<Project>;
  private files: Array<UploadedFile> = new Array<UploadedFile>();
  
  private language = 'zh_TW';
  private target = 'project';

  constructor
  (
    private route: ActivatedRoute,
    private router: Router,
    private builder: FormBuilder, 
    private fb: AngularFireDatabase,
    private message: NzMessageService
  ) 
  { 
    
  }

  ngOnInit() 
  {
    this.formGroup = this.builder.group({
      title:        [ null, [ Validators.required ] ],
      type:         [ null, [ Validators.required ] ],
      is_public:    [ null, [ Validators.required ] ],
      url:          [ null, [ Validators.required ] ],
      description:  [ null ],
      keywords:     this.builder.array([], [ Validators.required ]),
      milestones:   this.builder.array([], [ Validators.required ]),
      screens:      this.builder.array([], [ Validators.required ])
    });
    
    if(this.route.routeConfig.path != "create")
    {
      this.is_create_mode = false;
      this.route.params.subscribe(params => 
      {
        this.$key = params.id;
        this.observer = this.fb.object<Project>(`${this.language}/${this.target}/${params.id}`).valueChanges();
        this.observer.subscribe(item => 
        {
          this.project = (item as Project);
          
          // 因為firebase在儲存的時候如果沒有child就會直接砍掉該屬性，所以檢查看看要不要建立回來
          this.project['keywords']    = ((typeof this.project['keywords']) != 'undefined') ? this.project['keywords'] : [];
          this.project['milestones']  = ((typeof this.project['milestones']) != 'undefined') ? this.project['milestones'] : [];
          this.project['screens']     = ((typeof this.project['screens']) != 'undefined') ? this.project['screens'] : [];

          for(let i = 0; i <= this.project.keywords.length - 1; i++)
          {
            (this.formGroup.get('keywords') as FormArray).push(this.builder.group({
              content: [ null, [ Validators.required ] ]
            }));
          }

          for(let i = 0; i <= this.project.milestones.length - 1; i++)
          {
            (this.formGroup.get('milestones') as FormArray).push(this.builder.group({
              datetime:     [ null, [ Validators.required ] ],
              description:  [ null, [ Validators.required ] ]
            }));
          }

          for(let i = 0; i <= this.project.screens.length - 1; i++)
          {
            const file = new UploadedFile();
            file.content = this.project.screens[i].url;
            this.files.push(file);

            (this.formGroup.get('screens') as FormArray).push(this.builder.group({
              title:        [ null, [ Validators.required ] ],
              url:          [ null ],
              description:  [ null ]
            }));
          }
        });
      });
    }
  }

  submit()
  {
    // 這一段應該可以寫遞迴，這樣就可以驗證更深層的FormArray了
    for (const i in this.formGroup.controls) 
    {
      if (this.formGroup.controls[i].hasOwnProperty('controls')) 
      {
        const formArray = <any>this.formGroup.controls[i];
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
        this.formGroup.controls[i].markAsDirty();
        this.formGroup.controls[i].updateValueAndValidity();
      }
    }
    
    if(this.formGroup.valid)
    {
      if(this.is_create_mode)
      {
        const key =  this.fb.list(`${this.language}/${this.target}`).push(this.project).key;
        const storage = firebase.storage().ref()
          .child(this.language)
          .child(this.target)
          .child(key);

        for (let index = 0; index <= this.files.length - 1; index++)
        {
          const prefix = + new Date() + "-" + index.toString().padStart(2, "0") ;
          const filename = `${prefix}-${this.files[index].file.name}`;
          const task = storage
            .child(filename)
            .put(this.files[index].file)
            .then(res => 
            {
              storage.child(filename).getDownloadURL().then(url => 
              {
                this.project.screens[index].url = url;
                this.fb.object(`${this.language}/${this.target}/${key}`).update(this.project);
              });
            });
        }
        this.message.success(message[this.language].success.create);
      }
      else
      {
        const storage = firebase.storage().ref()
          .child(this.language)
          .child(this.target)
          .child(this.$key);

        for(let index = 0; index <= this.files.length - 1; index++)
        {
          // 如果有上傳東西就繼續做
          if(this.files[index].file != null)
          {
            // 如果之前有檔案，就先刪掉
            if(this.project.screens[index].url != '')
            {
              firebase.storage().refFromURL(this.project.screens[index].url).delete();
            }
            const prefix = + new Date() + "-" + index.toString().padStart(2, "0") ;
            const filename = `${prefix}-${this.files[index].file.name}`;
            const task = storage
              .child(filename)
              .put(this.files[index].file)
              .then(res => 
              {
                storage.child(filename).getDownloadURL().then(url => 
                {
                  this.project.screens[index].url = url;
                  this.fb.object<Project>(`${this.language}/${this.target}/${this.$key}`).update(this.project);
                });
              });
          }
        }
        this.fb.object<Project>(`${this.language}/${this.target}/${this.$key}}`).update(this.project);
        this.message.success(message[this.language].success.update);
      }
      
      this.router.navigate([`/${this.target}`]);
    }
  }
}
