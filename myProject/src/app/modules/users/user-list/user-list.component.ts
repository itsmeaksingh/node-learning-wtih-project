import { Component, OnInit } from '@angular/core';
import { UserListComponentStore } from './user-list.component.store';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  state$ = this._store.state$;
  constructor(
    private _store: UserListComponentStore,
  ) {}

  ngOnInit(): void {
    this._store.init();
  }

  public deleteUser(id: any): void {
    this._store.deleteUserData(id);
  }
}
