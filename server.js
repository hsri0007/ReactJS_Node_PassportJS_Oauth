const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const mainRouter = require("./routes/main_router");
const keys = require("./config/config");

const app = express();
app.use(express.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/auth/google", mainRouter);
require("./PassportConfig/PassportConfig");
app.get("/api/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});
app.get("/api/current_user", (req, res) => {
  res.send(req.user);
});

const PORT = process.env.PORT || 3000;
mongoose
  .connect(
    "mongodb+srv://hari:1234@cluster0.2jvnd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then((der) => app.listen(PORT, console.log("sdsd", der.connection.host)))
  .catch((err) => console.log("sd", err));

mongoose.set("useFindAndModify", false);
