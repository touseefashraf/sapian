import { DataService } from 'src/app/website/index/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-instructions',
    templateUrl: './instructions.component.html',
    styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {

    constructor(public ds: DataService) { }

    ngOnInit() {
    }

}
