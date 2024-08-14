import { Component, HostListener, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatSidenavModule, MatButtonModule, MatIconModule],
  styleUrl: './header.component.scss',
  templateUrl: './header.componenet.html',
})
export class HeaderComponent extends BaseComponent implements OnInit {
  isSticky = false;
  showFiller = false;

  constructor(injector: Injector) {
    super(injector);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const offset =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    if (offset > 300) {
      this.isSticky = true;
    } else {
      this.isSticky = false;
    }
  }
}
