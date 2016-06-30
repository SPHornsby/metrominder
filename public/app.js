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
var getRouteOnly = function getRouteOnly(query) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", query);
  xhr.setRequestHeader("Content-type", "text/html");
  xhr.send();
  xhr.addEventListener("load", function() {
    console.log(xhr.responseText);
    if (xhr.responseText) {

    //  buildAll(JSON.parse(xhr.responseText));
    } else {
      console.log("No response");
    }
  });
};
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
// document.getElementById('search-input').addEventListener('keypress', function(e) {
//   if (e.charCode === 13) {
//     e.preventDefault();
//     var query = "route=outbound";
//     getRouteOnly(query);
//     console.log("Enter");
//   }
// });
// $(".type-search").on("click", function(e) {
//   var route;
//   var station = e.target.form[4].value;
//   if (e.target.form[0].checked === true) {
//     route = "inbound";
//   } else {
//     route = "outbound";
//   }
//   var query = `/route?route=${route}`;
//   if (station !== "None") {
//     query = query+`&station=${station}`;
//   }
//   getRouteOnly(query);
// });
$(".train-search").on("click", function(e) {
  var form = e.target.form;
  console.log(`first: ${form[0].value} second: ${form[1].value} third: ${form[2].value}`);
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
  console.log(query);
  getRouteOnly(query);
});
window.onload = function(){
  initialResults();
};
