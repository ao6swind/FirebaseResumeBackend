import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd';
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
  private is_create_mode: boolean = true;
  private formGroup: FormGroup;
  private skill: Skill = new Skill();
  private $key: string = '';
  private observer: Observable<Skill>;

  private language = 'zh_TW';
  private target = 'skill';

  private marks: any = {
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
    private route: ActivatedRoute,
    private router: Router,
    private builder: FormBuilder, 
    private fb: AngularFireDatabase,
    private message: NzMessageService
  ) 
  { 
    if(this.route.routeConfig.path != "create")
    {
      this.is_create_mode = false;
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
    this.formGroup = this.builder.group({
      catelog:    [ null, [ Validators.required ] ],
      name:       [ null, [ Validators.required ] ],
      percentage: [ null, [ Validators.required ] ]
    });

    if(this.route.routeConfig.path != "create")
    {
      this.is_create_mode = false;
    }
  }

  submit(): void 
  {
    for (const i in this.formGroup.controls) 
    {
      this.formGroup.controls[ i ].markAsDirty();
      this.formGroup.controls[ i ].updateValueAndValidity();
    }

    if(this.formGroup.valid)
    {
      if(this.is_create_mode)
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