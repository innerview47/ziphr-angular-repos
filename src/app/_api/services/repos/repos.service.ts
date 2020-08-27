import { Injectable } from '@angular/core';
import { API_URL, REPOS as ENDPOINT, SEARCH } from '@/_api/constants'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ReposService {

  private dataSource = new BehaviorSubject<[]>([])
  private readMeDataSource = new BehaviorSubject<[]>([])
  private topicsDataSource = new BehaviorSubject<[]>([])
  private commitsDataSource = new BehaviorSubject<[]>([])
  private issuesDataSource = new BehaviorSubject<[]>([])
  data = this.dataSource.asObservable()
  readMe = this.readMeDataSource.asObservable()
  topics = this.topicsDataSource.asObservable()
  commits = this.commitsDataSource.asObservable()
  issues = this.issuesDataSource.asObservable()

  constructor(private http: HttpClient) { }

  fetch (key:string, url: string, headers: any = null) {
    const data = window.localStorage.getItem(key);
    if (data) {
      return {
        ...JSON.parse(data),
        key
      };
    } else {
      return this.http.get(url, headers || null).toPromise().then(data => {
        window.localStorage.setItem(key, JSON.stringify(data));
        return {
          ...data,
          key,
        }
      })
    }
  }

  fetchReadMe (org: string, repo: string) {
    this.http.get(API_URL + ENDPOINT + `/${org}/${repo}/contents/README.md`).subscribe(data => {
      this.setData(this.readMeDataSource, data)
    })
  }

  fetchTopics (org: string, repo: string, filters: string = '') {
    this.http.get(API_URL + `${SEARCH}/topics?q=a+repo:${org}/${repo}` + filters, {
      headers: new HttpHeaders({'Accept': 'application/vnd.github.mercy-preview+json'})
    }).subscribe(data => {
      this.setData(this.topicsDataSource, data)
    })
  }

  searchRepos (org: string, filters: string = '', page: number = 1) {
    let limit = '&per_page=10'
    this.http.get(API_URL + `${SEARCH}/repositories?q=${filters}+user:${org}&page=${page}` + limit).subscribe(data => {
      this.setData(this.dataSource, data)
    })
  }

  fetchIssues (org: string, repo: string, filters: string = '') {
    let limit = '&per_page=6'
    this.http.get(API_URL + `${SEARCH}/issues?q=a+repo:${org}/${repo}` + filters + limit).subscribe(data => {
      this.setData(this.issuesDataSource, data)
    })
  }
  
  fetchCommits (org: string, repo: string, filters: string = '') {
    let limit = '&per_page=6'
    this.http.get(API_URL + `${SEARCH}/commits?q=a+repo:${org}/${repo}` + filters + limit, {
      headers: new HttpHeaders({'Accept': 'application/vnd.github.cloak-preview+json'})
    }).subscribe(data => {
      this.setData(this.commitsDataSource, data)
    })
  }

  setData (dataSource, data) {
    dataSource.next(data)
  }
}
