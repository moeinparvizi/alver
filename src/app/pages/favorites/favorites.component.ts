import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { SpinnerComponent } from "../../components/spinner/spinner.component";
import { CardComponent } from "../../components/card/card.component";

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [SpinnerComponent, CardComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent extends BaseComponent implements OnInit {
  isLoading = false;
  products?: any;

  constructor(injector: Injector) {
    super(injector);
  }

  override ngOnInit() {
    super.ngOnInit();
  }

  override loadOnline() {
    super.loadOnline();
    this.onServiceCalled();
  }

  onServiceCalled() {
    this.serviceApi.getFavorite().subscribe({
      next: (res: any) => {
        if (res.status == 200) {
          this.products =res.products
        }
      },
      error: (err: any) => {
        this.showSnackBar('خطا در سیستم لطفا دوباره تلاش کنید')
      }
    })
  }
}
