import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { apis } from '../../../environments/environment'

@Injectable()
export class DataService {
    private baseUrl = `${apis.baseUrl}/admin`
    private data = new BehaviorSubject<Array<any>>([{fetching: true}])
    data$ = this.data.asObservable()

    constructor(public http: HttpClient) {
    }
    
    settings(): Observable<any> {
        const url = `${this.baseUrl}/settings`

        return this.http.get<any>(url)
    }
    
    updateSettings(params: any): Observable<any> {
        const url = `${this.baseUrl}/update-settings`

        return this.http.post<any>(url, params)
    }
}
