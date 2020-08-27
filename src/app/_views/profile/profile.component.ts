import { Component, OnInit, TemplateRef } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { ProfileService as HttpService, ReposService } from '@/_api/services'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  constructor(
      private httpService: HttpService,
      private reposHttpService: ReposService
    ) { }

  details: object = {}
  members: Array<object> = []
  repos: Array<object> = []
  commits: object = {}
  issues: object = {}
  readMe: object = {}
  selectedRepo: string = ''

  ngOnInit(): void {
    this.init()
  }

  init () {
    this.getDetails()
    this.getMembers()
    this.getRepos()
  }

  getDetails () {
    this.httpService.fetchDetails('angular')
    this.httpService.details.subscribe(details => {
      if (Object.keys(details).length) this.details = details
    })
  }

  getMembers () {
    this.httpService.fetchMembers('angular')
    this.httpService.members.subscribe(members => {
      if (members.length) this.members = members
    })
  }
  
  getRepos (filters: string = '', page: number = 1) {
    this.reposHttpService.searchRepos('angular', filters, page)
    this.reposHttpService.data.subscribe(repos => {
      this.repos = repos
    })
  }

  paginateTo (page, type='', repo=this.selectedRepo) {
    if (type === 'repos') this.getRepos('', page)
    if (type === 'commits') this.getRepoCommits(repo, `&page=${page}`)
    if (type === 'issues') this.getRepoIssues(repo, `&page=${page}`)
  }

  getRepoDetails (repo) {
    this.selectedRepo = repo
    this.reposHttpService.fetchReadMe('angular', repo)
    this.reposHttpService.readMe.subscribe(readMe => {
      this.readMe = readMe
    })
    this.getRepoCommits(repo)
    this.getRepoIssues(repo)
  }

  getRepoCommits (repo, filters='') {
    this.reposHttpService.fetchCommits('angular', repo + filters)
    this.reposHttpService.commits.subscribe(commits => {
      this.commits = commits
    })
  }

  getRepoIssues (repo, filters='') {
    this.reposHttpService.fetchIssues('angular', repo + filters)
    this.reposHttpService.issues.subscribe(issues => {
      this.issues = issues
    })
  }

  pageChanged(event: PageChangedEvent, type=''): void {
    this.paginateTo(event.page, type)
  }

}
