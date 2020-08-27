import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { UsersService as HttpService } from "@/_api/services"

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnChanges {

  constructor(private httpService: HttpService) { }

  @Input() heading: string = ''
  @Input() users: Array<object> = []
  profiles = []
  filtered = []
  searchString = ''

  ngOnInit(): void {
    this.httpService.data.subscribe(data => {
      this.profiles = data
      this.filtered = this.profiles
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.users.currentValue) {
      this.users.map(user => {
        this.httpService.fetchData(user['login'])
      })
    }
  }

  search () {
    this.filtered = this.profiles.filter(profile => {
      return (profile['name'] && profile['name'].toLowerCase().indexOf(this.searchString) > -1)
      || (profile['login'] && profile['login'].toLowerCase().indexOf(this.searchString) > -1)
    })
  }

}
