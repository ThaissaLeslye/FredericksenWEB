//app/pages/home.ts
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UiAvatar } from '../../components/ui-avatar/ui-avatar';

@Component({
  selector: 'app-home',
  imports: [UiAvatar,RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})

export class Home {
  
}
