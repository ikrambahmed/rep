import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { XHrInterceptor } from './xhr.interceptor';
import {StoreModule} from '@ngrx/store' ; 
import {AppRoutes} from './app.routing';
import { AppComponent } from './app.component';
import { AdminComponent } from './layout/admin/admin.component';
import {ClickOutsideModule} from 'ng-click-outside';
import {SharedModule} from './shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BreadcrumbsComponent} from './layout/admin/breadcrumbs/breadcrumbs.component';
import {TitleComponent} from './layout/admin/title/title.component';
import {AuthComponent} from './layout/auth/auth.component';
import { AppService } from './app.service';
import { CookieService } from 'ngx-cookie-service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { principalReducer } from './shared/principal.reducer';
import { HomeService } from './services/home.service';
import { ListeMissionnaireComponent } from './liste-missionnaire/liste-missionnaire.component';
import { MissionnaireService } from './services/missionnaire.service';
import { MissionnaireComponent } from './missionnaire/missionnaire.component';
import { MissionComponent } from './mission/mission.component';
import { MissionService } from './services/mission.service';
import { OrdMissionnaireComponent } from './ord-missionnaire/ord-missionnaire.component';
import { OrdMissService } from './services/ord-miss.service';
import { BudgetDeptComponent } from './budget-dept/budget-dept.component';
import { BudgetProjComponent } from './budget-proj/budget-proj.component';
import { FraisMissionComponent } from './frais-mission/frais-mission.component';
import { AllMissionComponent } from './all-mission/all-mission.component';
import { ProjetComponent } from './projet/projet.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ButtonComponent } from './pages/ui-elements/basic/button/button.component';
import { RecapComponent } from './recap/recap.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';



@NgModule({
  declarations: [
    AppComponent,
    OrdMissionnaireComponent,
    ListeMissionnaireComponent,
    MissionnaireComponent,
    AdminComponent,
    FraisMissionComponent,
    BreadcrumbsComponent,
    TitleComponent,
    AuthComponent,
    ListeMissionnaireComponent,
    OrdMissionnaireComponent,
    BudgetDeptComponent,
    BudgetProjComponent,
    MissionComponent,
    AllMissionComponent,
    HomePageComponent ,
    RecapComponent,
    ProjetComponent ],
  imports: [
    FormsModule , 
    ModalModule.forRoot(),
    ReactiveFormsModule ,
    HttpClientModule ,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes),
    ClickOutsideModule,
    StoreModule.provideStore({principal:principalReducer}) , 
    SharedModule
  ],
  providers: [BsModalService,BsModalRef
  ,AppService , HomeService,MissionnaireService, OrdMissService, MissionService, CookieService,  {provide :HTTP_INTERCEPTORS, useClass :XHrInterceptor  , multi : true } , 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
