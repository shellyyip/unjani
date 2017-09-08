import { store, actionTypes, stages } from './unjaniRedux'
import moment from 'moment'

export default class Requester {
  BASE_URL = "https://sandbox-healthservice.priaid.ch/"
  DEFAULT_QUERY_PARAMS = "?language=en-gb&format=json&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImNocmlzdGluYS52LnN0ZXdhcnRAZ21haWwuY29tIiwicm9sZSI6IlVzZXIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiIxNTUyIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy92ZXJzaW9uIjoiMjAwIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9saW1pdCI6Ijk5OTk5OTk5OSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbWVtYmVyc2hpcCI6IlByZW1pdW0iLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL2xhbmd1YWdlIjoiZW4tZ2IiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL2V4cGlyYXRpb24iOiIyMDk5LTEyLTMxIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9tZW1iZXJzaGlwc3RhcnQiOiIyMDE3LTA0LTI1IiwiaXNzIjoiaHR0cHM6Ly9zYW5kYm94LWF1dGhzZXJ2aWNlLnByaWFpZC5jaCIsImF1ZCI6Imh0dHBzOi8vaGVhbHRoc2VydmljZS5wcmlhaWQuY2giLCJleHAiOjE1MDQ4NjI3ODMsIm5iZiI6MTUwNDg1NTU4M30.HIU6RINZL66HTduGTFSXvx4Bs6z3ZicWd9mkHpP8CB0"

  constructor(gender, birthYear) {
    this.gender = gender;
    this.birthYear = birthYear;  
  }

  get() {
    const {stage, medicalInfo} = store.getState()

    switch (stage) {
      case stages.BODY_LOCATION: {
        const locationID = this.getLocationID(stages.BODY_LOCATION, medicalInfo)
        const fullURL = this.BASE_URL + "body/locations/" + locationID + this.DEFAULT_QUERY_PARAMS
        return (this.makeRequest(fullURL))
      }
      case stages.BODY_SUBLOCATION: {
        const locationID = this.getLocationID(stages.BODY_SUBLOCATION, medicalInfo)
        const selectorStatus = this.getSelectorStatus()
        const fullURL = this.BASE_URL + "symptoms/" + locationID + "/" + selectorStatus + this.DEFAULT_QUERY_PARAMS
        console.log(fullURL)
        return (this.makeRequest(fullURL))
      }
    }

    return "something happened"
  }

  getLocationID(stage, medicalInfo) {
    return medicalInfo[stage].selected[0]
  }

  getSelectorStatus() {
    let thisYear = moment().year();
    let elevenYearsAgo = thisYear - 11;
    let isOverEleven = (this.birthYear < elevenYearsAgo)
    
    switch (this.gender) {
      case "female": {
        return (isOverEleven ? 'woman' : 'girl')
      }
      case "male": {
        return (isOverEleven ? 'man' : 'boy')
      }
    }
  }

  makeRequest(url) {
    const request = new XMLHttpRequest();
    request.onreadystatechange = (e) => {
      if (request.readyState !== 4) {
        return;
      }

      if (request.status === 200) {
        const result = request.responseText;
        store.dispatch({type: actionTypes.REQUEST_COMPLETED, payload: {potential: eval(result)}}) 
      } else {
        console.log('error');
      }
    }

    request.open('GET', url)
    request.send()
  }
}

