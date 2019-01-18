import { Doctor } from './doctor.js';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import 'zipcodes'
const zipcodes = require('zipcodes');

$(document).ready(function() {

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


  });

});
