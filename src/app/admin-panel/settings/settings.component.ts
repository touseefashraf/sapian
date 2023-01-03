import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service'
import { UIHelpers } from 'src/app/helpers/ui-helpers';
import { Router } from '@angular/router';
import { IAlertService } from 'src/app/libs/ialert/ialerts.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
    registrationError: string
    settingsForm: FormGroup
    constructor(
        private fb: FormBuilder,
        private dataService: DataService,
        public ui: UIHelpers,
        private router: Router,
        private alert: IAlertService,
    ) {
        this.dataService.settings().subscribe((resp: any) => {
            this.settingsForm.patchValue(resp.data)
        })

        this.settingsForm = this.fb.group({
            questions_per_team: new FormControl(null, [Validators.required]),
            max_prize_questions: new FormControl(null, [Validators.required]),
        })
    }

    get g() {
        return this.settingsForm.controls
    }

    ngOnInit() {
    }

    save(data: any): boolean {

        if (data.status === 'INVALID') {
            this.alert.error('Please fill-in valid data in all fields & try again.')

            return false
        }
        if(data.value.questions_per_team <= data.value.max_prize_questions) {
            this.alert.error('Prize question should less than team questions')
            return false
        }
        this.dataService.updateSettings(data.value).subscribe((resp: any) => {
            if (resp.success === false) {
                this.alert.error(resp.errors.general)

                return false
            } else {
                this.alert.success('Changes updated successfully!!')
            }
        })
    }

}
