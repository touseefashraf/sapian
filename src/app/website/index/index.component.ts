import { IAlertService } from './../../libs/ialert/ialerts.service'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { ApiService } from '../../services/api.service'
import { DataService } from './data.service'
import { appURL } from '../../../environments/environment'

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit, OnDestroy {

    constructor(
        public api: ApiService,
        public alert: IAlertService,
        public ds: DataService
    ) {
        this.ds.settings().subscribe((resp: any) => {
            this.ds.questionsPerTeam = resp.data.questions_per_team
            this.ds.maxPrizes = resp.data.max_prize_questions

            this.ds.getQuestions().subscribe((data: any) => {
                const questions = this.RandomSlice(data, this.ds.questionsPerTeam * 2)
                this.ds.data.teamA.questions = questions.slice(0, (this.ds.questionsPerTeam))
                this.ds.data.teamB.questions = questions.slice(this.ds.questionsPerTeam)
            })

            this.ds.getPrizeQuestions().subscribe((data: any) => {
                const totalQuestions = this.ds.questionsPerTeam * 2
                if (this.ds.maxPrizes <= 0 ) {
                    return false
                }
                const segmentsCount = totalQuestions / this.ds.maxPrizes

                let temp = []
                for (let i = 1; i < this.ds.questionsPerTeam * 2; i++) {
                    temp.push(i)
                }
                const segments = this.MakeChunk(temp, segmentsCount)
                this.ds.totalPrizes = segments.length
                this.ds.prizeQuestions = this.RandomSlice(data, this.ds.totalPrizes)
                segments.forEach(segment => {
                    const randomIndex = Math.floor(Math.random() * (segment.length-1))
                    this.ds.prizeQuestionIndexs.push(segment[randomIndex])
                })
                this.ds.prizeQuestionIndexs.sort((a, b) => a-b)

                // console.log('this.ds.prizeQuestionIndexs='+this.ds.prizeQuestionIndexs)
                // console.log('totalQuestions', totalQuestions)
                // console.log('this.ds.totalPrizes='+this.ds.totalPrizes)
                // console.log('this.ds.maxPrizes='+this.ds.maxPrizes)
            })
        })
    }

    ngOnInit() {
    }

    RandomSlice(data: Array<any>, size: number, result = []) {
        if (size <= 0) {
            return []
        }
        const randomIndex = Math.floor(Math.random() * data.length)
        result.push(data.splice(randomIndex, 1)[0]);
        return result.length >= size ? result : this.RandomSlice(data, size, result);
    }

    ngOnDestroy(): void {
    }

    MakeChunk(arr, size) {
        return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
          arr.slice(i * size, i * size + size)
        )
    }
}
