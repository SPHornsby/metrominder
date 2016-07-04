var buildTrainResult = function(resultObject) {
  var jBlock = $("<div>").addClass("row station-row").attr("data-station", resultObject.station);

  var jTrain = $("<div>").addClass("col-xs-2 station-col").text(resultObject.train);
  var jStation = $("<div>").addClass("col-xs-3 station-col").text(resultObject.station);
  var jTime = $("<div>").addClass("col-xs-3 station-col").text(resultObject.time);
  var jActual = $("<div>").addClass("col-xs-2 station-col").text(resultObject.actualTime);
  var jStatus = $("<div>").addClass("col-xs-2 station-col").text(resultObject.status);
  if (resultObject.status > 0 ) {
    jStatus.addClass("late");
  }
  jBlock.append(jTrain, jStation, jTime, jActual, jStatus);
  $(".results").append(jBlock);
};
var buildAll = function(fullObject) {
  $(".results").empty();
  fullObject.forEach(function(item) {
    buildTrainResult(item);
  });
};
var createDirectionRow = function(row) {
  var station = $(row).attr("data-station");

  //TODO start caching api calls, at least for a few minutes.
  var latLong = getLatLong(station, function(response) {
    $(".map-row").remove();
    $(".direction-row").remove();
    var containerRow = $("<div>").addClass("col-xs-10 col-xs-offset-1");
    var mapRow = $("<div>").addClass("row map-row");
    var directionRow = $("<div>").addClass("row direction-row");
    var map = $("<img>").addClass("map").attr("src", `https://maps.googleapis.com/maps/api/staticmap?center=${response}&zoom=16&size=300x300&sensor=false`);
    var directionContents = $("<div>").addClass(" col-xs-8 col-xs-offset-2");

    var directionForm = $("<form>").addClass("form col-xs-8 col-xs-offset-2")
    var directionInput = $("<input>").addClass("form-control").attr("placeholder", "Enter Address Here");
    // var directionSelect = $("<select>").addClass("form-control");
    // var directionOption = $("<option>").text("Fake Location")
    var directionButton = $("<button>").addClass("btn btn-default direction-button").text("Will I Make It?").attr("data-station", station);
    $(directionForm).append(directionInput, directionButton);
    //$(directionSelect).append(directionOption);
    $(directionContents).append(directionForm);
    $(directionRow).append(directionContents);
    $(mapRow).append(map);
    $(containerRow).append(mapRow, directionRow);
    $(row).append(containerRow);
  });


};
var reportResults = function(resultObject, originString) {
  var row = $(".direction-row");
  $(row).empty();

  var results = $("<div>").addClass("col-xs-8 col-xs-offset-2").text(`It will take you ${resultObject.duration} minutes to get from ${originString} to the station.`);
  $(row).append(results);
};
var getMyLocation = function() {
  if (!navigator.geolocation) {
    console.log("Geolocation not supported");
    return;
  }

  function success(position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;

    console.log(`${lat},${long}`);
  };
  function error() {
    console.log("error");
  };

  navigator.geolocation.getCurrentPosition(success, error);
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
  })
};
var getResults = function(destination, originString) {
  console.log(destination, originString);
  var origin = originString.split(" ").join("+");
  //var query = "origin=33.668506,-117.8657897&destination=33.7082557,-117.8181739";
  var query = `origin=${origin}&destination=${destination}`;
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "/maps?" + query)
  xhr.send();
  xhr.addEventListener("load", function() {
    if (xhr.responseText) {
      reportResults(JSON.parse(xhr.responseText), originString);
    } else {
      console.log("No results");
    }
  });
}
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
var initialResults = function() {
  var xhr= new XMLHttpRequest();
  xhr.open("GET", "/search");
  xhr.send();
  xhr.addEventListener("load", function() {
    if (xhr.responseText) {
      var response = JSON.parse(xhr.responseText);
      buildAll(response);
    } else {
      console.log("No response");
    }
  });
};
var getTrains = function(query) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", query);
  xhr.setRequestHeader("Content-type", "text/html");
  xhr.send();
  xhr.addEventListener("load", function() {
    if (xhr.responseText) {
      var parsed = JSON.parse(xhr.responseText);
      if (parsed.length > 0) {
        trainsSelector(JSON.parse(xhr.responseText));
      } else {
        getTrains("/train?route=all");
      }
    } else {
      console.log("No response");
    }
  });
};
var trainsSelector = function(trainOptions) {
  var options = ["<option>None</option>"];
  var selector = $("#trains");
  // if (trainOptions.length === 0) {
  //   trainOptions = getTrains("/train?route=all");
  // }
  trainOptions.forEach(function(train) {
    options.push(`<option>${train}</option>`);
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
  // $(".search-bar").toggleClass("hidden");
  // $(".search-area").toggleClass("hidden");
  $(".search-area").slideUp(200);
  $(".search-bar").slideDown(200);
});
$("#route").on("change", function(e) {
  var route = e.target.value;
  var query = `/train?route=${route}`;
  getTrains(query);
});
$("#show-search").on("click", function() {
  //$(".search-bar").toggleClass("hidden");
  //$(".search-area").toggleClass("hidden");
  $(".search-area").slideDown(200);
  $(".search-bar").slideUp(200);
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
  console.log(e.target.form[0].value);
  //var originString = "33.8989121,-117.9914261";
  var originString = e.target.form[0].value;
  console.log(station);
  console.log(originString);
  var destination = getLatLong(station, function(response) {

    getResults(response, originString);
  });

});
$(".geolocate").on("click", function() {
  getMyLocation();
});
$(function(){
  getTrains("/train?route=all");
  $(".search-area").hide();
  initialResults();
});
