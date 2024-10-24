import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './modules/users/user-list/user-list.component';

const routes: Routes = [
    {
        path: '',
        loadChildren: () =>
            import('./modules/auth/auth.module').then(m => m.AuthModule),
    },
    {
        path: 'users',
        loadChildren: () =>
            import('./modules/users/users.module').then(m => m.UsersModule),
    },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
