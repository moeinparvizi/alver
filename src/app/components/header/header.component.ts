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
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../util/pipes/search.pipe';
import { SearchComponent } from '../search/search.component';
import { MatDialogRef } from '@angular/material/dialog';
import { CategoryResponse, LogOutResponse } from '../../models/data.response';
import { SpinnerComponent } from '../spinner/spinner.component';
import { RouteUtil } from '../../util/route.util';

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
    SpinnerComponent,
  ],
  styleUrl: './header.component.scss',
  templateUrl: './header.component.html',
})
export class HeaderComponent extends BaseComponent implements OnInit {
  isSticky = false;
  showExtra = false;
  token: string | null;
  isLoading = false;
  companies?: any = [];

  @ViewChild('drawer') drawer!: MatDrawer;
  @ViewChild('test') menuTrigger!: MatMenuTrigger;

  private dialogRef: MatDialogRef<SearchComponent> | null = null;

  // isDialogOpen = false;

  constructor(injector: Injector) {
    super(injector);
    this.token = this.GlobalsService.getUserToken();
  }

  override loadOnline() {
    super.loadOnline();

    this.serviceApi.getCategories().subscribe({
      next: (res: CategoryResponse) => {
        this.companies = res.categories;
        this.isLoading = false;
      },
      error: (err: any) => {
        this.isLoading = false;
        this.snakeBar.show(err, 'بستن', 3000, 'custom-snackbar');
      },
    });
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
    this.router.navigate([RouteUtil.PRODUCTS]);
  }

  onHandleNvigateToHome(): void {
    this.router.navigate([RouteUtil.HOME]);
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
        width: '100%',
      });

      this.dialogRef.afterClosed().subscribe(() => {
        SearchComponent.isOpenDialog = false;
        this.dialogRef = null;
      });
    }
  }

  onPrifileClicked() {}

  onNavigationToLogIn() {
    this.router.navigate(['/register']);
  }

  onLogOutClicked() {
    this.isLoading = true;
    this.serviceApi.logOut().subscribe({
      next: (response: LogOutResponse) => {
        if (response.status === 200) {
          this.isLoading = false;
          localStorage.removeItem('token');
          localStorage.removeItem('userId');
          location.reload();
          this.router.navigate(['']);
        } else {
          this.snakeBar.show(
            'خطا در ارتباط با سرور لطفا دوباره تلاش کنید',
            'بستن',
            3000,
            'custom-snackbar'
          );
        }
      },
      error: () => {
        this.isLoading = false;
        this.snakeBar.show(
          'خطا در ارتباط با سرور لطفا دوباره تلاش کنید',
          'بستن',
          3000,
          'custom-snackbar'
        );
      },
    });
  }

  onMenuCloseClicked() {
    if (this.isLoading) {
      this.menuTrigger.openMenu();
    }
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onAboutUsClicked() {}
}
