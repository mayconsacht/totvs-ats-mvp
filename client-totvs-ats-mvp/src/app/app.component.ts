import { Component, OnInit } from '@angular/core';
import { PoMenuItem } from '@po-ui/ng-components';
import firebase from 'firebase/app';
import { AuthService } from './auth/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  user: firebase.auth.UserCredential;

  readonly menus: Array<PoMenuItem> = [
    { label: 'Dashboard', action: this.onClick.bind(this) },
    { label: 'Meu currículo', action: this.onClick.bind(this) },
    { label: 'Oportunidades', action: this.onClick.bind(this) },
    { label: 'Cadastrar oportunidade', action: this.onClick.bind(this) },
  ];

  constructor(public auth: AuthService) {}

  async ngOnInit(): Promise<void> {
    this.user = await this.auth.getCurrentState();
  }

  onClick(): void {
    alert('Clicked in menu item');
  }
}
