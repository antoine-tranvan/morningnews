var mongoose = require("mongoose");

var options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(
  "mongodb+srv://antoinetranvan:Peterpan10!@cluster0.d792e.mongodb.net/morningnews?retryWrites=true&w=majority",
  options,
  function (error) {
    if (error == null) {
      console.log(`✅Connexion à la base de données réussie.`);
    } else {
      console.log(error);
    }
  }
);
