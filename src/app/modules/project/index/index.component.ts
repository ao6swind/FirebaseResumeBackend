import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Project } from './../../../models/project.model';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less']
})
export class IndexComponent implements OnInit {

  private pagesize: number = 10;
  private total: number;
  private data: AngularFireList<Project>;
  private dataSet = [];
  constructor(private firebase: AngularFireDatabase) { }

  ngOnInit() {
    this.data = this.firebase.list('zh_TW_projects');
    this.data.snapshotChanges().subscribe(list => {
      this.total = list.length;
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
    this.data.remove($key);
  }
}
