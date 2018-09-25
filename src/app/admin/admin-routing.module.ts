import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from '@app/admin/user-list/user-list.component';
import { AdminComponent } from '@app/admin/admin/admin.component';
import { AdminGuard } from '@app/core/auth/admin.guard';

const routes: Routes = [
    {
      path: '',
      canActivate: [AdminGuard],
      component: AdminComponent,
      children: [
        {
          path: '',
          redirectTo: 'userlist',
          pathMatch: 'full'
        },
        {
          path: 'userlist',
          component: UserListComponent,
          
          data: { title: 'anms.examples.menu.todos' }
        }
      ]
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

  export class AdminRoutingModule {}