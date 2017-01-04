'use strict';

// Cache our fields
var apiUri = 'http://localhost:8000/api';

var xhr;
var $evangelists;
var $name;
var $location;

$(document).ready(function() {
  // Cache our fields
  xhr = new XMLHttpRequest();
  $evangelists = $('#evangelists');
  $name = $('#name');
  $location = $('#location');

  // Query for our data
  restGet();
});

// Add a new evanlist on submit
$('#btn-add-evangelist').on('click', function() {
  var evangelist = {
    name: $name.val(),
    location: $location.val(),
  };

  restPost(evangelist);
});

// GET data from the server
function restGet() {
  $.ajax({
    url: apiUri + '/evangelist',
    type: 'GET',
    datatype: 'json',

    success: function(data) {
      var len = data.length;
      for (var index = 0; index < len; index++) {
        $evangelists.append('<li>Name: ' + data[index].name + ',&nbsp;&nbsp;' + ' Location: ' + data[index].location + '</li>');
      }
    },
    error: function(e) {
      alert('Failed!');
    },
  });
}

// POST new data to server
function restPost(evangelist) {
  $.ajax({
    url: apiUri + '/evangelist',
    type: 'POST',
    datatype: 'json',
    data: evangelist,

    success: function(data) {
      $evangelists.append('<li>Name: ' + evangelist.name + ',&nbsp;&nbsp;' + ' Location: ' + evangelist.location + '</li>');
    },

    error: function(e) {
      alert('Failed!');
    },
  });
}