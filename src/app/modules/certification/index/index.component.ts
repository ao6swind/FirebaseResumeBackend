
import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase';
import { message } from './../../../variables/message';
import { Certification } from './../../../models/certification.model';
import { LanguageService } from './../../../services/language.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less']
})

export class IndexComponent implements OnInit 
{
  private certifications: AngularFireList<Certification>;
  private dataSet = [];

  private language = 'zh-TW';
  private target = 'certification';

  constructor
  (
    private firebase: AngularFireDatabase,
    private message: NzMessageService,
    private langService: LanguageService
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
