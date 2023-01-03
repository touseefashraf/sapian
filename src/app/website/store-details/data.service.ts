import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { apis } from '../../../environments/environment'

@Injectable()
export class DataService {
    private baseUrl = `${apis.baseUrl}/public`
    
    constructor(public http: HttpClient) {
    }
    cityList(): Observable<any> {
        const url = `${this.baseUrl}/cities`

        return this.http.get<any>(url)
    }
    storeList(): Observable<any> {
        const url = `${this.baseUrl}/stores`

        return this.http.get<any>(url)
    }
    updateWinner(params): Observable<any> {
        const url = `${this.baseUrl}/update-winner-details`

        return this.http.post<any>(url, params)
    }

    winnerDetail(data): Observable<any> {
        const url = `${this.baseUrl}/winner-details`

        return this.http.post<any>(url, data)
    }
}
