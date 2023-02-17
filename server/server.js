const express = require("express");
const path = require("path");
const fs = require("fs");
const moviesData = JSON.parse(fs.readFileSync("server/movies_metadata.json","utf8"));

const app = express();

// A test route to make sure the server is up.
app.get("/api/ping", (request, response) => {
  console.log("❇️ Received GET request to /api/ping");
  response.send("pong!");
});

// A mock route to return some data.
app.get("/api/movies", (request, response) => {
  console.log("❇️ Received GET request to /api/movies");
  response.json(moviesData);
});
 app.get("/api/movies/:id",(request,response) => {
   console.log(`❇️ Received GET request to /api/movies/${request.params.id}`);
   const movie = moviesData.find((m) => m.id.toString() === request.params.id);
   if(movie) {
     response.json(movie);
   } else {
     response.status(404).send("Movie not found");
   }
 });

// Express port-switching logic
let port;
console.log("❇️ NODE_ENV is", process.env.NODE_ENV);
if (process.env.NODE_ENV === "production") {
  port = process.env.PORT || 3000;
  app.use(express.static(path.join(__dirname, "../build")));
  app.get("*", (request, response) => {
    response.sendFile(path.join(__dirname, "../build", "index.html"));
  });
} else {
  port = 3001;
  console.log("⚠️ Not seeing your changes as you develop?");
  console.log(
    "⚠️ Do you need to set 'start': 'npm run development' in package.json?"
  );
}

// Start the listener!
const listener = app.listen(port, () => {
  console.log("❇️ Express server is running on port", listener.address().port);
});
