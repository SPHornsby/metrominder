// var buildWholeSchedule = function(wholeLine) {
//   wholeLine.map(function(train) {
//     return {train: train.train, name: train.stops[0].name, time: time, status: status};
//   });
// };


var buildTrainResult = function(resultObject) {
  var parent = document.getElementsByClassName("results")[0];

  var block = document.createElement("div");
  block.setAttribute("class", "row");
  block.style["border-bottom"] = "5px";
  var train = document.createElement("div");
  train.setAttribute("class", "col-xs-2");
  train.textContent = resultObject.train;
  var station = document.createElement("div");
  station.setAttribute("class", "col-xs-4");
  station.textContent = resultObject.name;
  var time = document.createElement("div");
  time.setAttribute("class", "col-xs-3");
  time.textContent = resultObject.time;
  var status = document.createElement("div");
  status.setAttribute("class", "col-xs-3");
  status.textContent = resultObject.status;
  block.appendChild(train);
  block.appendChild(station);
  block.appendChild(time);
  block.appendChild(status);
  parent.appendChild(block);
};
var buildAll = function(fullObject) {
  clear(document.getElementsByClassName("results")[0]);
  fullObject.forEach(function(item) {
    item.forEach(function(nestedItem) {
      buildTrainResult(nestedItem);
    });

  });
};
function clear(element){
  while (element.firstChild){
    element.removeChild(element.firstChild);
  }
}
//buildTrainResult({train: 682, variance: 10000});
// var testArr = [{train: 682, variance: 100000},{train: 681, variance: 0},{train: 600, variance: 700000},{train: 601, variance: 5000}]
// buildAll(testArr);
var getRouteOnly = function getRouteOnly(query) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "/route?" + query);
  xhr.setRequestHeader("Content-type", "text/html");
  xhr.send();
  xhr.addEventListener("load", function() {
    if (xhr.responseText) {
      buildAll(JSON.parse(xhr.responseText));
    } else {
      console.log("No response");
    }
  });
}
var initialResults = function() {
  var xhr= new XMLHttpRequest();
  xhr.open("GET", "/route/all");
  xhr.send();
  xhr.addEventListener("load", function() {
    if (xhr.responseText) {
      var response = [JSON.parse(xhr.responseText)];
      buildAll(response);
    } else {
      console.log("No response");
    }
  });
};
document.getElementById('search-input').addEventListener('keypress', function(e) {
  if (e.charCode === 13) {
    e.preventDefault();
    var query = "route=outbound";
    getRouteOnly(query);
    console.log("Enter");
  }
})
window.onload = function(){
  initialResults();
};
