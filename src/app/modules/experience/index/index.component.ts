import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { NzMessageService } from 'ng-zorro-antd';
import { LanguageService } from './../../../services/language.service';
import { message } from './../../../variables/message';
import { Experience } from '../../../models/experience.model';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less']
})

export class IndexComponent implements OnInit 
{
  public isLoading: boolean = false;
  public experiences: AngularFireList<Experience>;
  public dataSet = [];

  public language = 'zh-TW';
  public target = 'experience';

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
    this.experiences = this.fb.list(`${this.language}/${this.target}`);
    this.experiences.snapshotChanges().subscribe(list => {
      this.dataSet = list.map(item => {
        return {
          $key: item.key,
          experience: item.payload.val()
        }
      });
      this.isLoading = false;
    });
  }

  delete($key: string): void
  {
    this.experiences.remove($key);
    this.message.success(message[this.language].success.delete);
  }
}
