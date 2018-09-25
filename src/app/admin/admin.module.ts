import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { AdminComponent } from './admin/admin.component';
import { AdminRoutingModule } from '@app/admin/admin-routing.module';
import { MaterialModule } from '@app/material.module';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule
  ],
  declarations: [UserListComponent, AdminComponent]
})
export class AdminModule { }
