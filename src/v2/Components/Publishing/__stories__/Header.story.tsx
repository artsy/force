import { storiesOf } from "@storybook/react"
import { extend } from "lodash"
import React from "react"
import {
  ClassicArticle,
  ClassicArticleManyAuthors,
  FeatureArticle,
  FeatureBasicArticle,
  FeatureBasicVideoArticle,
  MissingVerticalStandardArticle,
  SeriesArticle,
  SponsoredArticle,
  StandardArticle,
  SuperArticle,
} from "../Fixtures/Articles"
import { HeroSections } from "../Fixtures/Components"
import { EditableChild } from "../Fixtures/Helpers"
import { Header } from "../Header/Header"

storiesOf("Publishing/Header/Classic", module)
  .add("Classic", () => {
    return <Header article={ClassicArticle} />
  })
  .add("Many Authors", () => {
    return <Header article={ClassicArticleManyAuthors} />
  })
  .add("Editable", () => {
    return (
      <Header
        article={ClassicArticle}
        date="2015-06-19T13:09:18.567Z"
        editLeadParagraph={EditableChild("Lead Paragraph")}
        editTitle={EditableChild("Title")}
      />
    )
  })

storiesOf("Publishing/Header/Standard", module)
  .add("Standard", () => {
    return <Header article={StandardArticle} />
  })
  .add("Missing Vertical", () => {
    return <Header article={MissingVerticalStandardArticle} />
  })
  .add("Editable", () => {
    return (
      <Header
        article={MissingVerticalStandardArticle}
        date="2015-06-19T13:09:18.567Z"
        editTitle={EditableChild("Title")}
        editVertical={EditableChild("Vertical")}
      />
    )
  })

storiesOf("Publishing/Header/Feature/Text", module)
  .add("Image", () => {
    const article = extend({}, FeatureArticle, {
      hero_section: HeroSections[0],
    })
    return <Header article={article} />
  })
  .add("Video", () => {
    return <Header article={FeatureArticle} />
  })
  .add("Missing Vertical", () => {
    const article = extend({}, FeatureArticle, {
      vertical: null,
    })
    return <Header article={article} />
  })
  .add("Editable", () => {
    const article = extend({}, FeatureArticle, {
      vertical: null,
    })
    return (
      <Header
        article={article}
        date="2015-06-19T13:09:18.567Z"
        editDeck={EditableChild("Deck")}
        editImage={EditableChild("Image")}
        editTitle={EditableChild("Title")}
        editVertical={EditableChild("Vertical")}
      />
    )
  })

storiesOf("Publishing/Header/Feature/Basic", module)
  .add("Text", () => {
    return <Header article={FeatureBasicArticle} />
  })
  .add("Video", () => {
    return <Header article={FeatureBasicVideoArticle} />
  })
  .add("Editable", () => {
    const article = extend({}, FeatureBasicVideoArticle, {
      vertical: null,
    })
    return (
      <Header
        article={article}
        date="2015-06-19T13:09:18.567Z"
        editDeck={EditableChild("Deck")}
        editImage={EditableChild("Image")}
        editTitle={EditableChild("Title")}
        editVertical={EditableChild("Vertical")}
      />
    )
  })

storiesOf("Publishing/Header/Feature/Fullscreen", module)
  .add("Image", () => {
    const article = extend({}, FeatureArticle, {
      hero_section: HeroSections[2],
    })
    return <Header article={article} />
  })
  .add("Video", () => {
    return <Header article={FeatureArticle} />
  })
  .add("In Series", () => {
    const article = extend({}, SponsoredArticle, {
      hero_section: HeroSections[2],
      seriesArticle: SeriesArticle,
    })
    return <Header article={article} />
  })
  .add("SuperArticle", () => {
    return <Header article={SuperArticle} />
  })
  .add("Editable", () => {
    const article = extend({}, FeatureArticle, {
      vertical: null,
    })
    return (
      <Header
        article={article}
        date="2015-06-19T13:09:18.567Z"
        editDeck={EditableChild("Deck")}
        editImage={EditableChild("Image")}
        editTitle={EditableChild("Title")}
        editVertical={EditableChild("Vertical")}
      />
    )
  })

storiesOf("Publishing/Header/Feature/Split", module)
  .add("Image", () => {
    const article = extend({}, FeatureArticle, {
      hero_section: HeroSections[1],
      title:
        "Bodys Isek Kingelez, Maker of Utopian Cities, Finally Gets the Retrospective He Deserves",
    })
    return <Header article={article} />
  })
  .add("Video", () => {
    const article = extend({}, FeatureArticle, {
      hero_section: HeroSections[3],
    })
    return <Header article={article} />
  })
  .add("Editable", () => {
    const article = extend({}, FeatureArticle, {
      vertical: null,
      hero_section: HeroSections[3],
    })
    return (
      <Header
        article={article}
        date="2015-06-19T13:09:18.567Z"
        editDeck={EditableChild("Deck")}
        editImage={EditableChild("Image")}
        editTitle={EditableChild("Title")}
        editVertical={EditableChild("Vertical")}
      />
    )
  })
