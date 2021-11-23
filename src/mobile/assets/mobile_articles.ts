import $ from "jquery"
require("backbone").$ = $
const articleIndex = require("../apps/articles/client/articles")
const sectionView = require("../apps/articles/client/section")
const { ArticleView } = require("../components/article/client/view")

$(() => {
  if (location.pathname === "/articles") {
    articleIndex.init()
  } else if (location.pathname === "/venice-biennale-2015") {
    sectionView.init()
  } else if (location.pathname.match("/article/")) {
    new ArticleView()
  }
})
