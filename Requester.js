import { store, actionTypes, stages, noneOption } from './unjaniRedux'
import moment from 'moment'
import Authenticator from './Authenticator'

export default class Requester {
  BASE_URL = "https://sandbox-healthservice.priaid.ch/"

  constructor(gender, birthYear, token) {
    this.gender = gender;
    this.birthYear = birthYear; 
    this.token = token;
  }

  defaultQueryParams() {
    return "?language=en-gb&format=json&token=" + this.token
  }

  get() {
    const {stage, medicalInfo} = store.getState();

    const fullURL = () => {
      switch (stage) {
        case stages.BODY_LOCATION: {
          const locationID = this.getLocationID(stages.BODY_LOCATION, medicalInfo)
          return this.BASE_URL + "body/locations/" + locationID + this.defaultQueryParams()
        }
        case stages.BODY_SUBLOCATION: {
          const locationID = this.getLocationID(stages.BODY_SUBLOCATION, medicalInfo)
          const selectorStatus = this.getSelectorStatus()
          return this.BASE_URL + "symptoms/" + locationID + "/" + selectorStatus + this.defaultQueryParams()
         }
        case stages.SUBLOCATION_SYMPTOMS: {
          const locationIDs = this.getLocationIDs(stages.SUBLOCATION_SYMPTOMS, medicalInfo)
          return this.BASE_URL + "symptoms/proposed" + this.defaultQueryParams() + "&symptoms=" + JSON.stringify(locationIDs) + "&gender=" + this.gender + "&year_of_birth=" + this.birthYear 
        }
        case stages.ADDITIONAL_SYMPTOMS: {
          const symptomLocationIDs = this.getLocationIDs(stages.SUBLOCATION_SYMPTOMS, medicalInfo)
          const locationIDs = this.getLocationIDs(stages.ADDITIONAL_SYMPTOMS, medicalInfo)
          const noneOptionIndex = locationIDs.indexOf(noneOption.ID)
          if (noneOptionIndex > -1) {
            locationIDs.splice(noneOptionIndex,1)
          }
          const allLocationIDs = symptomLocationIDs.concat(locationIDs)
          return this.BASE_URL + "diagnosis" + this.defaultQueryParams() + "&symptoms=" + JSON.stringify(allLocationIDs) + "&gender=" + this.gender + "&year_of_birth=" + this.birthYear
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
        console.log(request.status);
        console.log(request.responseText());
      }
    }

    request.open('GET', url)
    request.send()
  }
}

