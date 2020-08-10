//
// Analytics for all things articles. This includes tests for share buttons
// and potentionally other alternative layout options or more.
//

if (
  location.pathname.match("/article/") ||
  location.pathname.match("/2016-year-in-art")
) {
  $(document.body)
    .on("click", ".article-social a", function () {
      const articleId = $(this).closest(".article-container").data("id")
      analytics.track("Article Share", {
        article_id: articleId,
        context_type: sd.ARTICLE ? "article_fixed" : "magazine_fixed",
        service: $(this).attr("data-service"),
      })
    })
    .on("click", ".article-share-fixed > a", function () {
      const articleId = $(this).closest(".article-container").data("id")
      analytics.track("Article Share", {
        article_id: articleId,
        context_type: "article_sticky",
        service: $(this).attr("data-service"),
      })
    })
    .on("click", ".article-sa-primary-logo a", function () {
      analytics.track("Clicked primary partner logo", {
        destination_path: $(this)[0].href,
        impression_type: "sa_primary_logo",
        context_type: "article_fixed",
      })
    })
    .on("click", ".article-sa-secondary-logo a", function () {
      analytics.track("Clicked secondary partner logo", {
        destination_path: $(this)[0].href,
        impression_type: "sa_secondary_logo",
        context_type: "article_fixed",
      })
    })
    .on("click", ".article-sa-cta-container a", function () {
      analytics.track("Clicked partner cta link", {
        destination_path: $(this)[0].href,
        impression_type: "sa_partner_cta",
        context_type: "article_fixed",
      })
    })
    .on("click", ".article-sa-footer-blurb a", function () {
      analytics.track("Clicked partner cta link in footer blurb", {
        destination_path: $(this)[0].href,
        impression_type: "sa_partner_cta",
        context_type: "article_fixed",
      })
    })
}
