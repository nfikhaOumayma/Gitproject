import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { AuthGuard } from './guards/auth.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'signup', component: SignUpComponent },
  { path: 'login', component: LogInComponent },
  { path: 'createUser', component: CreateUserComponent, canActivate: [AuthGuard] },
  { path: 'not-found', component: NotFoundComponent }, // Add this route
  { path: '**', redirectTo: '/not-found' } // Wildcard route for undefined paths
  //{path: 'not-found', component: NotFoundComponent}, // Add this route
  //{path: 'sidebar', component: SidebarComponent}, // Add this route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
