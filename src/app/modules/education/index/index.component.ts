import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { NzMessageService } from 'ng-zorro-antd';
import { Education } from '../../../models/education.model';
import { message } from './../../../variables/message';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less']
})

export class IndexComponent implements OnInit 
{
  private isLoading: boolean = false;
  private educations: AngularFireList<Education>;
  private dataSet = [];

  private language = 'zh_TW';
  private target = 'education';

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
    this.educations = this.fb.list(`${this.language}/${this.target}`);
    this.educations.snapshotChanges().subscribe(list => {
      this.dataSet = list.map(item => {
        return {
          $key: item.key,
          education: item.payload.val()
        }
      });
      this.isLoading = false;
    });
  }

  delete($key: string): void
  {
    this.educations.remove($key);
    this.message.success(message[this.language].success.delete);
  }
}
