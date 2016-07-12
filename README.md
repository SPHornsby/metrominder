[MetroMinder on Heroku](https://metrominder.herokuapp.com/)
# metrominder
An app for commuters who want to check if their trains are running on schedule.

MetroMinder allows the user to see when trains will get to each stations, including any reported delays. They can then check the travel time between their location and the station to determine if they can make it to the station before their train departs.

MetroMinder uses the **_Google Maps Directions API_** to calculate the trip duration.

MetroMinder uses the following libraries:
* **_Express_**
* **_Moment Timezone_**
* **_Underscore_**
* **_Nodemon_**

MetroMinder uses **_jQuery_** and **_Bootstrap_** on the front-end

# Screenshots:

## Home Screen:

![Alt text](/screenshots/phone-home.png?raw=true "Optional Title")

## Search:

![Alt text](/screenshots/search.png?raw=true "Optional Title")

## Search Dropdowns:

![Alt text](/screenshots/search-dropdown.png?raw=true "Optional Title")

## Search Results:

![Alt text](/screenshots/search-results.png?raw=true "Optional Title")

## Address Entry:

![Alt text](/screenshots/address-entry.png?raw=true "Optional Title")

## Success (on phone):

![Alt text](/screenshots/phone-success.png?raw=true "Optional Title")

## Success (on web):

![Alt text](/screenshots/web-success.png?raw=true "Optional Title")

## Failure (on phone):

![Alt text](/screenshots/phone-failure.png?raw=true "Optional Title")

## Failure (on web):

![Alt text](/screenshots/web-failure.png?raw=true "Optional Title")

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
