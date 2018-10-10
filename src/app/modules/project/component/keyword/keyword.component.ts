import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Keyword } from './../../../../models/keyword.model';

@Component({
  selector: 'app-keyword',
  templateUrl: './keyword.component.html',
  styleUrls: ['./keyword.component.less']
})
export class KeywordComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() builder: FormBuilder;
  @Input() keywords: Array<Keyword>

  constructor() 
  { 

  }

  ngOnInit() 
  {

  }

  addColumn(): void 
  {
    this.keywords.push(new Keyword());

    (this.form.get('keywords') as FormArray).push(this.builder.group({
      content: [ null, [ Validators.required ] ]
    }));
  }

  removeColumn(index: number): void
  {
    this.keywords.splice(index, 1);
    (this.form.get('keywords') as FormArray).removeAt(index);
  }
}
