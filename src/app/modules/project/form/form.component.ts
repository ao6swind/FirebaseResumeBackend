import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { NzMessageService } from 'ng-zorro-antd';
import { LanguageService } from './../../../services/language.service';
import { message } from './../../../variables/message';
import { Project } from '../../../models/project.model';
import { Uploaded } from '../../../models/uploaded.model';
import { ScreenImage } from './../../../models/screen.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.less']
})

export class FormComponent implements OnInit 
{
  //
  public isCreateMode: boolean = true;
  public isLoading: boolean = false;
  public form: FormGroup;
  public $key: string = '';
  public project: Project = new Project();
  public observer: Observable<Project>;
  public uploaded_list: Array<Uploaded> = new Array<Uploaded>();

  public language = 'zh-TW';
  public target = 'project';

  constructor
  (
    public route: ActivatedRoute,
    public router: Router,
    public builder: FormBuilder, 
    public fb: AngularFireDatabase,
    public message: NzMessageService,
    public langService: LanguageService
  ) 
  { 
    this.language = this.langService.getLanguage();
  }

  ngOnInit() 
  {
    this.form = this.builder.group({
      title:        [ null, [ Validators.required ] ],
      type:         [ null, [ Validators.required ] ],
      is_public:    [ null ],
      url:          [ null ],
      description:  [ null ],
      keywords:     this.builder.array([], [ Validators.required ]),
      milestones:   this.builder.array([], [ Validators.required ]),
      screens:      this.builder.array([], [ Validators.required ])
    });
    
    if(this.route.routeConfig.path != "create")
    {
      this.isLoading = true;
      this.isCreateMode = false;
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
            (this.form.get('keywords') as FormArray).push(this.builder.group({
              content: [ null, [ Validators.required ] ]
            }));
          }

          for(let i = 0; i <= this.project.milestones.length - 1; i++)
          {
            (this.form.get('milestones') as FormArray).push(this.builder.group({
              datetime:     [ null, [ Validators.required ] ],
              description:  [ null, [ Validators.required ] ]
            }));
          }

          for(let i = 0; i <= this.project.screens.length - 1; i++)
          {
            const uploaded = new Uploaded();
            uploaded.content = this.project.screens[i].url;
            this.uploaded_list.push(uploaded);

            (this.form.get('screens') as FormArray).push(this.builder.group({
              title:        [ null, [ Validators.required ] ],
              url:          [ null ],
              description:  [ null ]
            }));
          }
          this.isLoading = false;
        });
      });
    }
  }

  submit()
  {
    // 這一段應該可以寫遞迴，這樣就可以驗證更深層的FormArray了
    for (const i in this.form.controls) 
    {
      if (this.form.controls[i].hasOwnProperty('controls')) 
      {
        const formArray = <any>this.form.controls[i];
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
        this.form.controls[i].markAsDirty();
        this.form.controls[i].updateValueAndValidity();
      }
    }
    
    if(this.form.valid)
    {
      if(this.isCreateMode)
      {
        const key =  this.fb.list(`${this.language}/${this.target}`).push(this.project).key;
        const storage = firebase.storage().ref()
          .child(this.language)
          .child(this.target)
          .child(key);

        for (let index = 0; index <= this.uploaded_list.length - 1; index++)
        {
          const prefix = + new Date() + "-" + index.toString().padStart(2, "0") ;
          const filename = `${prefix}-${this.uploaded_list[index].file.name}`;
          const task = storage
            .child(filename)
            .put(this.uploaded_list[index].file)
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

        for(let index = 0; index <= this.uploaded_list.length - 1; index++)
        {
          // 如果有上傳東西就繼續做
          if(this.uploaded_list[index].file != null)
          {
            // 如果之前有檔案，就先刪掉
            if(this.project.screens[index].url != null)
            {
              firebase.storage().refFromURL(this.project.screens[index].url).delete();
            }
            const prefix = + new Date() + "-" + index.toString().padStart(2, "0") ;
            const filename = `${prefix}-${this.uploaded_list[index].file.name}`;
            const task = storage
              .child(filename)
              .put(this.uploaded_list[index].file)
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
        this.fb.object<Project>(`${this.language}/${this.target}/${this.$key}`).update(this.project);
        this.message.success(message[this.language].success.update);
      }
      
      this.router.navigate([`/${this.target}`]);
    }
  }

  removeScreen(index: number)
  {
    this.fb.object<Project>(`${this.language}/${this.target}/${this.$key}`).update(this.project);
  }
}
