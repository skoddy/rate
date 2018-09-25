import { Component, OnInit } from '@angular/core';
import { User } from '@app/data-model';
import { OverlayRef } from '@angular/cdk/overlay';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@app/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-portal',
  templateUrl: './auth-portal.component.html',
  styleUrls: ['./auth-portal.component.scss']
})
export class AuthPortalComponent implements OnInit {
  user: User;
  lastKeydown = '';
  overlayRef: OverlayRef;
  signInForm: FormGroup;
  hide = true;
  constructor(
    public fb: FormBuilder,
    public auth: AuthService,
    private router: Router
  ) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25)
      ]]
    });
  }

  ngOnInit() {
  }
  get email() {
    return this.signInForm.get('email');
  }
  get password() {
    return this.signInForm.get('password');
  }
  google() {
    return this.auth.googleLogin()
      .then(() => this.overlayRef.detach());
  }

  github() {
    return this.auth.githubLogin()
      .then(() => this.overlayRef.detach());
  }

  twitter() {
    return this.auth.twitterLogin()
      .then(() => this.overlayRef.detach());
  }

  facebook() {
    return this.auth.facebookLogin()
      .then(() => this.overlayRef.detach());
  }
  signIn() {
    return this.auth
      .emailSignIn(this.email.value, this.password.value)
      .then(user => {
        if (this.signInForm.valid) {
        }
        this.router.navigate(['/userlist']);
        console.log('signed in!');
        this.overlayRef.detach();
      });
  }
}
