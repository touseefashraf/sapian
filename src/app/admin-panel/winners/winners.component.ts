import { ActivatedRoute, Router } from '@angular/router'
import { IAlertService } from '../../libs/ialert/ialerts.service'
import { UIHelpers } from '../../helpers/ui-helpers'
import { DataService } from './data.service'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms'
import { Component, OnInit } from '@angular/core'
import * as moment from 'moment'
import { ConstantsService } from 'src/app/services/constants.service'
@Component({
    selector: 'app-winners',
    templateUrl: './winners.component.html',
    styleUrls: ['./winners.component.css']
})
export class WinnersComponent implements OnInit {

    dataStatus = 'fetching'
    listPrize = []
    selectedIndex = -1
    addEditForm: FormGroup
    modalRef: BsModalRef
    loginLoading = false
    moment = moment
    loaderOptions = {
        rows: 3,
        cols: 4,
        colSpans: {
            0: 1,
        }
    }

    constructor(
        public ds: DataService,
        private fb: FormBuilder,
        public ui: UIHelpers,
        private alert: IAlertService,
        public ms: BsModalService,
        public route: ActivatedRoute,
        private router: Router,
        public cs: ConstantsService,
    ) {

        const list = this.ds.list()
        list.subscribe((resp: any) => {
            if (resp.success === true) {
                this.listPrize = resp.data
                this.dataStatus = 'done'
            }
        })


    }

    ngOnInit() {
    }
  

}
