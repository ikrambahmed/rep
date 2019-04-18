import {Routes} from '@angular/router';
import {AdminComponent} from './layout/admin/admin.component';
import {AuthComponent} from './layout/auth/auth.component';
import { ListeMissionnaireComponent } from './liste-missionnaire/liste-missionnaire.component';
import { listenToElementOutputs } from '@angular/core/src/view/element';
import { MissionComponent } from './mission/mission.component';
import { OrdMissionnaireComponent } from './ord-missionnaire/ord-missionnaire.component';
import { BudgetDeptComponent } from './budget-dept/budget-dept.component';
import { budgetProjet } from './models/budgetProjet';
import { BudgetProjComponent } from './budget-proj/budget-proj.component';
import { FraisMissionComponent } from './frais-mission/frais-mission.component';
import { AllMissionComponent } from './all-mission/all-mission.component';
import { ProjetComponent } from './projet/projet.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RecapComponent } from './recap/recap.component';

export const AppRoutes: Routes = [
 
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }, {
        path: 'dashboard',
       // loadChildren: './pages/dashboard/dashboard-default/dashboard-default.module#DashboardDefaultModule'
     component:HomePageComponent
      }, {
        path: 'basic',
        loadChildren: './pages/ui-elements/basic/basic.module#BasicModule'
      }, {
        path: 'notifications',
        loadChildren: './pages/ui-elements/advance/notifications/notifications.module#NotificationsModule'
      }, {
        path: 'bootstrap-table',
        loadChildren: './pages/ui-elements/tables/bootstrap-table/basic-bootstrap/basic-bootstrap.module#BasicBootstrapModule',
      }, {
        path: 'map',
        loadChildren: './pages/map/google-map/google-map.module#GoogleMapModule',
      }, {
        path: 'user',
        loadChildren: './pages/user/profile/profile.module#ProfileModule'
      }, {
        path: 'simple-page',
        loadChildren: './pages/simple-page/simple-page.module#SimplePageModule'
      },
      {
        path: 'listeMissionnaire',
        component:ListeMissionnaireComponent
       // loadChildren: './liste-missionnaire.module#ListeMissionnaireComponent'
      },
      {
        path: 'mission',
        component:MissionComponent
       // loadChildren: './liste-missionnaire.module#ListeMissionnaireComponent'
      },
      {
        path: 'ord',
        component:OrdMissionnaireComponent
       // loadChildren: './liste-missionnaire.module#ListeMissionnaireComponent'
      },
      {
        path: 'budgetDept',
        component:BudgetDeptComponent
       // loadChildren: './liste-missionnaire.module#ListeMissionnaireComponent'
      },
      {
        path: 'budgetProj',
        component:BudgetProjComponent
       // loadChildren: './liste-missionnaire.module#ListeMissionnaireComponent'
      },
      {
        path: 'frais',
        component:FraisMissionComponent
       // loadChildren: './liste-missionnaire.module#ListeMissionnaireComponent'
      },
      {path:'allMission',component:AllMissionComponent},
     // {path:'HomePage',component:HomePageComponent},
      {path:'projet',component:ProjetComponent},
      {path:'recap',component:RecapComponent}


    ]
  }, {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: './pages/authentication/authentication.module#AuthenticationModule'
      }
    ]
  }
];
