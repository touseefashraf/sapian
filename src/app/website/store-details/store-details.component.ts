import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { UIHelpers } from 'src/app/helpers/ui-helpers';
import { IAlertService } from 'src/app/libs/ialert/ialerts.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from './data.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
@Component({
    selector: 'app-store-details',
    templateUrl: './store-details.component.html',
    styleUrls: ['./store-details.component.css']
})
export class StoreDetailsComponent implements OnInit {
    prizeForm: FormGroup
    thanks = false
    listCity: any[]
    storeList: any[]
    stores = []
    modalRef: BsModalRef
    id: any = ''
    username: any = ''
    submiteEmail: any = false
    constructor(
        private fb: FormBuilder,
        public ui: UIHelpers,
        private alert: IAlertService,
        private router: Router,
        public ds: DataService,
        public ms: BsModalService,
        private route: ActivatedRoute,
    ) {
        this.id = this.route.snapshot.paramMap.get('id')
        const params = {
            id: this.id
        }
        this.ds.winnerDetail(params).subscribe((resp: any) => {
            if (resp.data == null) {
                // this.router.navigate(['/'])
                // return false
            }
            this.username = resp.data.name
            this.ds.cityList().subscribe((resp: any) => {
                if (resp.success === true) {
                    this.listCity = resp.data
                }
            })

            this.ds.storeList().subscribe((resp: any) => {
                if (resp.success === true) {
                    this.storeList = resp.data
                }
            })
        })
    }

    ngOnInit() {
        this.prizeForm = this.fb.group({
            store_id: new FormControl(null, [Validators.required]),
            city_id: new FormControl(null, [Validators.required])
        })
    }

    get g() {
        return this.prizeForm.controls
    }
    openModal(modal) {

        this.modalRef = this.ms.show(
            modal,
            {
                class: 'modal-sm modal-dialog website',
                backdrop: 'static',
                ignoreBackdropClick: true,
                keyboard: false
            }
        )
    }
    save(data: any, f: any) {

        if (data.status === 'INVALID') {
            this.alert.error('Si us plau, completa totes les dades del formulari')

            return false
        }

        this.submiteEmail = true
        data.value.id = this.id
        let saveUpdate = this.ds.updateWinner(data.value)

        saveUpdate.subscribe((resp: any) => {
            this.submiteEmail =  false
            if (resp.success === false) {
                this.alert.error(resp.errors.general)
                return false
            } else {
                // this.alert.success('Botiga enregistrada amb èxit')
                // this.router.navigate(['/'])
                this.thanks = true
            }

        })
    }

    goto() {
        window.location.href = "/"
    }

    quite() {
        this.modalRef.hide()
        window.location.href = "/"
    }

    getStores(e) {
        const cityId = e.target.value
        this.stores = []
        this.storeList.forEach(e => {
            if (cityId == e.city_id) {
                this.stores.push({
                    id: e.id,
                    address: e.address
                })
            }

        });
    }
}
