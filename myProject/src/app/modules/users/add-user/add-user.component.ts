import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddUserComponentStore } from './add-user.component.store';
import { Student } from '../data/users-interfaces';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  state$ = this._store.state$;

  constructor(
    private route: ActivatedRoute,
    private _store: AddUserComponentStore
  ) {}

  ngOnInit(): void {
    this._store.init();

    const id = this.route.snapshot.params['id'];
    if (id) {
      this._store.onEditMode(id);
    }
  }

  public onSave(val: Student): void {
    this._store.createStudentData(val);
  }

  public onUpdate(val: Student): void {
    this._store.updateStudentData(val);
  }
}
