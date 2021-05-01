import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login.component';

export const ROUTES: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login',  component: LoginComponent },
  { path: 'resume', loadChildren: () => import('./resume/resume.module').then(m => m.ResumeModule), canActivate: [AuthGuard]  },
];
