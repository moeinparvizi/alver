import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '../../base.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  styleUrl: './header.component.scss',
  templateUrl: './header.componenet.html',
})
export class HeaderComponent extends BaseComponent implements OnInit {
  constructor(injector: Injector) {
    super(injector);
   }

 }
