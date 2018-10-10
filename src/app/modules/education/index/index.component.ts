import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { NzMessageService } from 'ng-zorro-antd';
import { LanguageService } from './../../../services/language.service';
import { message } from './../../../variables/message';
import { Education } from '../../../models/education.model';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less']
})

export class IndexComponent implements OnInit 
{
  public isLoading: boolean = false;
  public educations: AngularFireList<Education>;
  public dataSet = [];

  public language = 'zh-TW';
  public target = 'education';

  constructor
  (
    public fb: AngularFireDatabase,
    public message: NzMessageService,
    public langService: LanguageService
  ) 
  { 
    this.language = this.langService.getLanguage();
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
