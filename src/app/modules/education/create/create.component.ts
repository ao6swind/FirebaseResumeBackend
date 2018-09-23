import { Education } from './../../../models/education.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.less']
})
export class CreateComponent implements OnInit {
  // 屬性
  private status: boolean;
  private message: string;
  private formEducation: FormGroup;
  private education: Education = new Education();
  private fb_educations: AngularFireList<Education>;
  private db_educations: AngularFirestoreCollection<Education>;

  // 建構子
  constructor(
    private router: Router,
    private builder: FormBuilder, 
    private db: AngularFirestore,
    private fb: AngularFireDatabase
  ) { }

  // Angular 物件生命週期: OnInit
  ngOnInit() {
    this.fb_educations = this.fb.list('zh_TW_educations');
    this.db_educations = this.db.collection<Education>('zh_TW_educations');
    this.formEducation = this.builder.group({
      level:      [ null, [ Validators.required ] ],
      school:     [ null, [ Validators.required ] ],
      department: [ null, [ Validators.required ] ],
      major:      [ null, [ Validators.required ] ],
      start:      [ null, [ Validators.required ] ],
      end:        [ null ]
    });
  }

  submit(): void 
  {
    for (const i in this.formEducation.controls) 
    {
      this.formEducation.controls[ i ].markAsDirty();
      this.formEducation.controls[ i ].updateValueAndValidity();
    }

    if(this.formEducation.valid)
    {
      this.education.start = formatDate(this.education.start, 'yyyy-MM', 'zh-TW');
      this.education.end = formatDate(this.education.end, 'yyyy-MM', 'zh-TW');
      
      // 如果是用cloud firestore，add裡面要放json，不能用object
      // 除非找到便捷的方法把object轉成json，不然沒辦法直接放this.education
      this.db_educations.add({
        level:      this.education.level,
        school:     this.education.school,
        department: this.education.department,
        major:      this.education.major,
        start:      this.education.start,
        end:        this.education.end
      });
      
      this.fb_educations.push(this.education).then(item => {
        this.router.navigate(['/education']);
      });
    }
  }
}
