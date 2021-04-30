## App Requirements (Front-End)

The front-end of the application has been developed with React.

For this app to work, you will require an API key for the weather data from https://api.meteostat.net/

**Please Note:** At the time of writing, the Meteostat API is not currently accepting as many requests as it originally had in V1. Therefore, some requests may get refused seemingly at random (if you make the request for the same data a couple more times, it will usually give you something). I will wait until the V2 API goes fully live on May 1st, but if this issue persists after that time, I may need to look further into possible ways to work around this issue.

Once you have this key, go to the */font_end/public* directory. The key will need to be placed in a file named *api_settings.json*. There is a file already there called *api_settings.example.json* -- this will show you what needs to be in the *api_settings.json* file. If you want the front-end of the app to use the back-end API (see the next section below), then you will also need to poulate the relevant settings for that in *api_settings.json* (again, see *api_settings.example.json*).

- On May 1st 2020, the Meteostat API (which provides the weather data) will be moving to V2. I have now modified this app to work with that new version.
- The V2 Meteostat API was not allowing more than 20 requests every second. This was causing issues for the app, which is high in consecutive calls to that API (first a weather-station ID request, and then a weather request, for around 23 races every time). To solve this, I have split the race seasons into quarters, and you have to select a quarter when you do the search. This is a simplistic solution for now, but may be replaced with pagination in the future.


## App Requirements (Back-End)

*Please note: the back-end API is not required for the front-end app to work correctly.*

The back-end of the application is an API that has been developed with Java and Spring Boot. It will allow people registered as "contributers" to automatically store their search results in the database, so that the app can access that data if available, rather than from requests to the 3rd party APIs.

The API uses JSON Web Tokens for authentication. In this hypothetical service, users would email in to request to be "contributers" to the database. A hypothetical sysadmin would then set them up with a user account in the database (See the *back_end/database* directory to find a script for seeding an example user, with a BCrypt-hashed password.). I may, at some point in the future, create a basic administration system to make this simpler.

The API provides 3 routes:

- /api/v1/auth (POST) - This route will take a POST request, with a JSON object that contains 2 properties: "username" and "password". It will return either a 403 (if the user details are not valid), or a JSON Web Token
- /api/v1/rounds (POST) - This route will take a JSON representation of the weather/race data that has been retrieved from 3rd party APIs by the front-end system, and then store this data in the database. This will require an *Authorization* header to provide the JWT. The header value should be formatted as: *Bearer {JWT here}*
- /api/v1/rounds/{year}/{quarter} (GET) - This route will return a JSON array of any records that match the provided year and season-quarter route parameters

For this app to work, you will first need to set up the MySQL database. In the *back_end/database* directory, there is a script to generate this database.

You will then need to create an *application.properties* file in the Spring Boot project's */src/main/resources* directory. There is a file in there called *application.properties.example*, which contains examples of the settings that will need to be populated in the *application.properties* file.

[See my Portfolio](http://md-developer.uk/)
[Follow me on Twitter](https://twitter.com/mattdarbs)
