import { Routes } from '@angular/router';
import { MasterLayoutComponent } from './layout/master/master.layout';
import { RouteUtil } from './util/route.util';
import { LoginSignupComponent } from './pages/login-signup/login-signup.component';

export const routes: Routes = [
  {
    path: RouteUtil.HOME,
    component: MasterLayoutComponent,
    loadChildren: () => import('./pages/home/home.routes').then(c => c.routes),
  },
  {
    path: `${RouteUtil.PRODUCT}/:id/:name`,
    component: MasterLayoutComponent,
    loadChildren: () =>
      import('./pages/product/product.routes').then(c => c.routes),
  },
  {
    path: RouteUtil.PRODUCTS,
    component: MasterLayoutComponent,
    loadChildren: () =>
      import('./pages/products/products.routes').then(c => c.routes),
  },
  {
    path: `${RouteUtil.PRODUCT_DETAIL}/:id/:name`,
    component: MasterLayoutComponent,
    loadChildren: () =>
      import('./pages/product-detail/product-detail.routes').then(
        c => c.routes
      ),
  },
  {
    path: RouteUtil.REGISTER,
    component: LoginSignupComponent,
  },
  {
    path: RouteUtil.ABOUT_US,
    component: MasterLayoutComponent,
    loadChildren: () =>
      import('./pages/about-us/about-us.routes').then(c => c.routes),
  },
  {
    path: RouteUtil.NOT_FOUND,
    component: MasterLayoutComponent,
    loadChildren: () =>
      import('./pages/NotFound/NotFound.routes').then(c => c.routes),
  },

  // { path: RouteUtil.HOME, component: HomeComponent }, // Optional: redirect root path to the example component
  // { path: 'products', component: ProductsComponent },
  // { path: 'product/:id', component: ProductComponent },
  // { path: 'product/:id/:name', component: ProductComponent },
];
