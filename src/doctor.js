export class Doctor {
  constructor(name) {
  this.name = name;


  }

  getDoctor(issue, zip) {
    return new Promise(function(resolve, reject) {
    let request = new XMLHttpRequest();
    let url = `https://api.betterdoctor.com/2016-03-01/doctors?query=${issue}&location=37.773%2C-122.413%2C100&user_location=37.773%2C-122.413&skip=0&limit=10&user_key=b8530b43e3865b1ffb5d8829ff843736`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }
      request.open("GET", url, true);
      request.send();
    });
  }

}
