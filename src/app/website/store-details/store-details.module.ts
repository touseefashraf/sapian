import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreDetailsComponent } from './store-details.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataService } from './data.service';
const routes: Routes = [
    { path: '', component: StoreDetailsComponent }
  ]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ModalModule.forRoot(),
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [StoreDetailsComponent],
  providers: [DataService]
})
export class StoreDetailsModule { }
