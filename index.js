//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming
import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url)); //get parent directory of the projec

const app = express();
const port = 3000; //port in use
const PASSWORD = "ILoveProgramming";
let isAuthorised = false;

//middlewares
app.use(bodyParser.urlencoded({ extended: true }));

//Authentication middleware
function authenticate(req, res, next) {
  let { password } = req.body;

  if (password === PASSWORD) {
    isAuthorised = true;
  }
  next();
}
app.use(authenticate);

//Send back the initial login page
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

//Send secret page
app.post("/check", (req, res) => {
  if (isAuthorised) {
    res.sendFile(__dirname + "/public/secret.html");
  } else {
    res.sendFile(__dirname + "/public/index.html");
  }
});

//Print out which port is being used
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
