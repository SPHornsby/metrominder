# metrominder
An app for commuters who want to check if their trains are running on schedule.


API:

GET /search? (route=, station=, train=)
  search has three possible queries. Each parameter causes the array of train objects to be filtered to only include trains of that value. If called with no query, it returns all trains.
  The train object contains six (6) key-value pairs. The keys are: train, route, status, station, time, and actualTime.
  examples:
    /search?route=Southbound
    /search?station=Fullerton&train=682
    /search?route=Northbound&train=600&station=Anaehim
GET /train? route=
  route has three possible values; Southbound, Northbound, or all.
  "Northbound"/"Southbound" will return an array of all the train numbers of that route type. "all" will return an array of all train numbers.
  examples (exhaustive):
    /train?route=all
    /train?route=Southbound
    /train?route=Northbound
