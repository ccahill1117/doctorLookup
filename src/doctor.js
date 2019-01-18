export class Doctor {
  constructor() {
  }

  getDoctor(issue, lat, long) {
    return new Promise(function(resolve, reject) {
    let request = new XMLHttpRequest();
    let url = `https://api.betterdoctor.com/2016-03-01/doctors?query=${issue}&location=${lat}%2C${long}%2C50&user_location=${lat}%2C${long}&skip=0&limit=10&user_key=${process.env.exports.apiKey}`;
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

  getDoctorNames(firstName, lastName, lat, long) {
    return new Promise(function(resolve, reject) {
    let request = new XMLHttpRequest();
    let url = `https://api.betterdoctor.com/2016-03-01/doctors?first_name=${firstName}&last_name=${lastName}&location=${lat}%2C${long}%2C50&user_location=${lat}%2C${long}&skip=0&limit=10&user_key=${process.env.exports.apiKey}`;
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
