var buildTrainResult = function(result) {
  var jBlock = $("<div>")
    .addClass("row station-row zero-margin")
    .attr("data-station", result.station)
    .attr("data-arrival", result.actualTime);
  var jTrain = $("<div>")
    .addClass("col-xs-2 station-col").
    text(result.train);
  var jStation = $("<div>")
    .addClass("col-xs-5 col-sm-3 station-col")
    .text(result.station);
  var jTime = $("<div>")
    .addClass("hidden-xs col-sm-3 station-col")
    .text( moment(result.time).format("h:mm") );
  if (result.time.hours > 12) {
    $(jTime).addClass("bold");
  }
  var momentActual = moment(result.actualTime);
  var actualObject = momentActual.toObject();
  var jActual = $("<div>")
    .addClass("col-xs-2 station-col")
    .text(momentActual.format("h:mm"));
  if (actualObject.hours > 12) {
    $(jActual).addClass("bold");
  }
  var jStatus = $("<div>")
    .addClass("col-xs-2 station-col delay-col")
    .text(result.status);
  if (result.status > 0 ) {
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
  var arrival = $(row).attr("data-arrival");
  //var timeAtStation = row.childNodes[3].textContent;
  getLatLong(station, function() {
    $(".map-row").remove();
    $(".direction-row").remove();
    var containerRow = $("<div>").addClass("col-xs-10 col-xs-offset-1");
    var directionRow = $("<div>").addClass("row direction-row");
    var directionContents = $("<div>").addClass(" col-xs-10 col-xs-offset-1");
    var directionForm = $("<form>").addClass("form col-xs-12");
    var directionInput = $("<input>").addClass("form-control col-xs-10")
      .attr("placeholder", "4590 MacArthur Blvd, Newport Beach, CA 92660")
      .attr("width", "150")
      .val("4590 MacArthur Blvd, Newport Beach, CA 92660");
    var directionButton = $("<button>").addClass("btn btn-info direction-button")
      .text("Will I Make It?")
      .attr("data-station", station)
      .attr("data-time", arrival);
    $(directionForm).append(directionInput, directionButton);
    $(directionContents).append(directionForm);
    $(directionRow).append(directionContents);
    $(containerRow).append(directionRow);
    $(row).append(containerRow);
  });
};

var reportResults = function(result, timeAtStation) {
  var row = $(".direction-row");
  $(row).empty();
  var now = moment();
  var nowObject = now.toObject();
  if (nowObject.minutes <= 9) {
    nowObject.minutes = "0" + nowObject.minutes;
  }
  var todayMonth = padDate(nowObject.months+1);
  var todayDay = padDate(nowObject.date);
  var todayDate = `${nowObject.years}-${todayMonth}-${todayDay}`;
  var arrivalTime = moment(timeAtStation).format("h:mm a");
  var then = moment().add(parseInt(result.duration, 10), "m");
  var thenObject = then.toObject();
  if (thenObject.minutes <= 9) {
    thenObject.minutes = "0" + thenObject.minutes;
  }
  var theResult=$("<span>");
  if (then.isBefore(timeAtStation)) {
    theResult.text("You will make it.");
    row.addClass("safe");
  } else {
    theResult.text("You will not make it.");
    row.addClass("too-late");
  }
  $("<div>").addClass("visible-xs-block col-xs-8 xol-xs-offset-2")
    .text("")
    .append(theResult);
  var results = $("<div>").addClass("hidden-xs col-xs-8 col-xs-offset-2")
    .text(`The time is now ${now.format("h:mm a")}.
      It is a ${result.duration} minute drive to get to the station.
      You will arrive at this station at ${then.format("h:mm a")}.
      The train arrives to this station at ${arrivalTime}. `);
  if (parseInt(result.duration, 10) > 720) {
    $(results).text("You are more than 12 hours away from the station.");
  }
  $(row).append(theResult, results);
};

var padDate = function(date) {
  var dateString = date.toString(10);

  if (dateString.length === 1) {
    paddedDate = "0".concat(dateString);
  }
  return paddedDate;
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

var getResults = function(destination, origin, timeAtStation) {
  var arrival = moment(timeAtStation);
  var origin = origin.split(" ").join("+");
  var query = `origin=${origin}&destination=${destination}`;
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "/maps?" + query);
  xhr.send();
  xhr.addEventListener("load", function() {
    if (xhr.responseText) {
      reportResults(JSON.parse(xhr.responseText), origin, timeAtStation);
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
  var options = ["<option>All</option>"];
  var selector = $("#trains");
  trainOptions.forEach(function(train) {
    options.push(`<option>${train.train}</option>`);
  });
  selector.empty().append(options.join(""));
};

var stationsSelector = function(stationOptions) {
  var options = ["<option>All</option>"];
  var selector = $("#stations");
  stationOptions.forEach(function(station) {
    options.push(`<option>${station.station}</option>`);
  });
  selector.empty().append(options.join(""));
};

//Event Handlers
$(".train-search").on("click", function(e) {
  var form = e.target.form;
  var route = form[0].value;
  var train = form[1].value;
  var station = form[2].value;
  var query = "/search?";
  if (route !== "All") {
    if (query.slice(-1) !== "?") {
      query = query +"&";
    }
    query = query + `route=${route}`;
  }
  if (train !== "All") {
    if (query.slice(-1) !== "?") {
      query = query +"&";
    }
    query = query + `train=${train}`;
  }
  if (station !== "All") {
    if (query.slice(-1) !== "?") {
      query = query +"&";
    }
    query = query + `station=${station}`;
  }
  display(query);
  $(".search-area").slideUp(200);
  $(".search-bar").slideDown(200);
  $(".results-header, .results, .results-prompt").show();
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
  $(".search-area").slideDown(200);
  $(".search-bar").slideUp(200);
  $(".welcome, .results-prompt").hide();
});

$(".search-close").on("click", function() {
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
  var origin = (e.target.form[0].value).split(" ").join("+");
  getLatLong(station, function(response) {
    getResults(response, origin, timeAtStation);
  });
});

$(function(){
  getTrains("/search?route=All", trainsSelector);
  $(".search-area, .results-header, .results, .results-prompt").hide();
});
