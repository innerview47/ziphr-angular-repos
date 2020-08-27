import { Injectable } from '@angular/core';
import { API_URL, ORGS as ENDPOINT, SEARCH } from '@/_api/constants'
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private detailsDataSource = new BehaviorSubject<[]>([])
  private membersDataSource = new BehaviorSubject<[]>([])
  private reposDataSource = new BehaviorSubject<[]>([])
  details = this.detailsDataSource.asObservable()
  members = this.membersDataSource.asObservable()
  repos = this.reposDataSource.asObservable()

  constructor(private http: HttpClient) { }

  fetchDetails (org: string) {
    this.http.get(API_URL + ENDPOINT + `/${org}`).subscribe(data => {
      this.setData(this.detailsDataSource, data)
    })
  }
  
  fetchMembers (org: string, filters: string = '') {
    this.http.get(API_URL + `${ENDPOINT}/${org}/members` + filters).subscribe(data => {
      this.setData(this.membersDataSource, data)
    })
  }
  
  fetchRepos (org: string, filters: string = '') {
    let limit = '?per_page=10'
    this.http.get(API_URL + `${ENDPOINT}/${org}/repos` + limit + filters).subscribe(data => {
      this.setData(this.reposDataSource, data)
    })
  }

  setData (dataSource, data) {
    dataSource.next(data)
  }
}
