# flicker-imgsearch demo

## description ##
Allows users to search through flickr's database of images. Users can search for images by topic, or browse latest images. The results for either can be view in the app, or viewed as raw JSON. It's loosely based on the project found here: https://www.freecodecamp.org/challenges/timestamp-microservice

## Viewing results for latest/search results ##
If you want to view the results, simply use the search bar and navigation buttons to select what you would like to view. The results are loaded into the sidebar.

## API endpoints for JSON requests ##

### /search ###
/search is the end point for searching for images by topic. It expects a "terms" parameter, as a comma separated string of topics to search for. It can also recieve a "offset" parameter to to determine which page of the results to return. For instance:


```
/search/?terms=cats
returns the 1st page of cat pictures

```

```
/search/?terms=cats,dogs,ponies?offset=2
returns the 2nd page of results of dog, cat or pony pictures

```

### /latest/:page ###
/latest/ is the endpoint for a feed of the most recently uploaded images. Requests to /latest/ are rerouted to /latest/1, which returns the 1st page of results. To return other pages, add the page number to the url:

```
/latest/3
returns the 3rd page of recent images
```



## dependencies ##
are listed in package.json. They are dotenv, for storing api keys, express, body parser and the url package to handle requests, the node-rest-client to make the api requests to flickr, and the handlebars runtime package to build the front-end templates.
