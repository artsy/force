import $ from "jquery"
require("backbone").$ = $
const articleIndex = require("../apps/articles/client/articles.coffee")
const sectionView = require("../apps/articles/client/section.coffee")
const ArticleView = require("../components/article/client/view.coffee")

$(() => {
  if (location.pathname === "/articles") {
    articleIndex.init()
  } else if (location.pathname === "/venice-biennale-2015") {
    sectionView.init()
  } else if (location.pathname.match("/article/")) {
    new ArticleView()
  }
})
