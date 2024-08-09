import { Component, Injector } from '@angular/core';
import { animationfadeIn } from './util/animation/animation.fade';
import { serviceApi } from './network/service/service.api';
import { ActivatedRoute, Router } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { ServicePath } from './network/service/service.path';
import { SamaRequestType } from './enums/sama.request.type';
import { NetworkUtil } from './util/network.util';
import { Location } from '@angular/common';

@Component({
  template: '',
  animations: [animationfadeIn],
})
export class BaseComponent {
  ServicePath = ServicePath;

  public serviceApi: serviceApi;
  public router: Router;
  // public translateService: TranslateService;
  public location: Location;
  //   tableProperties: any = {
  //   offset: 0,
  //   limit: 7,
  //   order: undefined,
  //   requestType: SamaRequestType.PAGINATE,
  //   pageLength: 0,
  //   limitOptions: [7, 14, 28],
  //   onSortChanged: (event: any) => {
  //     this.onSortChanged(event);
  //   },
  //   pageChanged: (event: any) => {
  //     this.pageChanged(event);
  //   }
  // };

  protected constructor(injector: Injector) {
    this.serviceApi = injector.get(serviceApi);
    this.router = injector.get(Router);
    // this.translateService = injector.get(TranslateService);
    this.location = injector.get(Location);

    // this.translateService.addLangs(['fa', 'en', 'es', 'ar', 'tr', 'ja']);
    // this.translateService.currentLang = 'fa';
    // this.translateService.setDefaultLang('fa');
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
