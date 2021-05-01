import { Component } from '@angular/core';
import { PoPageLogin } from '@po-ui/ng-templates';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {
  loading = false;
  loginError = [];

  constructor(private auth: AuthService) {}

  async loginSubmit(formData: PoPageLogin): Promise<void> {
    this.loading = true;
    const result = await this.auth.login(formData);
    if (result && result.error) {
      this.loginError.push(result.error);
    } else {
      this.loginError = [];
    }
    this.loading = false;
  }
}
