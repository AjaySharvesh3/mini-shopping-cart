import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public userData : any = {};

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('user'));
    console.log(this.userData);
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['']);
    })
  }

}
