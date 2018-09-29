import { Component, OnInit } from '@angular/core';
import { Profile } from './../../../models/profile.model';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.less']
})
export class EditComponent implements OnInit {

  private profile: Profile = new Profile();
  private dataSet = [];
  private fb_profiles: AngularFireList<Profile>;
  private db_profiles: AngularFirestoreCollection<Profile>;

  constructor(
    private db: AngularFirestore,
    private fb: AngularFireDatabase,
    private notification: NzNotificationService
  ) { }

  ngOnInit() {
    this.fb_profiles = this.fb.list('zh_TW_profiles');
    this.fb_profiles.snapshotChanges().subscribe(list => {
      this.dataSet = list.map(item => {
        return {
          $key: item.key,
          profile: item.payload.val()
        }
      });
      this.profile.content = (this.dataSet.length > 0) ? this.dataSet[0].profile.content : '';
    });
  }

  submit(): void 
  {
    if(this.dataSet.length > 0)
    {
      this.fb_profiles.update(this.dataSet[0].$key, this.profile).then(result => {
        this.notification.blank('修改完成', '完成拉~');
      });
    }
    else
    {
      this.fb_profiles.push(this.profile);
    }
  }
}
