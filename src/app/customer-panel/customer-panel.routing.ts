import { CustomerPanelGuard } from './../auth/customer-panel-guard';
import { CustomerPanelComponent } from './customer-panel.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
    {
        path: '',
        component: CustomerPanelComponent,
        //canActivate: [CustomerPanelGuard],
        children: [
            {
                path: 'dashboard',
                loadChildren: () => import('./dashboard/dashboard.module')
                    .then(mod => mod.DashboardModule)
            },
            {
                path: '**',
                component: PageNotFoundComponent,
                data: { message: 'From Customer' }
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CustomerPanelRoutes { }
