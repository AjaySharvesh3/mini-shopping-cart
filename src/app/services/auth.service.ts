import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fAuth: AngularFireAuth, private router: Router) { }

  
  loginViaGoogle() {
    return this.authLoginPopUpProvider(new firebase.auth.GoogleAuthProvider());
  }


  authLoginPopUpProvider(provider: any) {
    return this.fAuth.signInWithPopup(provider)
                    .then(results => {
                      console.log('results', results);

                      const userData = {
                        name: results.user.displayName,
                        email: results.user.email,
                        picture: results.user.photoURL
                      }

                      localStorage.setItem('user', JSON.stringify(userData));

                      console.log('You have been successfully logged in!');
                      this.router.navigate(['/home']);
                    })
                    .catch(error => {
                      console.log('Failed To Login: ', + error);
                    })
  }

  logout() {
    return this.fAuth.signOut().then(res => {
      localStorage.clear();
    })
  }

}
