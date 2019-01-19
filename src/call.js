import { Map } from './map.js';
import $ from 'jquery';
const loadGoogleMapsApi = require('load-google-maps-api')

export function APICallIssue(issue,lat,long,drPromise) {
  let promise = drPromise;
  promise.then(function(response) {
    let body = JSON.parse(response);
    if (body.data.length == 0) {
      $(".resultDiv").text("no doctors fit that criteria");
    }
    else {
      let mapDivCounter = 0;
      body.data.forEach(function(element) {
        mapDivCounter = mapDivCounter + 1;
        let acceptingValue = element.practices[0].accepts_new_patients
        function returnYesNo(value) {
          let result;
          if (value == true) {
            result = "Yes"
          }
          else {result = "No"}
          return result
        }
        const acceptNewPatients = returnYesNo(acceptingValue);
        $(".resultDiv").append(`
          <div class="accordion" id="accordionExample">
            <div class="card">
              <div class="card-header" id="headingOne">
              <h5 class="mb-0">
                <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                ${element.profile.last_name}, ${element.profile.first_name}, ${element.profile.title}
                </button>
              </h5>
            </div>
          <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
          <div class="card-body">
            <img src="${element.profile.image_url}">
              <br>
            ${element.profile.bio}
              <br>
            Phone Number - ${element.practices[0].phones[0].number}
              <br>
            Address - ${element.practices[0].name} ${element.practices[0].visit_address.city}, ${element.practices[0].visit_address.state_long} ${element.practices[0].visit_address.street} ${element.practices[0].visit_address.zip}
              <br>
            Accepting New Patients - ${acceptNewPatients}
            <div id='map${mapDivCounter}'><div>
            </div>
          </div>`
        );
        let mapElement = document.getElementById(`map${mapDivCounter}`);
        let loadPromise = Map.loadMap();
        loadPromise.then(function(googleMaps) {
          let map = Map.createMap(googleMaps, mapElement, element.practices[0].visit_address.lat, element.practices[0].visit_address.lon);
        });
      })
    }
  },
  function(error) {
    $('.resultDiv').text(`There was an error processing your request. Error is ${error}`);
  });
}

export function APICallNames(firstName,lastName,lat,long,drPromise) {
  let promise = drPromise;
  promise.then(function(response) {
    let body = JSON.parse(response);
    console.log(body);
    if (body.data.length == 0) {
      $(".resultDiv").text("no doctors fit that criteria")
    }
    else {
      let mapDivCounter = 0;
      body.data.forEach(function(element) {
        mapDivCounter = mapDivCounter + 1;
        let acceptingValue = element.practices[0].accepts_new_patients
        function returnYesNo(value) {
          let result;
          if (value == true) {
            result = "Yes"
          }
          else {result = "No"}
          return result
        }
        const acceptNewPatients = returnYesNo(acceptingValue);
        $(".resultDiv").append(`
          <div class="accordion" id="accordionExample">
            <div class="card">
              <div class="card-header" id="headingOne">
              <h5 class="mb-0">
                <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                ${element.profile.last_name}, ${element.profile.first_name}, ${element.profile.title}
                </button>
              </h5>
            </div>
          <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
          <div class="card-body">
            <img src="${element.profile.image_url}">
              <br>
            ${element.profile.bio}
              <br>
            Phone Number - ${element.practices[0].phones[0].number}
              <br>
            Address - ${element.practices[0].name} ${element.practices[0].visit_address.city}, ${element.practices[0].visit_address.state_long} ${element.practices[0].visit_address.street} ${element.practices[0].visit_address.zip}
              <br>
            Accepting New Patients - ${acceptNewPatients}
            <div id='map${mapDivCounter}'><div>
            </div>
          </div>`
        )
      })
    }
  },
  function(error) {
    $('.resultDiv').text(`There was an error processing your request. Error is ${error}`);
  });
}
