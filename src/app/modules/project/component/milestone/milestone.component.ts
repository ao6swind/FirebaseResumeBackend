import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Milestone } from './../../../../models/milestone.model';

@Component({
  selector: 'app-milestone',
  templateUrl: './milestone.component.html',
  styleUrls: ['./milestone.component.less']
})
export class MilestoneComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() builder: FormBuilder;
  @Input() milestones: Array<Milestone>

  constructor() 
  { 

  }

  ngOnInit() 
  {

  }

  addColumn(): void 
  {
    this.milestones.push(new Milestone());
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
