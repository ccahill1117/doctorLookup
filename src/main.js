import { Doctor } from './doctor.js';
import { APICallIssue, APICallNames } from './call.js'
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import 'zipcodes'
const zipcodes = require('zipcodes');

$(document).ready(function() {
  const doctor = new Doctor

  $("#issueForm").submit(function(event) {
    event.preventDefault();
    const userIssue = $("#inputIssue").val();
    const userZip = $("#inputCity").val();
    const lookupZip = zipcodes.lookup(userZip);
    $(".resultDiv").empty();
    const drPromise = doctor.getDoctor(userIssue, lookupZip.latitude, lookupZip.longitude);
    APICallIssue(userIssue,lookupZip.latitude,lookupZip.longitude,drPromise);
  });

  $("#nameForm").submit(function(event) {
    event.preventDefault();
    const userFirstName = $("#inputDrFirst").val();
    const userLastName = $("#inputDrLast").val();
    const userZipNames = $("#inputCity2").val();
    const lookupZipNames = zipcodes.lookup(userZipNames);
    $(".resultDiv").empty();
    const drPromise = doctor.getDoctorNames(userFirstName,userLastName,lookupZipNames.latitude,lookupZipNames.longitude);
    APICallNames(userFirstName,userLastName,lookupZipNames.latitude,lookupZipNames.longitude,drPromise);
  });
});
