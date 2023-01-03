import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { apis } from '../../../environments/environment'

@Injectable()
export class DataService {
    private baseUrl = `${apis.baseUrl}/public`
    prizeQuestions = []
    questionsPerTeam = 0
    totalQuestion = 0
    prizeIndex = 0
    maxPrizes = 0
    totalPrizes = 0
    prizeQuestionIndexs = []
    prize = {
        nextQuestion : 0,
    }
    data = {
        nextTeam: 'teamA',
        teamA: {
            score: 0,
            questions: [],
            nextQuestion: 0
        },
        teamB: {
            score: 0,
            questions: [],
            nextQuestion: 0
        }
    }

    constructor(public http: HttpClient) {
    }

    public getQuestions(): Observable<any> {
        const questionsURL = 'assets/data/questions.json'
        return this.http.get(questionsURL);
    }

    public getPrizeQuestions(): Observable<any> {
        const questionsURL = 'assets/data/prize-questions.json'
        return this.http.get(questionsURL);
    }

    getSubscriptionStatus(): Observable<any> {
        const url = `${apis.baseUrl}/customer/subbidding-payment-status`

        return this.http.post<any>(url, {})
    }

    getCompanyImages(): Observable<any> {
        const url = `${this.baseUrl}/company-images-list`

        return this.http.get<any>(url)
    }

    sendPrize(params): Observable<any> {
        const url = `${this.baseUrl}/update-prize-winner`

        return this.http.post<any>(url, params)
    }
    prizeList(): Observable<any> {
        const url = `${this.baseUrl}/prize-list`

        return this.http.get<any>(url)
    }
    settings(): Observable<any> {
        const url = `${this.baseUrl}/settings`

        return this.http.get<any>(url)
    }

    randomPrize(): Observable<any> {
        const url = `${this.baseUrl}/pre-prize-winner`

        return this.http.get<any>(url)
    }

}
