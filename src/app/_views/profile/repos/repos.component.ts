import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { ReposService as HttpService } from "@/_api/services"
import { API_URL, REPOS as ENDPOINT, SEARCH } from '@/_api/constants'
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.scss']
})
export class ReposComponent implements OnInit {

  constructor(private httpService: HttpService) { }

  @Input() heading: string = ''
  @Input() repos: Array<object> = []
  @Input() totalCount: number = 0
  @Output() onPageChanged: EventEmitter<any> = new EventEmitter
  @Output() onSearch: EventEmitter<any> = new EventEmitter
  @Output() onOpenDetails: EventEmitter<any> = new EventEmitter

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('repos') && changes.repos.currentValue) {
      Promise.all(this.repos.map(repo => {
        return this.httpService.fetch(repo['name'], API_URL + `${SEARCH}/topics?q=+repo:angular/${repo['name']}&per_page=5`,  {
          headers: new HttpHeaders({'Accept': 'application/vnd.github.mercy-preview+json'})
        })
      })).then(res => {
        this.repos = this.repos.map(repo => {
          return {
            ...repo,
            topics: res.find(i => i.key === repo['name']) 
          }
        })
      })
    }
  }

  pageChanged(event: PageChangedEvent): void {
    this.onPageChanged.emit(event.page)
  }
  search(val) {
    this.onSearch.emit(val)
  }
  openDetails(repo) {
    this.onOpenDetails.emit(repo)
  }

}
