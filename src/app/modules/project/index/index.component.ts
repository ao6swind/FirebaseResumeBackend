import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase';
import { LanguageService } from './../../../services/language.service';
import { NzMessageService } from 'ng-zorro-antd';
import { message } from './../../../variables/message';
import { Project } from './../../../models/project.model';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less']
})

export class IndexComponent implements OnInit 
{
  public isLoading: boolean = false;
  public projects: AngularFireList<Project>;
  public dataSet = [];

  public language = 'zh-TW';
  public target = 'project';

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
    this.isLoading = true;
    this.projects = this.firebase.list(`${this.language}/${this.target}`);
    this.projects.snapshotChanges().subscribe(list => {
      this.dataSet = list.map(item => {
        return {
          $key: item.key,
          project: item.payload.val()
        }
      });
      this.isLoading = false;
    });
  }

  delete($key: string, project: Project): void
  {
    for(const i in project.screens)
    {
      firebase.storage().refFromURL(project.screens[i].url).delete();
    }
    this.projects.remove($key);
    this.message.success(message[this.language].success.delete);
  }
}
