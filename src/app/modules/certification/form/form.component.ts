import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { formatDate } from '@angular/common';
import { Observable } from 'rxjs';
// Firebase
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
// 服務
import { NzMessageService } from 'ng-zorro-antd';
import { LanguageService } from './../../../services/language.service';
// 常用變數
import { message } from './../../../variables/message';
// model
import { Uploaded } from '../../../models/uploaded.model';
import { Certification } from './../../../models/certification.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.less']
})
export class FormComponent implements OnInit 
{
  public isCreateMode: boolean = true;
  public isLoading: boolean = false;
  public form: FormGroup;
  public $key: string = '';
  public certification: Certification = new Certification();
  public observer: Observable<Certification>;
  public uploaded: Uploaded = new Uploaded();

  public language = 'zh-TW';
  public target = 'certification';

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
      name:       [ null, [ Validators.required ] ],
      from:       [ null, [ Validators.required ] ],
      expired:    [ null ]
    });

    if(this.route.routeConfig.path != "create")
    {
      this.form.addControl('url', new FormControl());
      this.isLoading = true;
      this.isCreateMode = false;
      this.route.params.subscribe(params => 
      {
        this.$key = params.id;
        this.observer = this.fb.object<Certification>(`${this.language}/${this.target}/${params.id}`).valueChanges();
        this.observer.subscribe(item => 
        {
          this.certification = (item as Certification);
          this.uploaded.content = this.certification.url;
          this.isLoading = false;
        });
      });
    }
    else
    {
      this.form.addControl('url', new FormControl(null, [ Validators.required ]));
    }
  }

  submit()
  {
    for (const i in this.form.controls) 
    {
      this.form.controls[i].markAsDirty();
      this.form.controls[i].updateValueAndValidity();
    }
    
    if(this.form.valid)
    {
      this.certification.expired = (this.certification.expired != null) ? formatDate(this.certification.expired, 'yyyy-MM-dd', this.language) : null;

      if(this.isCreateMode)
      {
        const key = this.fb.list(`${this.language}/${this.target}`).push(this.certification).key;
        const storage = firebase.storage().ref()
          .child(this.language)
          .child(this.target)
          .child(key);

        const filename = + new Date() + `-${this.uploaded.file.name}`;
        const task = storage
          .child(filename)
          .put(this.uploaded.file)
          .then(res => 
          {
            storage.child(filename).getDownloadURL().then(url => 
            {
              this.certification.url = url;
              this.fb.object(`${this.language}/${this.target}/${key}`).update(this.certification);
            });
          });
        this.message.success(message[this.language].success.create);
      }
      else
      {
        const storage = firebase.storage().ref()
          .child(this.language)
          .child(this.target)
          .child(this.$key);

        // 如果有上傳東西就繼續做
        if(this.uploaded.file != null)
        {
          // 如果之前有檔案，就先刪掉
          if(this.certification.url != '')
          {
            firebase.storage().refFromURL(this.certification.url).delete();
          }

          const filename = + new Date() + `-${this.uploaded.file.name}`;
          const task = storage
            .child(filename)
            .put(this.uploaded.file)
            .then(res => 
            {
              storage.child(filename).getDownloadURL().then(url => 
              {
                this.certification.url = url;
                this.fb.object<Certification>(`${this.language}/${this.target}/${this.$key}`).update(this.certification);
              });
            });
        }
        this.fb.object<Certification>(`${this.language}/${this.target}/${this.$key}`).update(this.certification);
        this.message.success(message[this.language].success.update);
      }
      this.router.navigate([`/${this.target}`]);
    }
  }

  readURL(event: any): void 
  {
    if (event.target.files && event.target.files[0] && event.target.value.length != 0) 
    {
      this.uploaded.file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.uploaded.content = reader.result.toString();
      reader.readAsDataURL(event.target.files[0]);
    }
    else
    {
      this.uploaded.file = null;
      this.uploaded.content = null;
    }
  }
}
