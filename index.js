const request = require("request");
const express = require("express");

const app = express();
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.get("/api/get", (req, response) => {
  request("https://kz.skif.me/coordinates.json", (err, res, body) => {
    if (err) {
      return console.log(err);
    }
    let obj = JSON.parse(body);
    let o = {};
    o.type = "FeatureCollection";
    o.features = [];
    for (let i = 0, len = obj.length; i < len; i++) {
      o.features[i] = {
        type: "Feature",
        id: i,
        geometry: { type: "Point", coordinates: [obj[i][1], obj[i][2]] },
        properties: {
          hintContent: obj[i][0]
        }
      };
    }
    response.send(o);
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server at ${PORT}`));
