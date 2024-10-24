import { ComponentStore } from '@ngrx/component-store';
import {
  Student,
  UserListResponse,
  UserListStoreState,
} from '../data/users-interfaces';
import { Injectable } from '@angular/core';
import { UsersService } from '../users.service';
import { USER_LIST_DEFAULT_STATE } from '../data/users-default-states';
import { EMPTY, Observable } from 'rxjs';
import { catchError, exhaustMap, switchMap, tap } from 'rxjs/operators';

@Injectable()
export class UserListComponentStore extends ComponentStore<UserListStoreState> {
  constructor(private _userService: UsersService) {
    super(USER_LIST_DEFAULT_STATE);
  }

  public init(): void {
    this._resetState();
    this._getUserListData();
  }

  public deleteUserData(id: string): void {
    this._deleteUser(id);
  }

  private _resetState(): void {
    this.setState((_state: UserListStoreState) => {
      return USER_LIST_DEFAULT_STATE;
    });
  }

  private readonly _addUserList = this.updater(
    (_state: UserListStoreState, studentList: Student[]) => ({
      ..._state,
      studentList,
    })
  );

  private readonly _addUserListTotalLength = this.updater(
    (_state: UserListStoreState, totalLength: number) => ({
      ..._state,
      totalLength,
    })
  );

  private readonly _setError = this.updater(
    (_state: UserListStoreState, errorMessage: string) => ({
      ..._state,
      errorMessage,
    })
  );

  private readonly _setErrorBool = this.updater(
    (_state: UserListStoreState, error: boolean) => ({
      ..._state,
      error,
    })
  );

  private readonly _getUserListData = this.effect<void>(
    (obj$: Observable<any>) => {
      return obj$.pipe(
        exhaustMap(() => {
          return this._userService.getAll().pipe(
            tap({
              next: (_response: UserListResponse) => {
                console.log('_response', _response);
                this._addUserList(_response.data);
                this._addUserListTotalLength(_response.rowCount);
              },
              error: err => {
                console.log('err', err);
                this._setErrorBool(true);
                this._setError('Something went wrong, Please try again');
              },
            }),
            catchError(() => EMPTY)
          );
        })
      );
    }
  );

  private readonly _deleteUser = this.effect((userId$: Observable<string>) => {
    return userId$.pipe(
      switchMap(id => {
        return this._userService.delete(id).pipe(
          tap({
            next: (_response: UserListResponse) => {
              console.log('_response', _response);
              this._getUserListData();
            },
            error: err => {
              console.log('err', err);
              this._setErrorBool(true);
              this._setError('Something went wrong, Please try again');
            },
          }),
          catchError(() => EMPTY)
        );
      })
    );
  });
}
