import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Milestone } from './../../../../models/milestone.model';

@Component({
  selector: 'app-milestone',
  templateUrl: './milestone.component.html',
  styleUrls: ['./milestone.component.less']
})
export class MilestoneComponent implements OnInit {

  @Input() milestones: Array<Milestone>
  @Input() form: FormGroup;
  @Input() builder: FormBuilder;

  constructor() 
  { 

  }

  ngOnInit() 
  {

  }

  addColumn(): void 
  {
    const column = new Milestone();
    this.milestones.push(column);
    (this.form.get('milestones') as FormArray).push(this.builder.group({
      datetime:     [ null, [ Validators.required ] ],
      description:  [ null, [ Validators.required ] ]
    }));
  }

  removeColumn(index: number): void
  {
    this.milestones.splice(index, 1);
    (this.form.get('milestones') as FormArray).removeAt(index);
  }

}
