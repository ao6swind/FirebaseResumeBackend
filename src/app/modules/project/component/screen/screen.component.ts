import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ScreenImage } from '../../../../models/screen.model';
import { Uploaded } from '../../../../models/uploaded.model';
import * as firebase from 'firebase';

@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.less']
})
export class ScreenComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() builder: FormBuilder;
  @Input() uploaded_list: Array<Uploaded>;
  @Input() screens: Array<ScreenImage>;
  @Output() removeScreen = new EventEmitter();
  
  constructor() 
  { 
    
  }

  ngOnInit() 
  {

  }

  addColumn(): void 
  {
    this.screens.push(new ScreenImage());
    this.uploaded_list.push(new Uploaded());

    (this.form.get('screens') as FormArray).push(this.builder.group({
      title:        [ null, [ Validators.required ] ],
      url:          [ null, [ Validators.required ] ],
      description:  [ null ]
    }));
  }

  removeColumn(index: number): void
  {
    const target = this.screens[index];
    this.screens.splice(index, 1);
    this.uploaded_list.splice(index, 1);
    (this.form.get('screens') as FormArray).removeAt(index);
    if(target.url != null)
    {
      firebase.storage().refFromURL(target.url).delete();
      this.removeScreen.emit(index);
    }
  }

  readURL(event: any, i:number): void 
  {
    if (event.target.files && event.target.files[0] && event.target.value.length != 0) 
    {
      this.uploaded_list[i].file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.uploaded_list[i].content = reader.result.toString();
      reader.readAsDataURL(this.uploaded_list[i].file);
    }
    else
    {
      this.uploaded_list[i].file = null;
      this.uploaded_list[i].content = null;
    }
  }
}
