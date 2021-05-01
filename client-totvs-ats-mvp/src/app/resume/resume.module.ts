import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { PoModule } from '@po-ui/ng-components';
import { MyResumeComponent } from './my-resume/my-resume.component';

const routes: Routes = [
  { path: '', component: MyResumeComponent }
];

@NgModule({
  declarations: [MyResumeComponent],
  exports: [MyResumeComponent],
  imports: [
    CommonModule,
    PoModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class ResumeModule { }
