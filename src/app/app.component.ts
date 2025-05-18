import { Component } from '@angular/core';
import { AuthGuard } from './guards/auth.guard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Gitproject';

  constructor(public authGuard: AuthGuard) {}
}
