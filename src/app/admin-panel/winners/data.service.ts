import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { apis } from '../../../environments/environment'

@Injectable()
export class DataService {
    private baseUrl = `${apis.baseUrl}`
    constructor(private http: HttpClient) { }

    list(): Observable<any> {
        const url = `${this.baseUrl}/admin/prize-winners-list`

        return this.http.get<any>(url)
    }
}
