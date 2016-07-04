
function time() {
  var convert = function(time){
    if (typeof time === "number") {

      var rawSeconds = time / 1000;
      var hours = Math.floor(rawSeconds/3600);
      var minutes = Math.floor((rawSeconds%3600)/60);
      var seconds = ((rawSeconds%3600)%60);
      var timeObject =  {hours: hours, minutes: minutes, seconds: seconds};
      return timeObject;
    } else if ( typeof time === "object") {

      return ((time.hours * 3600) + (time.minutes * 60) + time.seconds) * 1000;
    } else {
      console.log("Time is an invalid format");
    }
  };
  var add = function(time, adder) {

    if (typeof time !== "number") {
      time = convert(time);
    }
    var newTime = time+adder;
    var newTimeObject = convert(newTime);
  
    return newTimeObject;
  };
  var hasTime = function(item) {

    if (typeof item === "object") {
      var minutes = item.minutes.toString(10);
      if (minutes.length ===1) {
        minutes = "0" + minutes;
      }
      var time = `${item.hours}:${minutes}`;
    } else {
      time = "No Stop";
    }
    return time;
  };
  return {
    convert: convert,
    add: add,
    hasTime: hasTime
  };
}

module.exports = time();
