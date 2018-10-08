import { Component, OnInit } from '@angular/core';
import { Profile } from './../../../models/profile.model';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { NzMessageService } from 'ng-zorro-antd';
import { message } from './../../../variables/message';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.less']
})

export class EditComponent implements OnInit {

  private profile: Profile = new Profile();
  private dataSet = [];
  private profiles: AngularFireList<Profile>;

  private language = 'zh_TW';
  private target = 'profile';

  constructor(
    private fb: AngularFireDatabase,
    private message: NzMessageService
  ) { }

  ngOnInit() {
    this.profiles = this.fb.list(`${this.language}/${this.target}`);
    this.profiles.snapshotChanges().subscribe(list => {
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
      this.profiles.update(this.dataSet[0].$key, this.profile)
    }
    else
    {
      this.profiles.push(this.profile);
    }
    this.message.success(message[this.language].success.update);
  }
}
