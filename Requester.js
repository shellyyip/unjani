import { store, actionTypes, stages, noneOption } from './unjaniRedux'
import moment from 'moment'

export default class Requester {
  BASE_URL = "https://sandbox-healthservice.priaid.ch/"
  DEFAULT_QUERY_PARAMS = "?language=en-gb&format=json&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImNocmlzdGluYS52LnN0ZXdhcnRAZ21haWwuY29tIiwicm9sZSI6IlVzZXIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiIxNTUyIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy92ZXJzaW9uIjoiMjAwIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9saW1pdCI6Ijk5OTk5OTk5OSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbWVtYmVyc2hpcCI6IlByZW1pdW0iLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL2xhbmd1YWdlIjoiZW4tZ2IiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL2V4cGlyYXRpb24iOiIyMDk5LTEyLTMxIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9tZW1iZXJzaGlwc3RhcnQiOiIyMDE3LTA0LTI1IiwiaXNzIjoiaHR0cHM6Ly9zYW5kYm94LWF1dGhzZXJ2aWNlLnByaWFpZC5jaCIsImF1ZCI6Imh0dHBzOi8vaGVhbHRoc2VydmljZS5wcmlhaWQuY2giLCJleHAiOjE1MDY2NjU3ODQsIm5iZiI6MTUwNjY1ODU4NH0.kH20W6s8HB2eRZ7Br0bnQyNWfl8tRpweQ8gAGP2b0Jw"

  constructor(gender, birthYear) {
    this.gender = gender;
    this.birthYear = birthYear;  
  }

  get() {
    const {stage, medicalInfo} = store.getState();

    const fullURL = () => {
      switch (stage) {
        case stages.BODY_LOCATION: {
          const locationID = this.getLocationID(stages.BODY_LOCATION, medicalInfo)
          return this.BASE_URL + "body/locations/" + locationID + this.DEFAULT_QUERY_PARAMS
        }
        case stages.BODY_SUBLOCATION: {
          const locationID = this.getLocationID(stages.BODY_SUBLOCATION, medicalInfo)
          const selectorStatus = this.getSelectorStatus()
          return this.BASE_URL + "symptoms/" + locationID + "/" + selectorStatus + this.DEFAULT_QUERY_PARAMS
         }
        case stages.SUBLOCATION_SYMPTOMS: {
          const locationIDs = this.getLocationIDs(stages.SUBLOCATION_SYMPTOMS, medicalInfo)
          return this.BASE_URL + "symptoms/proposed" + this.DEFAULT_QUERY_PARAMS + "&symptoms=" + JSON.stringify(locationIDs) + "&gender=" + this.gender + "&year_of_birth=" + this.birthYear 
        }
        case stages.ADDITIONAL_SYMPTOMS: {
          const symptomLocationIDs = this.getLocationIDs(stages.SUBLOCATION_SYMPTOMS, medicalInfo)
          const locationIDs = this.getLocationIDs(stages.ADDITIONAL_SYMPTOMS, medicalInfo)
          const noneOptionIndex = locationIDs.indexOf(noneOption.ID)
          if (noneOptionIndex > -1) {
            locationIDs.splice(noneOptionIndex,1)
          }
          const allLocationIDs = symptomLocationIDs.concat(locationIDs)
          return this.BASE_URL + "diagnosis" + this.DEFAULT_QUERY_PARAMS + "&symptoms=" + JSON.stringify(allLocationIDs) + "&gender=" + this.gender + "&year_of_birth=" + this.birthYear
        }
      }
    }

    return this.makeRequest(fullURL())
  }

  getLocationID(stage, medicalInfo) {
    return medicalInfo[stage].selected[0]
  }

  getLocationIDs(stage, medicalInfo) {
    return medicalInfo[stage].selected
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

