var buildTrainResult = function(resultObject) {
  var jBlock = $("<div>")
    .addClass("row station-row zero-margin")
    .attr("data-station", resultObject.station);

  var jTrain = $("<div>")
    .addClass("col-xs-2 station-col").
    text(resultObject.train);
  var jStation = $("<div>")
    .addClass("col-xs-5 col-sm-3 station-col")
    .text(resultObject.station);
  var jTime = $("<div>")
    .addClass("hidden-xs col-sm-3 station-col")
    .text(resultObject.time);
  var jActual = $("<div>")
    .addClass("col-xs-2 station-col")
    .text(resultObject.actualTime);
  var jStatus = $("<div>")
    .addClass("col-xs-2 station-col delay-col")
    .text(resultObject.status);
  if (resultObject.status > 0 ) {
    jStatus.addClass("late");
  }
  jBlock.append(jTrain, jStation, jTime, jActual, jStatus);
  $(".results").append(jBlock);
};
var buildAll = function(fullObject) {
  $(".results").empty();
  if (fullObject.length === 0) {
    $(".results").append($("<div>").text("No Results - All trains meeting your search have stopped running for the day."));
  }
  fullObject.forEach(function(item) {
    buildTrainResult(item);
  });
};
var createDirectionRow = function(row) {
  var station = $(row).attr("data-station");
  var timeAtStation = row.childNodes[3].textContent;
  //TODO start caching api calls, at least for a few minutes.
  getLatLong(station, function() {
    //$(row).toggleClass("selected");
    $(".map-row").remove();
    $(".direction-row").remove();
    var containerRow = $("<div>").addClass("col-xs-10 col-xs-offset-1");
    // var mapRow = $("<div>").addClass("row map-row");
    var directionRow = $("<div>").addClass("row direction-row");
    // var map = $("<img>").addClass("map")
    //   .attr("src", `https://maps.googleapis.com/maps/api/staticmap?center=${response}&zoom=16&size=300x300&sensor=false`);
    var directionContents = $("<div>").addClass(" col-xs-10 col-xs-offset-1");

    var directionForm = $("<form>").addClass("form col-xs-12");
    var directionInput = $("<input>").addClass("form-control col-xs-10")
      .attr("placeholder", "4590 MacArthur Blvd, Newport Beach, CA 92660")
      .attr("width", "150")
      .val("4590 MacArthur Blvd, Newport Beach, CA 92660");
    // var directionSelect = $("<select>").addClass("form-control");
    // var directionOption = $("<option>").text("Fake Location")
    var directionButton = $("<button>").addClass("btn btn-info direction-button")
      .text("Will I Make It?")
      .attr("data-station", station)
      .attr("data-time", timeAtStation);
    $(directionForm).append(directionInput, directionButton);
    //$(directionSelect).append(directionOption);
    $(directionContents).append(directionForm);
    $(directionRow).append(directionContents);
    //$(mapRow).append(map);
    //$(containerRow).append(mapRow, directionRow);
    $(containerRow).append(directionRow);
    $(row).append(containerRow);
  });


};
var reportResults = function(resultObject, originString, timeAtStation) {
  console.log(resultObject);
  var row = $(".direction-row");
  $(row).empty();
  var now = moment();
  var nowObject = now.toObject();
  if (nowObject.minutes <= 9) {
    nowObject.minutes = "0" + nowObject.minutes;
  }
  var todayMonth = padDates(nowObject.months+1);
  var todayDay = padDates(nowObject.date);
  var todayDate = `${nowObject.years}-${todayMonth}-${todayDay}`;
  var arrivalTime = todayDate + " " + timeAtStation;
  var then = now.add(parseInt(resultObject.duration, 10), "m");

  var thenObject = then.toObject();

  if (thenObject.minutes <= 9) {
    thenObject.minutes = "0" + thenObject.minutes;
  }
  var result=$("<span>");

  if (then.isBefore(arrivalTime)) {
    result.text("You will make it.");
    row.addClass("safe");
  } else {
    result.text("You will not make it.");
    row.addClass("too-late");
  }
  $("<div>").addClass("visible-xs-block col-xs-8 xol-xs-offset-2")
    .text("")
    .append(result);
  var results = $("<div>").addClass("hidden-xs col-xs-8 col-xs-offset-2")
    .text(`The time is now ${nowObject.hours}:${nowObject.minutes}.
      It is a ${resultObject.duration} minute drive to get to the station.
      You will arrive at this station at ${thenObject.hours}:${thenObject.minutes}.
      The train arrives to this station at ${timeAtStation}. `);
  if (parseInt(resultObject.duration, 10) > 720) {
    $(results).text("You are more than 12 hours away from the station.");
  }
  $(row).append(result, results);
};
var padDates = function(datePiece) {
  var stringPiece = datePiece.toString(10);

  if (stringPiece.length === 1) {
    stringPiece = "0".concat(stringPiece);
  }
  return stringPiece;
};
var getMyLocation = function() {
  if (!navigator.geolocation) {
    console.log("Geolocation not supported");
    return;
  }
  function success(position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    var location = `${lat},${long}`;
    console.log(location);
  }
  function error() {
    console.log("error");
  }
  navigator.geolocation.getCurrentPosition(success, error);
  console.log("locating...");
};
var getLatLong = function(station, callback) {
  var query = `station=${station}`;
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "/maps/station?"+query);
  xhr.send();
  xhr.addEventListener("load", function() {
    if (xhr.responseText) {
      var response = JSON.parse(xhr.responseText)[0].latLong;
      callback(response);

    } else {
      console.log("No response");
    }
  });
};
var getResults = function(destination, originString, timeAtStation) {

  var origin = originString.split(" ").join("+");
  //var query = "origin=33.668506,-117.8657897&destination=33.7082557,-117.8181739";
  var query = `origin=${origin}&destination=${destination}`;
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "/maps?" + query);
  xhr.send();
  xhr.addEventListener("load", function() {
    if (xhr.responseText) {

      reportResults(JSON.parse(xhr.responseText), originString, timeAtStation);
    } else {
      console.log("No results");
    }
  });
};
var display = function getRouteOnly(query) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", query);
  xhr.setRequestHeader("Content-type", "text/html");
  xhr.send();
  xhr.addEventListener("load", function() {

    if (xhr.responseText) {
      buildAll(JSON.parse(xhr.responseText));
    } else {
      console.log("No response");
    }
  });
};
// var initialResults = function() {
//   var xhr= new XMLHttpRequest();
//   xhr.open("GET", "/search");
//   xhr.send();
//   xhr.addEventListener("load", function() {
//     if (xhr.responseText) {
//       var response = JSON.parse(xhr.responseText);
//       buildAll(response);
//     } else {
//       console.log("No response");
//     }
//   });
// };
var getTrains = function(query, callback) {

  var xhr = new XMLHttpRequest();
  xhr.open("GET", query);

  xhr.setRequestHeader("Content-type", "text/html");
  xhr.send();
  xhr.addEventListener("load", function() {
    if (xhr.responseText) {
      var parsed = JSON.parse(xhr.responseText);

      if (parsed.length > 0) {
        callback(JSON.parse(xhr.responseText));
      } else {
        console.log("Empty response");
      }
    } else {
      console.log("No response");
    }
  });
};
var trainsSelector = function(trainOptions) {
  var options = ["<option>None</option>"];
  var selector = $("#trains");
  trainOptions.forEach(function(train) {
    //train.train
    options.push(`<option>${train.train}</option>`);
  });
  selector.empty().append(options.join(""));
};

var stationsSelector = function(stationOptions) {
  var options = ["<option>None</option>"];
  var selector = $("#stations");
  stationOptions.forEach(function(station) {
    options.push(`<option>${station.station}</option>`);
  });
  selector.empty().append(options.join(""));
};
$(".train-search").on("click", function(e) {
  var form = e.target.form;
  var route = form[0].value;
  var train = form[1].value;
  var station = form[2].value;
  var query = "/search?";
  if (route !== "None") {
    if (query.slice(-1) !== "?") {
      query = query +"&";
    }
    query = query + `route=${route}`;
  }
  if (train !== "None") {
    if (query.slice(-1) !== "?") {
      query = query +"&";
    }
    query = query + `train=${train}`;
  }
  if (station !== "None") {
    if (query.slice(-1) !== "?") {
      query = query +"&";
    }
    query = query + `station=${station}`;
  }
  display(query);
  $(".search-area").slideUp(200);
  $(".search-bar").slideDown(200);
  $(".results-header").show();
});
$("#route").on("change", function(e) {
  var route = e.target.value;
  var query = `/train?route=${route}`;
  getTrains(query, trainsSelector);
});
$("#trains").on("change", function(e) {
  var train = e.target.value;
  var query = `/search?train=${train}`;
  getTrains(query, stationsSelector);
});
$("#show-search").on("click", function() {
  //$(".search-bar").toggleClass("hidden");
  //$(".search-area").toggleClass("hidden");
  $(".search-area").slideDown(200);
  $(".search-bar").slideUp(200);
  $(".welcome").hide();
});
$(".search-close").on("click", function() {
  // $(".search-bar").toggleClass("hidden");
  // $(".search-area").toggleClass("hidden");
  $(".search-area").slideUp(200);
  $(".search-bar").slideDown(200);
});
$(".results").on("click", ".station-col", function(e) {
  var row = e.target.parentNode;
  createDirectionRow(row);
});
$(".results").on("click", ".direction-button", function(e) {
  e.preventDefault();
  var station = e.target.attributes["data-station"].value;
  var timeAtStation = e.target.attributes["data-time"].value;
  //var originString = "33.8989121,-117.9914261";
  var originString = e.target.form[0].value;
  getLatLong(station, function(response) {
    getResults(response, originString, timeAtStation);
  });
});
$(".geolocate").on("click", function() {
  getMyLocation();
});
$(function(){
  getTrains("/search?route=None", trainsSelector);
  $(".search-area").hide();
  $(".results-header").hide();
  //initialResults();
  //getMyLocation();
  //initMap();
});
