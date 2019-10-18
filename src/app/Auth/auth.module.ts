import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';




@NgModule({
  declarations: [AuthComponent],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
     RouterModule.forChild([
      {path: '', component: AuthComponent}
     ]


  )]

})

export class AuthModule {

}
