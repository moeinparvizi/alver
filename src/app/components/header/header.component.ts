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
import { Config } from '../../common/config';

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

  constructor(injector: Injector) {
    super(injector);
    this.token = this.GlobalsService.getUserToken();
    console.log(Config.basketCount);
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

    this.isSticky = offset > 300;
  }

  onHandleNavigateToProducts(): void {
    this.router.navigate([RouteUtil.PRODUCTS]).then();
  }

  onHandleNavigateToHome(): void {
    this.router.navigate([RouteUtil.HOME]).then();
  }

  onHandleNavigateToProduct(company: any): void {
    this.router.navigate([RouteUtil.PRODUCTS, 1, 'test'], {
      queryParams: { id: company.id, name: company.name },
    }).then();
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.ctrlKey && event.key === 'k') {
      event.preventDefault();
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

  onProfileClicked() {
    console.log('Profile clicked')
  }

  onNavigationToLogIn() {
    this.router.navigate([RouteUtil.REGISTER]).then();
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
          this.router.navigate(['']).then();
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

  onAboutUsClicked() {
    this.router.navigate([RouteUtil.ABOUT_US]).then();
  }

  onBasketClicked() {
    this.router.navigate([RouteUtil.BASKET]).then();
  }

  protected readonly Config = Config;
}
