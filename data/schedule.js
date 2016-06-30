module.exports = {
  data: [
    {"train": 682, "route": "Southbound", "variance": 0,
      "stops":
      [
        {name:"LA", time: {hours: 6, minutes: 50, seconds: 0}},
        {name: "Commerce", time: "no_stop"},
        {name: "Norwalk/SFS", time: {hours: 7, minutes: 12, seconds: 0}},
        {name: "Buena Park", time: {hours: 7, minutes: 19, seconds: 0}},
        {name: "Fullerton", time: {hours: 7, minutes: 25, seconds: 0}},
        {name: "Anaheim", time: {hours: 7, minutes: 32, seconds: 0}},
        {name: "Orange", time: {hours: 7, minutes: 38, seconds: 0}},
        {name: "Santa Ana", time: {hours: 7, minutes: 44, seconds: 0}},
        {name: "Tustin", time: {hours: 7, minutes: 51, seconds: 0}},
        {name: "Irvine", time: {hours: 8, minutes: 0, seconds: 0}},
        {name: "Laguna Nigel", time: {hours: 8, minutes: 15, seconds: 0}},
        {name: "SJC", time: "no_stop"},
        {name: "San Clemente", time: "no_stop"},
        // {name: "San Clemente Pier", time: "no_stop"},
        {name: "Oceanside", time: "no-stop"}
      ]
    },
    {"train": 600, "route": "Northbound", "variance": 60000,
      "stops":
      [
        {name: "LA", time: {hours: 7, minutes: 58, seconds: 0}},
        {name: "Commerce", time: "no_stop"},
        {name: "Norwalk/SFS", time: {hours: 8, minutes: 20, seconds: 0}},
        {name: "Buena Park", time: {hours: 8, minutes: 27, seconds: 0}},
        {name: "Fullerton", time: {hours: 8, minutes: 33, seconds: 0}},
        {name: "Anaheim", time: {hours: 8, minutes: 40, seconds: 0}},
        {name: "Orange", time: {hours: 8, minutes: 45, seconds: 0}},
        {name: "Santa Ana", time: {hours: 8, minutes: 50, seconds: 0}},
        {name: "Tustin", time: {hours: 8, minutes: 56, seconds: 0}},
        {name: "Irvine", time: {hours: 9, minutes: 4, seconds: 0}},
        {name: "Laguna Nigel", time: {hours: 9, minutes: 14, seconds: 0}},
        {name: "SJC", time: {hours: 9, minutes: 20, seconds: 0}},
        {name: "San Clemente", time: {hours: 9, minutes: 30, seconds: 0}},
        // {name: "San Clemente Pier", time: "no_stop"},
        {name: "Oceanside", time: {hours: 10, minutes: 1, seconds: 0}}
      ]

    },
    {"train": 900, "route": "Southbound", "variance": 300000,
      "stops":
      [
        {name: "LA", time: {hours: 7, minutes: 58, seconds: 0}},
        {name: "Commerce", time: "no_stop"},
        {name: "Norwalk/SFS", time: {hours: 8, minutes: 20, seconds: 0}},
        {name: "Buena Park", time: {hours: 8, minutes: 27, seconds: 0}},
        {name: "Fullerton", time: {hours: 8, minutes: 33, seconds: 0}},
        {name: "Anaheim", time: {hours: 8, minutes: 40, seconds: 0}},
        {name: "Orange", time: {hours: 8, minutes: 45, seconds: 0}},
        {name: "Santa Ana", time: {hours: 8, minutes: 50, seconds: 0}},
        {name: "Tustin", time: {hours: 8, minutes: 56, seconds: 0}},
        {name: "Irvine", time: {hours: 9, minutes: 4, seconds: 0}},
        {name: "Laguna Nigel", time: {hours: 9, minutes: 14, seconds: 0}},
        {name: "SJC", time: {hours: 9, minutes: 20, seconds: 0}},
        {name: "San Clemente", time: {hours: 9, minutes: 30, seconds: 0}},
        // {name: "San Clemente Pier", time: "no_stop"},
        {name: "Oceanside", time: {hours: 10, minutes: 1, seconds: 0}}
      ]

    }
    //,
    // {"train": 681, "route": "inbound", "variance": 0,
    //   "stops":
    //   [
    //     {"LA": "5:25"},
    //     {"Commerce": "no_stop"},
    //     {"Norwalk/SFS": "4:57"},
    //     {"Buena Park": "4:49"},
    //     {"Fullerton": "4:43"},
    //     {"Anaheim": "4:36"},
    //     {"Orange": "4:32"},
    //     {"Santa Ana": "4:27"},
    //     {"Tustin": "4:21"},
    //     {"Irvine": "4:15"},
    //     {"Laguna Nigel": "4:05"},
    //     {"SJC": "no_stop"},
    //     {"San Clemente": "no_stop"},
    //     {"San Clemente Pier": "no_stop"},
    //     {"Oceanside": "no_stop"}
    //   ]
    // }
    // ,
    // {"train": 601, "route": "inbound", "variance": 180000,
    //   "stops":
    //   [
    //     {"LA": "6:45"},
    //     {"Commerce": "no_stop"},
    //     "Norwalk/SFS": "6:18",
    //     "Buena Park": "6:10",
    //     "Fullerton": "6:04",
    //     "Anaheim": "5:57",
    //     "Orange": "5:52",
    //     "Santa Ana": "5:44",
    //     "Tustin": "5:38",
    //     "Irvine": "5:32",
    //     "Laguna Nigel": "5:22",
    //     "SJC": "5:15",
    //     "San Clemente": "5:06",
    //     "San Clemente Pier": "no_stop",
    //     "Oceanside": "4:43"
    //   ]
    // }
  ]
};
// variance is the time difference between scheduled and actual, in milliseconds
