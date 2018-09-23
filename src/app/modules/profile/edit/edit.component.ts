import { Component, OnInit } from '@angular/core';
import { Profile } from './../../../models/profile.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.less']
})
export class EditComponent implements OnInit {

  private profile: Profile = new Profile();
  constructor() { }

  ngOnInit() {
  }

}
