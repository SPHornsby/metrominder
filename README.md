# metrominder
An app for commuters who want to check if their trains are running on schedule.


API:

  To search by train number, GET /train.
  Request must include a train number as train, e.g. train=682. This will return that train's scheduled stops.
  The query can also contain a station name as station, e.g. station=Buena+Park. This will return that train's scheduled stop at that station.

  examples:

  localhost:8000/train?train=682&station=Buena+Park
  in HTTPie that request looks like this:
  http localhost:8000/train train==682 station=='Buena Park'

  To search by route, GET /route.
  Request must include a route type, either 'inbound' or 'outbound', e.g. route=outbound. By itself this will return every train of that type and its full schedule.
  The query can optionally include a station name, e.g. station=Fullerton. This will return an object for each train of the route type int the format {train: train number, time: scheduled stop for the station}/

  examples:

  localhost:8000/route?route=outbound&station=Fullerton
  For HTTPie that request looks like this:
  http localhost:8000/route route=='outbound' station=='Fullerton'
