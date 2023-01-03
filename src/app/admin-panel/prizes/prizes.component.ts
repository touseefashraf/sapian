import { ActivatedRoute, Router } from '@angular/router'
import { IAlertService } from '../../libs/ialert/ialerts.service'
import { UIHelpers } from '../../helpers/ui-helpers'
import { DataService } from './data.service'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms'
import { Component, OnInit } from '@angular/core'

@Component({
    selector: 'app-prizes',
    templateUrl: './prizes.component.html',
    styleUrls: ['./prizes.component.css']
})
export class PrizesComponent implements OnInit {

    dataStatus = 'fetching'
    listPrize = []
    selectedIndex = -1
    addEditForm: FormGroup
    modalRef: BsModalRef
    loginLoading = false
    loaderOptions = {
        rows: 3,
        cols: 3,
        colSpans: {
            0: 1,
        }
    }
    id: any = 0
    constructor(
        public ds: DataService,
        private fb: FormBuilder,
        public ui: UIHelpers,
        private alert: IAlertService,
        public ms: BsModalService,
        public route: ActivatedRoute,
        private router: Router
    ) {

        const list = this.ds.list()
        list.subscribe((resp: any) => {
            if (resp.success === true) {
                this.listPrize = resp.data
                this.dataStatus = 'done'
            }
        })

        
        this.addEditForm = this.fb.group({
            id: new FormControl(null, []),
            name: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
            total: new FormControl(null, [Validators.required])
        })


    }
    get g() {
        return this.addEditForm.controls
    }
    ngOnInit() {
    }

    openModal(modal, index) {

        if (index > -1) {
            this.addEditForm.controls.id.setValue(this.listPrize[index].id)
            this.addEditForm.patchValue(this.listPrize[index])
        } 

        this.selectedIndex = index

        this.modalRef = this.ms.show(
            modal,
            {
                class: 'modal-md modal-dialog admin-panel',
                backdrop: 'static',
                ignoreBackdropClick: true,
                keyboard: false
            }
        )
    }

    save(f: any) {
        this.loginLoading = true
        if (this.addEditForm.status === 'INVALID') {
            this.alert.error('Please fill-in valid data in all fields & try again.')
            this.loginLoading = false
            return false
        }
        
        let saveUpdate = this.ds.add(this.addEditForm.value)

        if (this.addEditForm.value.id !=null) {
            saveUpdate = this.ds.update(this.addEditForm.value)
        }
        saveUpdate.subscribe((resp: any) => {

            this.loginLoading = false

            if (resp.success === false) {
                this.alert.error(resp.errors.general)
                return false
            } else {
                if (this.selectedIndex > -1) {
                    this.alert.success('Changes done successfully!!')
                    this.listPrize[this.selectedIndex] = this.addEditForm.value
                    this.selectedIndex = -1

                } else {
                    this.alert.success('Added successfully!!')
                    this.addEditForm.value.id = resp.data
                    console.log(this.addEditForm.value)
                    this.listPrize.push(this.addEditForm.value)
                }
                this.modalRef.hide()
                f.resetForm()
            }
        })

    }

    deleteEntry(f: any) {
        this.loginLoading = true
        const params = {
            id: this.listPrize[this.selectedIndex].id
        }
        const deleteEntry = this.ds.delete(params)
        deleteEntry.subscribe((resp: any) => {
            this.loginLoading = false
            if (resp.success === false) {
                this.alert.error(resp.errors.general)
                this.loginLoading = false
                return false
            } else {

                this.listPrize.splice(this.selectedIndex, 1)
                this.alert.success('Entry Deleted successfully!!')
            }
            this.modalRef.hide()
        })
    }


    cancelButton(f: any) {
        if (f) {
            f.resetForm()
        }
        this.modalRef.hide()
    }

}
