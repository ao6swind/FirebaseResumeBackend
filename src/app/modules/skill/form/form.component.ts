import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd';
import { LanguageService } from './../../../services/language.service';
import { Skill } from './../../../models/skill.model';
import { message } from './../../../variables/message';

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
  public skill: Skill = new Skill();
  public $key: string = '';
  public observer: Observable<Skill>;

  public language = 'zh-TW';
  public target = 'skill';

  public marks: any = {
    0: '0%',
    20: '20%',
    40: '40%',
    60: '60%',
    80: '80%',
    100: '100%'
  };

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

        this.observer = this.fb.object<Skill>(`${this.language}/${this.target}/${params.id}`).valueChanges();
        this.observer.subscribe(item => 
        {
          this.skill = (item as Skill);
        });
      });
    }
  }

  // Angular 物件生命週期: OnInit
  ngOnInit() 
  {
    this.form = this.builder.group({
      catelog:    [ null, [ Validators.required ] ],
      name:       [ null, [ Validators.required ] ],
      percentage: [ null, [ Validators.required ] ]
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
      if(this.isCreateMode)
      {
        this.fb.list(`${this.language}/${this.target}`).push(this.skill).then(res => {
          this.message.success(message[this.language].success.create);
        });
      }
      else
      {
        this.fb.object(`${this.language}/${this.target}/${this.$key}`).update(this.skill).then(res => {
          this.message.success(message[this.language].success.update);
        });
      }

      this.router.navigate([`/${this.target}`]);
    }
  }
}