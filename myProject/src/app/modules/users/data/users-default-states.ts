import {
  AbstractControlOptions,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AddUserStoreState, UserListStoreState } from './users-interfaces';
import { MustMatch } from '../_helpers/must-match.validator';
import { passwordRegex, phoneRegex } from './users-enums';

const CUSTOM_VALIDATORS: AbstractControlOptions = {
  validators: MustMatch('password', 'confirmPassword'),
};

export const ADD_USER_DEFAULT_STATE: AddUserStoreState = {
  studentForm: new FormGroup(
    {
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(phoneRegex),
      ]),
      address: new FormControl(''),
      password: new FormControl('', [
        Validators.minLength(6),
        Validators.required,
        Validators.pattern(passwordRegex),
      ]),
      confirmPassword: new FormControl('', Validators.required),
    },
    CUSTOM_VALIDATORS
  ),
  isAddMode: false,
  error: false,
  errorMessage: '',
};

export const USER_LIST_DEFAULT_STATE: UserListStoreState = {
  studentList: [],
  totalLength: 0,
  error: false,
  errorMessage: '',
};
