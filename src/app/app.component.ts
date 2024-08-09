import { Component, OnInit } from '@angular/core';
import { Config } from './common/config';
import { HomeComponent } from './pages/home/home.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [HomeComponent, RouterOutlet],
})
export class AppComponent implements OnInit {
  title = 'alver';
  protected readonly Config = Config;

  constructor() {
  }

  ngOnInit(): void {}
}
