var buildTrainResult = function(resultObject) {
  var jBlock = $("<div>").addClass("row");

  var jTrain = $("<div>").addClass("col-xs-2").text(resultObject.train);
  var jStation = $("<div>").addClass("col-xs-3").text(resultObject.station);
  var jTime = $("<div>").addClass("col-xs-3").text(resultObject.time);
  var jActual = $("<div>").addClass("col-xs-2").text(resultObject.actualTime);
  var jStatus = $("<div>").addClass("col-xs-2").text(resultObject.status);
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
$(function(){
  getTrains("/train?route=all");
  $(".search-area").hide();
  initialResults();
});
