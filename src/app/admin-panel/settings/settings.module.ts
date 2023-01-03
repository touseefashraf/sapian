import { DataService } from './data.service'
import { ReactiveFormsModule } from '@angular/forms'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { RouterModule } from '@angular/router'
import { SettingsComponent } from './settings.component'


@NgModule({
    imports: [
        CommonModule,

        ReactiveFormsModule,
        RouterModule.forChild([
            { path: '', component: SettingsComponent }
        ])
    ],
    providers: [DataService],
    declarations: [SettingsComponent]
})
export class SettingsModule { }
