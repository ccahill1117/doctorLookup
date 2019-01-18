import { Doctor } from './doctor.js';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import 'zipcodes'


$(document).ready(function() {

  const zipcodes = require('zipcodes');
  const zipObj = zipcodes.random();
  console.log(zipObj);


  $("#inputForm").submit(function(event){
    event.preventDefault();

    const updateDisplay = setInterval(() => {

    },300)





  });

});
