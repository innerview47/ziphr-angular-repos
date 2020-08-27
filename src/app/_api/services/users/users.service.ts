import { Injectable } from '@angular/core';
import { API_URL, USERS as ENDPOINT } from '@/_api/constants'
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private dataSource = new BehaviorSubject<[]>([])
  data = this.dataSource

  constructor(private http: HttpClient) { }

  fetchData (user: string) {
    this.http.get(API_URL + ENDPOINT + `/${user}`).subscribe(data => {
      this.setData(this.dataSource, data)
    })
  }

  setData (dataSource, data) {
    dataSource.next([...dataSource.getValue(), data])
  }
}
