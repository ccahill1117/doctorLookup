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

    console.log(userIssue);
    console.log(userZip);
    console.log(lookupZip.city, lookupZip.latitude, lookupZip.longitude);
    APICall(userIssue,lookupZip.latitude,lookupZip.longitude);

  });

  function APICall(issue,lat,long) {
    let promise = doctor.getDoctor(issue, lat, long);      
    promise.then(function(response) {
      let body = JSON.parse(response);
      console.log(body);
    },
    function(error) {
      $('#errorDiv').text(`There was an error processing your request`);
    });
  }
});
