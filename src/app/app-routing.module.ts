import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { AuthGuard } from './guards/auth.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { OAuthCallbackComponent } from './components/oauth-callback-component/oauth-callback-component.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'signup', component: SignUpComponent },
  { path: 'login', component: LogInComponent },
  {
    path: 'createUser',
    component: CreateUserComponent,
    canActivate: [AuthGuard],
  },
  { path: 'oauth-callback', component: OAuthCallbackComponent },
  { path: 'home', component: HomeComponent ,canActivate: [AuthGuard],  },
  { path: 'not-found', component: NotFoundComponent }, // Add this route
  { path: '**', redirectTo: '/not-found' } // Wildcard route for undefined paths
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
