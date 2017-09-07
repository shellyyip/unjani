import { store, actionTypes, stages } from './unjaniRedux'

export default class Requester {
  BASE_URL = "https://sandbox-healthservice.priaid.ch/"
  DEFAULT_QUERY_PARAMS = "?language=en-gb&format=json&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImNocmlzdGluYS52LnN0ZXdhcnRAZ21haWwuY29tIiwicm9sZSI6IlVzZXIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiIxNTUyIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy92ZXJzaW9uIjoiMjAwIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9saW1pdCI6Ijk5OTk5OTk5OSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbWVtYmVyc2hpcCI6IlByZW1pdW0iLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL2xhbmd1YWdlIjoiZW4tZ2IiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL2V4cGlyYXRpb24iOiIyMDk5LTEyLTMxIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9tZW1iZXJzaGlwc3RhcnQiOiIyMDE3LTA0LTI1IiwiaXNzIjoiaHR0cHM6Ly9zYW5kYm94LWF1dGhzZXJ2aWNlLnByaWFpZC5jaCIsImF1ZCI6Imh0dHBzOi8vaGVhbHRoc2VydmljZS5wcmlhaWQuY2giLCJleHAiOjE1MDQ3ODcwNTcsIm5iZiI6MTUwNDc3OTg1N30.9MopGEg2M7UcTuEExnu_ptjocppskTZvvlHJ0Lh7qP8"

  constructor(gender, birthYear) {
    this.gender = gender;
    this.birthYear = birthYear;  
  }

  get() {
    const {stage, medicalInfo} = store.getState()

    switch (stage) {
      case stages.BODY_LOCATION: {
        const locationID = medicalInfo[stages.BODY_LOCATION].selected[0]
        const fullURL = this.BASE_URL + "body/locations/" + locationID + this.DEFAULT_QUERY_PARAMS
        return fullURL
      }
    }

    return "something happened"
  }
}

