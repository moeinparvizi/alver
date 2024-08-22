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
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../util/pipes/search.pipe';
import { SearchComponent } from '../search/search.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatGridListModule,
    MatMenuModule,
    FormsModule,
    SearchPipe,
  ],
  styleUrl: './header.component.scss',
  templateUrl: './header.componenet.html',
})
export class HeaderComponent extends BaseComponent implements OnInit {
  isSticky = false;
  showExtra = false;

  @ViewChild('drawer') drawer!: MatDrawer;

  private dialogRef: MatDialogRef<SearchComponent> | null = null;

  // isDialogOpen = false;

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

  onHandleNvigateToProducts(): void {
    this.router.navigate(['products']);
  }

  onHandleNvigateToHome(): void {
    this.router.navigate(['home']);
  }

  onHandleNvigateToProduct(): void {
    this.router.navigate(['product', 1, 'test'], {
      queryParams: { id: 1, name: 'test' },
    });
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.ctrlKey && event.key === 'k') {
      event.preventDefault(); // Prevent the default action (often focuses on the browser's address bar)
      this.onShowSearchBox();
    }
  }

  onShowSearchBox() {
      if (!SearchComponent.isOpenDialog) {
      SearchComponent.isOpenDialog = true;
      this.dialogRef = this.matDialog.open(SearchComponent, {
        height: 'auto',
        width: '100%'
      });

      this.dialogRef.afterClosed().subscribe(() => {
        SearchComponent.isOpenDialog = false;
        this.dialogRef = null;
      });
    }
  }
}
