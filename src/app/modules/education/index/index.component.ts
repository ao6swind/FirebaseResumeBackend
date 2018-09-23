import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Education } from '../../../models/education.model';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less']
})
export class IndexComponent implements OnInit {

  private pagesize: number = 10;
  private total: number;
  private data: AngularFireList<Education>;
  private dataSet = [];
  constructor(private firebase: AngularFireDatabase) { }
  
  ngOnInit() {
    
    this.data = this.firebase.list('zh_TW_educations');
    this.data.snapshotChanges().subscribe(list => {
      this.total = list.length;
      this.dataSet = list.map(item => {
        return {
          $key: item.key,
          education: item.payload.val()
        }
      });
    });
  }

  delete($key: string): void
  {
    this.data.remove($key);
  }
}
