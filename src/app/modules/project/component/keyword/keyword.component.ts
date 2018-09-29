import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Keyword } from './../../../../models/keyword.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-keyword',
  templateUrl: './keyword.component.html',
  styleUrls: ['./keyword.component.less']
})
export class KeywordComponent implements OnInit {

  @Input() keywords: Array<Keyword>
  @Input() form: FormGroup;

  private counter: number = 0;

  constructor(fb: FormBuilder) 
  { 

  }

  ngOnInit() {
  }

  addColumn(): void 
  {
    this.counter++;
    const column = new Keyword();
    column.instance = `${name}#${this.counter}`;
    this.keywords.push(column);
    this.form.addControl(column.instance, new FormControl(null, Validators.required));
  }

  removeColumn(index: number): void
  {
    const column = this.keywords[index];
    this.keywords.splice(index, 1);
    this.form.removeControl(column.instance);
  }
}
