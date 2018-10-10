import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { formatDate } from '@angular/common';
import { Observable } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd';
import { LanguageService } from './../../../services/language.service';
import { message } from './../../../variables/message';
import { Experience } from './../../../models/experience.model';

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
  public experience: Experience = new Experience();
  public $key: string = '';
  public observer: Observable<Experience>;

  public language = 'zh-TW';
  public target = 'experience';

  // 建構子
  constructor
  (
    public route: ActivatedRoute,
    public router: Router,
    public builder: FormBuilder, 
    public fb: AngularFireDatabase,
    public message: NzMessageService,
    public langService: LanguageService,
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

        this.observer = this.fb.object<Experience>(`${this.language}/${this.target}/${params.id}`).valueChanges();
        this.observer.subscribe(item => 
        {
          this.experience = (item as Experience);
        });
      });
    }
  }

  // Angular 物件生命週期: OnInit
  ngOnInit() 
  {
    this.form = this.builder.group({
      company:      [ null, [ Validators.required ] ],
      department:   [ null, [ Validators.required ] ],
      title:        [ null, [ Validators.required ] ],
      url:          [ null, [ Validators.required ] ],
      start:        [ null, [ Validators.required ] ],
      end:          [ null ],
      description:  [ null ]
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
      this.experience.start = (this.experience.start != null) ? formatDate(this.experience.start, 'yyyy-MM', this.language) : null;
      this.experience.end = (this.experience.end != null) ? formatDate(this.experience.end, 'yyyy-MM', this.language) : null;

      if(this.isCreateMode)
      {
        this.fb.list(`${this.language}/${this.target}`).push(this.experience).then(res => {
          this.message.success(message[this.language].success.create);
        });
      }
      else
      {
        this.fb.object(`${this.language}/${this.target}/${this.$key}`).update(this.experience).then(res => {
          this.message.success(message[this.language].success.update);
        });
      }

      this.router.navigate([`/${this.target}`]);
    }
  }
}