import { AdminPanelComponent } from './admin-panel.component'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AdminGuard } from '../auth/admin-guard'

const routes: Routes = [
    {
        path: '',
        component: AdminPanelComponent,
        canActivate: [AdminGuard],
        children: [
            {
                path: 'dashboard',
                loadChildren: () => import('./dashboard/dashboard.module')
                    .then(mod => mod.DashboardModule)
            },
            {
                path: 'settings',
                loadChildren: () => import('./settings/settings.module')
                    .then(mod => mod.SettingsModule)
            },
            {
                path: 'prizes',
                loadChildren: () => import('./prizes/prizes.module')
                    .then(mod => mod.PrizesModule)
            },
            {
                path: 'winners',
                loadChildren: () => import('./winners/winners.module')
                    .then(mod => mod.WinnersModule)
            },
            {
                path: 'change-password',
                loadChildren: () => import('./change-password/change-password.module')
                    .then(mod => mod.ChangePasswordModule)
            }

        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminPanelRoutes { }
