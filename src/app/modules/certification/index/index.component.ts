
import { Component, OnInit } from '@angular/core';
// Firebase
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase';
// 服務
import { NzMessageService } from 'ng-zorro-antd';
import { LanguageService } from './../../../services/language.service';
// 常用變數
import { message } from './../../../variables/message';
// model
import { Certification } from './../../../models/certification.model';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less']
})

export class IndexComponent implements OnInit 
{
  public certifications: AngularFireList<Certification>;
  public dataSet = [];

  public language = 'zh-TW';
  public target = 'certification';

  constructor
  (
    public firebase: AngularFireDatabase,
    public message: NzMessageService,
    public langService: LanguageService
  ) 
  { 
    this.language = this.langService.getLanguage();
  }

  ngOnInit() 
  {
    this.certifications = this.firebase.list(`${this.language}/${this.target}`);
    this.certifications.snapshotChanges().subscribe(list => {
      this.dataSet = list.map(item => {
        return {
          $key: item.key,
          certification: item.payload.val()
        }
      });
    });
  }

  delete($key: string, certification: Certification): void
  {
    firebase.storage().refFromURL(certification.url).delete();
    this.certifications.remove($key);
    this.message.success(message[this.language].success.delete);
  }
}
