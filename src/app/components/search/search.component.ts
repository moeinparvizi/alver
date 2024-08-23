import {
  Component,
  Injector,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { BaseComponent } from '../../base.component';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SearchPipe } from '../../util/pipes/search.pipe';
import { SnackbarService } from '../../services/snakebar/snackbar.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [MatFormFieldModule, FormsModule, CommonModule, SearchPipe],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class SearchComponent
  extends BaseComponent
  implements OnInit, OnDestroy
{
  res = [
    {
      id: 1,
      name: 'test',
    },
    {
      id: 2,
      name: 'moein',
    },
    {
      id: 3,
      name: 'jafar',
    },
  ];

  static isOpenDialog = false;

  value = '';

  constructor(
    injector: Injector,
    private matDialogRef: MatDialogRef<SearchComponent>,
    private snackbarService: SnackbarService
  ) {
    super(injector);
  }

  override ngOnInit() {
    super.ngOnInit();
    // sould be run service

    this.snackbarService.show(
      'شما میتوانید عملیات جستجو را باز کنید : ctrl + k',
      'بستن',
      3000,
      'custom-snackbar'
    );
  }

  ngOnDestroy(): void {
    // This gets called when the dialog is closed
    SearchComponent.isOpenDialog = false;
  }

  onNoClick(): void {
    if (SearchComponent.isOpenDialog) {
      this.matDialogRef.close();
    }
  }
}