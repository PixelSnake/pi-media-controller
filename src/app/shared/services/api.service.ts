import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment'

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) { }

  postAction(type: string, action: string, payload: any) {
    return this.http.post(`${environment.apiBaseUrl}/action`, { type, action, payload })
  }
}
