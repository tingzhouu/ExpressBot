const Telegraf = require("telegraf");
const express = require("express");
const expressApp = express();
const mongoose = require("mongoose");
// const { logCheckIn, printSomething } = require("./currentcheckin");

const bot = new Telegraf("796197780:AAErrKKjNRKbx-WZ7VH4dBlw7EhxKJc5388");

const connection = mongoose.connect(
  "mongodb+srv://admin-tingzhou:nasitomato@cluster0-71gbh.mongodb.net/wikiDB?retryWrites=true",
  { useNewUrlParser: true }
);

connection.then(() => {
  console.log("DB connected");
  console.log(mongoose.connection.readyState);
});

connection.catch((err) => {
  console.log("mongodb.connectionError", err);
});

expressApp.use(bot.webhookCallback("/"));


bot.telegram
  .setWebhook("https://express-bot.now.sh")
  .then(function() {
    console.log("telegram bot set webhook ok");
    bot.launch();
  })
  .catch(function(error) {
    console.log("telegram bot set webhook not ok");
    console.log(error);
  });

bot.start(function(ctx) {
  ctx.reply("start");
  console.log("start request received");
  // logCheckIn({from: {id: "14:33"}});

  mongoose.connect(
    "mongodb+srv://admin-tingzhou:nasitomato@cluster0-71gbh.mongodb.net/wikiDB?retryWrites=true",
    { useNewUrlParser: true }
  );

  const currentCheckInSchema = mongoose.Schema({
    telegramID: { type: String, required: true },
    checkInTimeStamp: Date,
    checkOutTimeStamp: Date
  });
  
  const currentCheckInLog = mongoose.model("CheckInLog", currentCheckInSchema);
  
  async function logCheckIn(ctx) {
    console.log("Is running log check in function..");
    

    const newRequestLog = new currentCheckInLog({
      telegramID: ctx.from.id,
    });
  
    await newRequestLog.save(function(err) {
      console.log("** entering callback function for writing to DB");
      
      if (!err) {
        console.log("successfully logged to DB");
        return "successfully logged to DB";
      } else {
        console.log("unsucessful :(");
        return "unsuccessful";
      }
    });
  }
  logCheckIn(ctx);
  
  console.log("start request end");
});

bot.command("hi", function(ctx) {
  ctx.reply("hii");
  // logCheckIn({from: {id: "15:44"}});
  logCheckIn(ctx);
})

expressApp.get("/", (req, res) => {
  logCheckIn({from: {id: "14:32"}});
  res.send(
    `Mongoose connection readystate is ${mongoose.connection.readyState}`
  );
});

expressApp.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});