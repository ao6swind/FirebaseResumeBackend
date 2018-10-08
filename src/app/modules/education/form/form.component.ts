import { Observable } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd';
import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Education } from './../../../models/education.model';
import { AngularFireDatabase } from 'angularfire2/database';
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
  private education: Education = new Education();
  private $key: string = '';
  private observer: Observable<Education>;

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
        this.fb.object(`zh_TW_educations/${params.id}`);

        this.observer = this.fb.object<Education>(`zh_TW_educations/${params.id}`).valueChanges();
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
    this.formGroup = this.builder.group({
      level:      [ null, [ Validators.required ] ],
      school:     [ null, [ Validators.required ] ],
      department: [ null, [ Validators.required ] ],
      major:      [ null, [ Validators.required ] ],
      start:      [ null, [ Validators.required ] ],
      end:        [ null ]
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
      this.education.start = formatDate(this.education.start, 'yyyy-MM', 'zh-TW');
      this.education.end = formatDate(this.education.end, 'yyyy-MM', 'zh-TW');
      
      if(this.is_create_mode)
      {
        this.fb.list('zh_TW_educations').push(this.education).then(res => {
          this.message.success(message['zh_TW'].success.create);
        });
      }
      else
      {
        this.fb.object(`zh_TW_educations/${this.$key}`).update(this.education).then(res => {
          this.message.success(message['zh_TW'].success.update);
        });
      }

      this.router.navigate(['/education']);
    }
  }
}