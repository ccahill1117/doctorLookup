import { Doctor } from './doctor.js';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import 'zipcodes'
const zipcodes = require('zipcodes');

$(document).ready(function() {

  const doctor = new Doctor

  const zipObj = zipcodes.random();
  console.log(zipObj);

  $("#issueForm").submit(function(event) {
    event.preventDefault();
    const userIssue = $("#inputIssue").val();
    const userZip = $("#inputCity").val();
    const lookupZip = zipcodes.lookup(userZip);
    $(".resultDiv").empty();

    console.log(userIssue);
    console.log(userZip);
    console.log(lookupZip.city, lookupZip.latitude, lookupZip.longitude);
    APICallIssue(userIssue,lookupZip.latitude,lookupZip.longitude);

  });

  function APICallIssue(issue,lat,long) {
    let promise = doctor.getDoctor(issue, lat, long);
    promise.then(function(response) {
      let body = JSON.parse(response);
      console.log(body);
      if (body.data.length == 0) {
        $(".resultDiv").text("no doctors fit that criteria")
      }
      else {
        body.data.forEach(function(element) {
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
          $(".resultDiv").append(`<div class="accordion" id="accordionExample">
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
                                        </div>
                                      </div>`
            )
        })
      }
    },
    function(error) {
      $('.resultDiv').text(`There was an error processing your request`);
    });
  }
});
