import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { Observable } from 'rxjs';
// FireBase
import { AngularFireDatabase } from 'angularfire2/database';
// 服務
import { NzMessageService } from 'ng-zorro-antd';
import { LanguageService } from './../../../services/language.service';
// 常用變數
import { message } from './../../../variables/message';
// model
import { Education } from './../../../models/education.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.less']
})

export class FormComponent implements OnInit 
{
  // 屬性
  public isCreateMode: boolean = true;
  public form: FormGroup;
  public education: Education = new Education();
  public $key: string = '';
  public observer: Observable<Education>;

  public language = 'zh-TW';
  public target = 'education';

  // 建構子
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
    if(this.route.routeConfig.path != "create")
    {
      this.isCreateMode = false;
      this.route.params.subscribe(params => 
      {
        this.$key = params.id;
        this.fb.object(`${this.language}/${this.target}/${params.id}`);

        this.observer = this.fb.object<Education>(`${this.language}/${this.target}/${params.id}`).valueChanges();
        this.observer.subscribe(item => 
        {
          this.education = (item as Education);
        });
      });
    }
  }

  // Angular 物件生命週期: OnInit
  ngOnInit() 
  {
    this.form = this.builder.group({
      level:      [ null, [ Validators.required ] ],
      school:     [ null, [ Validators.required ] ],
      department: [ null, [ Validators.required ] ],
      major:      [ null, [ Validators.required ] ],
      start:      [ null, [ Validators.required ] ],
      end:        [ null ]
    });

    if(this.route.routeConfig.path != "create")
    {
      this.isCreateMode = false;
    }
  }

  submit(): void 
  {
    for (const i in this.form.controls) 
    {
      this.form.controls[ i ].markAsDirty();
      this.form.controls[ i ].updateValueAndValidity();
    }

    if(this.form.valid)
    {
      this.education.start = (this.education.start != null) ? formatDate(this.education.start, 'yyyy-MM', this.language) : null;
      this.education.end = (this.education.end != null) ?  formatDate(this.education.end, 'yyyy-MM', this.language) : null;
      
      if(this.isCreateMode)
      {
        this.fb.list(`${this.language}/${this.target}`).push(this.education).then(res => {
          this.message.success(message[this.language].success.create);
        });
      }
      else
      {
        this.fb.object(`${this.language}/${this.target}/${this.$key}`).update(this.education).then(res => {
          this.message.success(message[this.language].success.update);
        });
      }

      this.router.navigate([`/${this.target}`]);
    }
  }
}