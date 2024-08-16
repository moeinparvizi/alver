import { Component, Injector, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from '../../base.component';
import {
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SearchPipe } from '../../util/pipes/search.pipe';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [MatFormFieldModule, FormsModule, CommonModule, SearchPipe],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class SearchComponent extends BaseComponent implements OnInit {

  res = [
    {
      id: 1,
      name: "test",
    }, {
      id: 2,
      name: "moein",
    }, {
      id: 3,
      name: "jafar",
    }
  ];

  value = '';

  constructor(injector: Injector, private matDialogRef: MatDialogRef<SearchComponent>) {
    super(injector);
  }


  override ngOnInit() {
    super.ngOnInit();
    // sould be run service
  }

  onNoClick(): void {
    this.matDialogRef.close();
  }
}
