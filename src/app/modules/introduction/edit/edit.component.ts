import { Uploaded } from './../../../models/uploaded.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { Introduction } from './../../../models/introduction.model';

import * as firebase from 'firebase';
import { Router, ActivatedRoute } from '@angular/router';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd';
import { message } from './../../../variables/message';
import { Link } from '../../../models/link.model';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.less']
})
export class EditComponent implements OnInit 
{
  private form: FormGroup;
  private isLoading: boolean = true;
  private $key: string;
  private introduction: Introduction = new Introduction();
  private dataSet = [];
  private introductions: AngularFireList<Introduction>;

  private uploaded: any = 
  {
    photo: new Uploaded(),
    resume: new Uploaded()
  };

  private language = 'zh-TW';
  private target = 'introduction';

  constructor
  (
    private route: ActivatedRoute,
    private router: Router,
    private builder: FormBuilder, 
    private fb: AngularFireDatabase,
    private message: NzMessageService
  ) 
  { 
    
    this.introductions = this.fb.list(`${this.language}/${this.target}`);
    this.introductions.snapshotChanges().subscribe(list => {
      this.dataSet = list.map(item => {
        return {
          $key: item.key,
          introduction: item.payload.val()
        }
      });

      if(this.dataSet.length > 0)
      {
        this.introduction = this.dataSet[0].introduction;
        this.$key = this.dataSet[0].$key

        // 因為firebase在儲存的時候如果沒有child就會直接砍掉該屬性，所以檢查看看要不要建立回來
        this.introduction['links'] = ((typeof this.introduction['links']) != 'undefined') ? this.introduction['links'] : new Array<Link>();
        
        this.uploaded.photo.content = this.introduction.photo;
        this.uploaded.resume.content = this.introduction.resume;
      }
      this.isLoading = false;
    });
  }

  ngOnInit() 
  {

  }

  addColumn(): void
  {
    this.introduction.links.push(new Link());
  }

  removeColumn(index: number): void
  {
    this.introduction.links.splice(index, 1);
  }

  submit()
  {
    if(this.$key != null)
    {
      this.introductions.update(this.$key, this.introduction)
    }
    else
    {
      this.$key = this.introductions.push(this.introduction).key;
    }
    
    const storage = firebase.storage().ref()
      .child(this.language)
      .child(this.target);

    const ckeck_list = [ "photo", "resume"];

    for(let i = 0; i <= ckeck_list.length - 1; i++)
    {
      const type = ckeck_list[i];
      if(this.uploaded[type].file != null)
      {
        // 如果之前有檔案，就先刪掉
        if(this.introduction[type] != null)
        {
          firebase.storage().refFromURL(this.introduction[type]).delete();
        }
        const filename = `photo-${this.uploaded[type].file.name}`;
        const task = storage
          .child(filename)
          .put(this.uploaded[type].file)
          .then(res => 
          {
            storage.child(filename).getDownloadURL().then(url => 
            {
              this.introduction[type] = url;
              this.fb.object<Introduction>(`${this.language}/${this.target}/${this.$key}`).update(this.introduction);
            });
          });
      }
    }

    this.message.success(message[this.language].success.update);
  }

  readFile(event: any, type: string): void 
  {
    if (event.target.files && event.target.files[0] && event.target.value.length != 0) 
    {
      this.uploaded[type].file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e => {
        this.uploaded[type].content = reader.result.toString()
      });;
      reader.readAsDataURL(event.target.files[0]);
    }
    else
    {
      this.uploaded[type].file = null;
      this.uploaded[type].content = null;
    }
  }
}
