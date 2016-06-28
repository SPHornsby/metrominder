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
