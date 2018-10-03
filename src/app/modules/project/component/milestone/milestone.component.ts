import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Milestone } from './../../../../models/milestone.model';

@Component({
  selector: 'app-milestone',
  templateUrl: './milestone.component.html',
  styleUrls: ['./milestone.component.less']
})
export class MilestoneComponent implements OnInit {

  @Input() milestones: Array<Milestone>
  @Input() form: FormGroup;

  private counter: number = 0;

  constructor() { }

  ngOnInit() {
  }

  addColumn(): void 
  {
    this.counter++;
    const column = new Milestone();
    column.instance = `milestone#${this.counter}`;
    this.milestones.push(column);
    this.form.addControl(`${column.instance}#datetime`, new FormControl(null, Validators.required));
    this.form.addControl(`${column.instance}#description`, new FormControl(null, Validators.required));
  }

  removeColumn(index: number): void
  {
    const column = this.milestones[index];
    this.milestones.splice(index, 1);
    this.form.removeControl(`${column.instance}#datetime`);
    this.form.removeControl(`${column.instance}#description`);
  }

}
