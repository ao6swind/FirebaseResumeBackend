import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ScreenImage } from '../../../../models/screen.model';
import { UploadedFile } from '../../../../models/file.model';

@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.less']
})
export class ScreenComponent implements OnInit {

  @Input() screens: Array<ScreenImage>;
  @Input() files: Array<UploadedFile>;
  @Input() form: FormGroup;
  @Input() builder: FormBuilder;

  private hideConfirm: boolean = true;

  constructor() 
  { 
    
  }

  ngOnInit() 
  {

  }

  addColumn(): void 
  {
    const column = new ScreenImage();
    this.screens.push(column);
    this.files.push(new UploadedFile());

    (this.form.get('screens') as FormArray).push(this.builder.group({
      title:        [ null, [ Validators.required ] ],
      url:          [ null, [ Validators.required ] ],
      description:  [ null ]
    }));
  }

  removeColumn(index: number): void
  {
    this.screens.splice(index, 1);
    this.files.splice(index, 1);
    (this.form.get('screens') as FormArray).removeAt(index);
  }

  readURL(event: any, i:number): void 
  {
    if (event.target.files && event.target.files[0] && event.target.value.length != 0) 
    {
      this.files[i].file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.files[i].content = reader.result.toString();
      reader.readAsDataURL(this.files[i].file);
    }
    else
    {
      this.files[i].file = null;
      this.files[i].content = null;
    }
  }
}
