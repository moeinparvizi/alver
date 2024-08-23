import { GlobalsService } from './services/globals.service';
import { Component, Injector } from '@angular/core';
import { animationfadeIn } from './util/animation/animation.fade';
import { serviceApi } from './network/service/service.api';
import { Router } from '@angular/router';
import { ServicePath } from './network/service/service.path';
import { NetworkUtil } from './util/network.util';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatDialog } from '@angular/material/dialog';
import { Dialog } from '@angular/cdk/dialog';
import { SnackbarService } from './services/snakebar/snackbar.service';


// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@Component({
  template: '',
  animations: [animationfadeIn],
  providers: [serviceApi]
})
export abstract class BaseComponent {
  ServicePath = ServicePath;

  public serviceApi: serviceApi;
  public router: Router;
  public matDialog: MatDialog;
  public dialog: Dialog;
  public location: Location;
  public snakeBar: SnackbarService
  public GlobalsService: GlobalsService;

  protected constructor(injector: Injector) {
    this.serviceApi = injector.get(serviceApi);
    this.router = injector.get(Router);
    this.matDialog = injector.get(MatDialog);
    this.dialog = injector.get(Dialog);
    this.location = injector.get(Location);
    this.snakeBar = injector.get(SnackbarService)
    this.GlobalsService = injector.get(GlobalsService);

    this.GlobalsService.setUserToken(localStorage.getItem("token"));
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  ngAfterContentInit(): void {}

  public executeLoader(): void {
    // this.tableProperties.offset = 0;

    if (NetworkUtil.isInternetConnected()) {
      this.loadOnline();
    } else {
      this.loadOffline();
    }
  }

  public onInternetConnected(): void {
    this.executeLoader();
  }

  public loadOnline(): void {}

  public loadOffline(): void {}

  //   pageChanged(event: any) {
  //   this.tableProperties.limit = event.pageSize;
  // }

  // onSortChanged(event: any) {
  //   if (event.direction !== '') {
  //     this.tableProperties.order = {
  //       Field: event.active,
  //       Type: event.direction.toUpperCase()
  //     };
  //   } else {
  //     this.tableProperties.order = undefined;
  //   }
  //   this.tableProperties.offset = 0;
  // }

  onBackPressed() {
    this.location.back();
  }

  setListeners(): void {}
}
