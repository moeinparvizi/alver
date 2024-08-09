import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '../../base.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  styleUrl: './footer.component.scss',
  templateUrl: './footer.component.html',
})
export class FooterComponent extends BaseComponent implements OnInit {
  constructor(injector: Injector) {
    super(injector);
   }

 }

