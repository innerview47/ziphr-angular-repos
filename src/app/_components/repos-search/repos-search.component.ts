import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-repos-search',
  templateUrl: './repos-search.component.html',
  styleUrls: ['./repos-search.component.scss']
})
export class ReposSearchComponent implements OnInit {

  @Output() onSearch: EventEmitter<string> = new EventEmitter
  inputString = ''
  languages = [
    'All', 'ApacheConf', 'CSS', 'Dart','HCL', 'HTML', 'Java', 'JavaScript',
    'Python', 'Ruby', 'Shell', 'Starlark', 'TypeScript'
  ]
  types = ['All', 'Forked', 'Archived', 'Mirror']
  selectedLang = ''
  selectedType = ''
  typingTimer = 0
  typingInterval = 1000
  constructor() { }

  ngOnInit(): void {
  }
  set _isTyping (val) {
    clearTimeout(this.typingTimer)
    if (val) {
      this.typingTimer = setTimeout(() => this.emitSearch(), this.typingInterval)
    }
  }
  clearInterval () {
    clearTimeout(this.typingTimer)
  }
  emitSearch() {
    let searchString = this.inputString
    searchString += this.selectedLang && this.selectedLang !== 'All' ? `+language:${this.selectedLang}` : ''
    searchString += this.selectedType && this.selectedType !== 'All' ? `+${this.selectedType.toLowerCase().replace(/s$/, 'ed')}:true` : ''
    this.onSearch.emit(searchString)
  }
  setSelectedLang(val) {
    this.selectedLang = val
    this.emitSearch()
  }
  setSelectedType(val) {
    this.selectedType = val
    this.emitSearch()
  }

}
