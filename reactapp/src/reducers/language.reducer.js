export default function (language = "fr", action) {
  console.log(action.language);
  if (action.type == "changeLanguage") {
    var newLanguage = action.language;
    return newLanguage;
  } else {
    return language;
  }
}
