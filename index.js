var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);
const mysql = require("mysql");

const SELECT_ALL_VIEW_QUERY = "SELECT * FROM store";

const connectdb = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "your_database_password",
  database: "your_own_database"
});

// connectdb.connect(err => {
//   if (err) {
//     return err;
//   }
// });

// console.log(connectdb);

app.get("/", (req, res) => {
  res.send("home of minuteserver");
});

function firstdata() {
  connectdb.query(SELECT_ALL_VIEW_QUERY, (err, results) => {
    if (err) {
      r = err;
    } else {
      io.emit("message", results);
      console.log(results);
    }
  });
}

io.on("connection", function(socket) {
  // x = false;
  console.log("a user connected");
  firstdata();
});

setInterval(function() {
  connectdb.query(SELECT_ALL_VIEW_QUERY, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      io.emit("message", results);
      console.log("new data");
      console.log(results);
    }
  });
}, 1000);

http.listen(4000, () => {
  console.log("Product server listening on port 4000");
});

// var arrayKey = [
//   "fuel",
//   "speed",
//   "distance",
//   "becon",
//   "door_lock_status",
//   "con_status",
//   "location",
//   "env_temp",
//   "gear_pos",
//   "v_temp",
//   "ac_status",
//   "fuel_flow_rate",
//   "engine_temp",
//   "tyre_pressure",
//   "battery_status",
//   "vehicle_name",
//   "brake_cond",
//   "veh_type",
//   "veh_weight",
//   "servicing_status",
//   "mobilise_status",
//   "crank_status",
//   "veh_no",
//   "sos",
//   "breakdown_stat",
//   "airbag_stat",
//   "seatbelt_status"
// ];
