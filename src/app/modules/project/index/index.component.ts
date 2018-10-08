import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Project } from './../../../models/project.model';
import { message } from './../../../variables/message';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less']
})

export class IndexComponent implements OnInit 
{
  private projects: AngularFireList<Project>;
  private dataSet = [];

  constructor
  (
    private firebase: AngularFireDatabase,
    private message: NzMessageService
  ) 
  { 

  }

  ngOnInit() 
  {
    this.projects = this.firebase.list('zh_TW_projects');
    this.projects.snapshotChanges().subscribe(list => {
      this.dataSet = list.map(item => {
        return {
          $key: item.key,
          project: item.payload.val()
        }
      });
    });
  }

  delete($key: string, project: Project): void
  {
    for(const i in project.screens)
    {
      firebase.storage().refFromURL(project.screens[i].url).delete();
    }
    this.projects.remove($key);
    this.message.success(message['zh_TW'].success.delete);
  }
}
