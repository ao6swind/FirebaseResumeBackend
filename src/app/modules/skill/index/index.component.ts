import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { NzMessageService } from 'ng-zorro-antd';
import { message } from './../../../variables/message';
import { Skill } from '../../../models/skill.model';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less']
})

export class IndexComponent implements OnInit 
{
  private isLoading: boolean = false;
  private skills: AngularFireList<Skill>;
  private dataSet = [];

  private language = 'zh-TW';
  private target = 'skill';

  constructor
  (
    private fb: AngularFireDatabase,
    private message: NzMessageService
  ) 
  { 
  
  }
  
  ngOnInit() 
  {
    this.isLoading =  true;
    this.skills = this.fb.list(`${this.language}/${this.target}`);
    this.skills.snapshotChanges().subscribe(list => {
      this.dataSet = list.map(item => {
        return {
          $key: item.key,
          skill: item.payload.val()
        }
      });
      this.isLoading = false;
    });
  }

  delete($key: string): void
  {
    this.skills.remove($key);
    this.message.success(message[this.language].success.delete);
  }
}
