import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ComboinfoComponent} from './comboinfo/comboinfo.component';
import {IndexComponent} from './index/index.component';
import {ListComponent} from './list/list.component';
import {LoginComponent} from './login/login.component';
import {UserinfoComponent} from './userinfo/userinfo.component';
import {NewcomboComponent} from './newcombo/newcombo.component'

const routes: Routes = [
  {
    path: 'comboinfo/:comboid',
    component: ComboinfoComponent,
  },
  {
    path: 'index',
    component: IndexComponent
  },
  {
    path: 'combolist',
    component: ListComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'userinfo',
    component: UserinfoComponent,
  },
  {
    path: 'newcombo',
    component: NewcomboComponent,
  },
  {
    path: 'newcombo/:comboid',
    component: NewcomboComponent,
  },
  {
    path: '',
    redirectTo: 'index',
    pathMatch: 'full'
  }
  // {
  //   path: 'userinfo',
  //   redirectTo: 'login',
  //   pathMatch: 'full'
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
