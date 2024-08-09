import { Component, Injector, OnInit } from "@angular/core";
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { RouterOutlet } from "@angular/router";
import { BaseComponent } from "../../base.component";

@Component({
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    RouterOutlet
  ],
  templateUrl: './master.layout.html'
})

export class MasterLayoutComponent extends BaseComponent implements OnInit {

  constructor(injector: Injector) {
    super(injector);
  }
}
