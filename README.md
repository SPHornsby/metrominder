# metrominder
An app for commuters who want to check if their trains are running on schedule.


<h2>API:</h2>

<h3>GET /search? (route=, station=, train=)</h3>
 <p> search has three possible queries. Each parameter causes the array of train objects to be filtered to only include trains of that value. If called with no query, it returns all trains.
  The train object contains six (6) key-value pairs. The keys are: train, route, status, station, time, and actualTime.</p>
  <h4>examples:</h4>
    <p>/search?route=Southbound</p>
    <p>/search?station=Fullerton&train=682</p>
    <p>/search?route=Northbound&train=600&station=Anaheim</p>
<h3>GET /train? route=</h3>
 <p> route has three possible values; Southbound, Northbound, or all.
  "Northbound"/"Southbound" will return an array of all the train numbers of that route type. "all" will return an array of all train numbers.</p>
  <h4>examples (exhaustive):</h4>
    <p>/train?route=all</p>
    <p>/train?route=Southbound</p>
    <p>/train?route=Northbound</p>
