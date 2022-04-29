export default function (myArticles = [], action) {
  if (action.type == "addArticle") {
    var newMyArticles = [...myArticles];
    const found = newMyArticles.find(
      (element) => element.title == action.article.title
    );
    if (found) {
      console.log("shit");
    } else newMyArticles.push(action.article);

    return newMyArticles;
  } else if (action.type == "deleteArticle") {
    var newMyArticles = [...myArticles];
    var deleteArticles = newMyArticles.filter(
      (element) => element.title != action.article
    );
    return deleteArticles;
  } else {
    return myArticles;
  }
}
