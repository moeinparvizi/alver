import {
  Component,
  HostListener,
  Injector,
  OnInit,
  ViewChild,
} from '@angular/core';
import { BaseComponent } from '../../base.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatGridListModule,
    MatMenuModule,
  ],
  styleUrl: './header.component.scss',
  templateUrl: './header.componenet.html',
})
export class HeaderComponent extends BaseComponent implements OnInit {
  isSticky = false;
  showFiller = false;

  menuSections = [
    {
      title: 'Section 1',
      items: [
        { name: 'Item 1', link: '#' },
        { name: 'Item 2', link: '#' },
        { name: 'Item 3', link: '#' },
      ]
    },
    {
      title: 'Section 2',
      items: [
        { name: 'Item 4', link: '#' },
        { name: 'Item 5', link: '#' },
        { name: 'Item 6', link: '#' },
      ]
    },
    {
      title: 'Section 3',
      items: [
        { name: 'Item 7', link: '#' },
        { name: 'Item 8', link: '#' },
        { name: 'Item 9', link: '#' },
      ]
    },
  ];

  @ViewChild('drawer') drawer!: MatDrawer;

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
