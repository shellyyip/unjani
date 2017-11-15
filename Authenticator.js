import CryptoJS from 'crypto-js'

export default class Authenticator {
  BASE_URL = "https://sandbox-authservice.priaid.ch/login"
  API_KEY = "christina.v.stewart@gmail.com"
  SECRET_KEY = "i8QRs56Dfw7WAq32Y"

  constructor() {
    this.computedHash = CryptoJS.HmacMD5(this.BASE_URL, this.SECRET_KEY);
    this.computedHashString = this.computedHash.toString(CryptoJS.enc.Base64);
  }

  call() {
    let bearer = this.API_KEY + ":" + this.computedHashString
    let request = new XMLHttpRequest();
    var that = this 
    request.onreadystatechange = (e) => {
      if (request.readyState !== 4) {
        return;
      }

      if (request.status === 200) {
        const result = request.responseText;
        const parsedResult = JSON.parse(result)
        console.log("THAT" + that.constructor)
        that.authToken = parsedResult["Token"]
      } else {
        console.log('error');
      }
    }
    request.open('POST', this.BASE_URL)
    request.setRequestHeader('Authorization', 'Bearer ' + bearer);
    request.send()
  }

  get token() {
    console.log("IN GET" + this.authToken)
    return this.authToken
  }
}
