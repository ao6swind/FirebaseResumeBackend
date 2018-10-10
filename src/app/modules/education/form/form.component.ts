import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd';
import { formatDate } from '@angular/common';
import { Education } from './../../../models/education.model';
import { message } from './../../../variables/message';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.less']
})

export class FormComponent implements OnInit 
{
  // 屬性
  private isCreateMode: boolean = true;
  private form: FormGroup;
  private education: Education = new Education();
  private $key: string = '';
  private observer: Observable<Education>;

  private language = 'zh-TW';
  private target = 'education';

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