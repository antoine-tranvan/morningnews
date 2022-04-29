var express = require("express");
var router = express.Router();
var userModel = require("../models/users");
var bcrypt = require("bcrypt");
var uid2 = require("uid2");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/sign-up", async function (req, res, next) {
  var results = true;
  var errorMessage = "";
  var userCheck = await userModel.findOne({ email: req.body.email });

  var hash = bcrypt.hashSync(req.body.password, 10);

  if (
    req.body.email == "" ||
    req.body.username == "" ||
    req.body.password == ""
  ) {
    results = false;
    errorMessage = "Il faut remplir tous les champs";
  } else if (userCheck) {
    results = false;
    errorMessage = "Vous avez déjà un compte";
  } else {
    var newUser = new userModel({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      token: uid2(32),
      language: "fr",
    });

    var userSaved = await newUser.save();
  }
  console.log(results);

  res.json({ results, errorMessage, userSaved });
});

router.post("/sign-in", async function (req, res, next) {
  var results = false;
  var errorMessage = true;
  var passwordCheck = false;

  var userCheck = await userModel.findOne({ email: req.body.email });

  if (bcrypt.compareSync(req.body.password, userCheck.password)) {
    passwordCheck = true;
  }

  if (userCheck == undefined) {
    results = false;
    errorMessage = "Le compte n'existe pas";
  } else if (userCheck.email == "") {
    results = false;
    errorMessage = "Il faut taper quelquechose dans les champs";
  } else if (userCheck.email != "" && !passwordCheck) {
    results = false;
    errorMessage = "Le mot de passe est erroné";
  } else {
    results = true;
  }

  res.json({ results, errorMessage, userCheck });
});

router.post("/updateArticles", async function (req, res, next) {
  let results = false;
  let alreadyExist = false;

  var user = await userModel.findOne({ token: req.body.token });

  for (var i = 0; i < user.articles.length; i++) {
    if (user.articles[i].title == req.body.title) {
      alreadyExist = true;
    }
  }

  if (alreadyExist == false) {
    user.articles.push({
      title: req.body.title,
      description: req.body.description,
      img: req.body.img,
    });
  }

  var userSaved = await user.save();

  if (userSaved) {
    results = true;
  }

  res.json({ results });
});

router.post("/sendArticles", async function (req, res, next) {
  let myarticles;

  var user = await userModel.findOne({ token: req.body.token });
  console.log(user);

  myarticles = user.articles;

  res.json({ myarticles });
});

router.post("/deleteArticles", async function (req, res, next) {
  let results = true;

  var user = await userModel.findOne({ token: req.body.token });

  console.log(user.articles);
  var index = user.articles.findIndex((el) => el.title == req.body.title);

  user.articles.splice(index, 1);

  console.log(user.articles);

  var userSaved = await user.save();
  res.json({ results });
});

module.exports = router;
