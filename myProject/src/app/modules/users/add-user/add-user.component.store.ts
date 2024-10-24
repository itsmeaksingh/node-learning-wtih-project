import { ComponentStore } from '@ngrx/component-store';
import {
  AddUserStoreState,
  Student,
  UserListResponse,
} from '../data/users-interfaces';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';
import { ADD_USER_DEFAULT_STATE } from '../data/users-default-states';
import { EMPTY, Observable } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';

@Injectable()
export class AddUserComponentStore extends ComponentStore<AddUserStoreState> {
  constructor(private _router: Router, private _userService: UsersService) {
    super(ADD_USER_DEFAULT_STATE);
  }

  public init(): void {
    this._resetState();
  }

  private _resetState(): void {
    this.setState(() => {
      ADD_USER_DEFAULT_STATE.studentForm.reset();
      return ADD_USER_DEFAULT_STATE;
    });
  }

  public onEditMode(id: any): void {
    this._setIsAddMode(true);
    this._getStudentById(id);
  }

  public createStudentData(val: Student): void {
    this._createStudent(val);
  }

  public updateStudentData(val: Student): void {
    this._updateStudent(val);
  }

  private _setIsAddMode = this.updater(
    (_state: AddUserStoreState, isAddMode: boolean) => ({
      ..._state,
      isAddMode,
    })
  );

  private _setErrorBool = this.updater(
    (_state: AddUserStoreState, error: boolean) => ({
      ..._state,
      error,
    })
  );

  private _setErrorMessage = this.updater(
    (_state: AddUserStoreState, errorMessage: string) => ({
      ..._state,
      errorMessage,
    })
  );

  private _setAddStudentData(studentInfo: Student): Observable<Student> | any {
    this.setState((state: AddUserStoreState) => {
      state.studentForm.patchValue({
        name: studentInfo['name'],
        email: studentInfo['email'],
        phone: studentInfo['phone'],
        address: studentInfo['address'],
      });
      return state;
    });
  }

  private readonly _getStudentById = this.effect(
    (studentId$: Observable<Student>) => {
      return studentId$.pipe(
        switchMap((id: any) => {
          return this._userService.getById(id).pipe(
            tap({
              next: (_response: UserListResponse) => {
                console.log('_response', _response);
                this._setAddStudentData(_response.data[0]);
              },
              error: err => {
                console.error('err', err);
                this._setErrorBool(true);
                this._setErrorMessage('Something went wrong, Please try again');
              },
            }),
            catchError(() => EMPTY)
          );
        })
      );
    }
  );

  private readonly _createStudent = this.effect((obj$: Observable<Student>) => {
    return obj$.pipe(
      switchMap((obj: any) => {
        return this._userService.create(obj).pipe(
          tap({
            next: (_response: any) => {
              console.log('res: ', _response);
              this._router.navigate(['/users']);
            },
            error: () => {
              this._resetState();
              this._setErrorBool(true);
              this._setErrorMessage('Error while creating the student');
            },
          }),
          catchError(() => EMPTY)
        );
      })
    );
  });

  private readonly _updateStudent = this.effect((obj$: Observable<Student>) => {
    return obj$.pipe(
      switchMap((obj: any) => {
        return this._userService.create(obj).pipe(
          tap({
            next: _response => {
              console.log('res: ', _response);
              this._router.navigate(['/users']);
            },
            error: () => {
              this._resetState();
              this._setErrorBool(true);
              this._setErrorMessage('Error while updating the student');
            },
          }),
          catchError(() => EMPTY)
        );
      })
    );
  });
}
