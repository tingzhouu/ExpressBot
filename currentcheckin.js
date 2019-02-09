const mongoose = require("mongoose");
const moment = require("moment");

const currentCheckInSchema = mongoose.Schema({
  telegramID: { type: String, required: true },
  checkInTimeStamp: Date,
  checkOutTimeStamp: Date
});

const currentCheckInLog = mongoose.model("CheckInLog", currentCheckInSchema);

function logCheckIn(ctx) {
  const newRequestLog = new currentCheckInLog({
    telegramID: ctx.from.id,
  });

  newRequestLog.save(function(err) {
    if (!err) {
      console.log("successfully logged to DB");
      return "successfully logged to DB";
    } else {
      console.log("unsucessful :(");
      return "unsuccessful";
    }
  });
}

function checkCheckedInUser(ctx) {
  currentCheckInLog.findOne({ telegramID: ctx.from.id }, function(err, docs) {
    if (docs != null) {
      console.log("i see you have checked in");
      console.log(docs);
      return docs;
    } else {
      console.log("i see you have not checked in");
      console.log(err);
    }
  });
}

function printSomething() {
  console.log("*****");
  console.log("***");
  console.log("*****");
  
}

module.exports = {
  printSomething: printSomething,
  logCheckIn: logCheckIn,
  checkCheckedInUser: checkCheckedInUser,
  currentCheckInLog: currentCheckInLog
}