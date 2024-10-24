import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddUserComponentStore } from './add-user/add-user.component.store';
import { UserListComponentStore } from './user-list/user-list.component.store';

@NgModule({
  declarations: [UserListComponent, AddUserComponent],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    UsersRoutingModule,
  ],
  providers: [AddUserComponentStore, UserListComponentStore],
})
export class UsersModule {}
