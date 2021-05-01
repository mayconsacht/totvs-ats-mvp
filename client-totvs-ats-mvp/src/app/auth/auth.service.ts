import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { State } from '../shared/state/state';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends State<firebase.auth.UserCredential> {

  constructor(public auth: AngularFireAuth, private router: Router) {
    super();
  }

  async login({login, password}): Promise<any> {
    try {
      const user = await firebase.auth().signInWithEmailAndPassword(login, password);
      this.setCurrentState(user);
      if (user) {
        this.router.navigate(['resume']);
      }
    } catch (error) {
      if (error.code === 'auth/wrong-password') {
        error = 'Senha inválida.';
      } else if (error.code === 'auth/invalid-email') {
        error = 'Email inválido.';
      }
      return { error };
    }
  }

  redirect(): void {
    this.router.navigate(['login']);
  }

  logout(): void {
    this.setCurrentState({} as firebase.auth.UserCredential);
    this.auth.signOut();
  }
}
