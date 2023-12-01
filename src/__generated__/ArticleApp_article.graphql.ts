/**
 * @generated SignedSource<<c4cf8a24c54764ef27a1cbf03fc9c44f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type ArticleLayout = "CLASSIC" | "FEATURE" | "NEWS" | "SERIES" | "STANDARD" | "VIDEO" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ArticleApp_article$data = {
  readonly channelID: string | null | undefined;
  readonly internalID: string;
  readonly layout: ArticleLayout;
  readonly " $fragmentSpreads": FragmentRefs<"ArticleBody_article" | "ArticleMetaTags_article" | "ArticleSeries_article" | "ArticleVideo_article" | "ArticleVisibilityMetadata_article">;
  readonly " $fragmentType": "ArticleApp_article";
};
export type ArticleApp_article$key = {
  readonly " $data"?: ArticleApp_article$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArticleApp_article">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArticleApp_article",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArticleBody_article"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArticleSeries_article"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArticleVideo_article"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArticleVisibilityMetadata_article"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArticleMetaTags_article"
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "internalID",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "layout",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "channelID",
      "storageKey": null
    }
  ],
  "type": "Article",
  "abstractKey": null
};

(node as any).hash = "46968573a01bb07c0cff7cab5f7cd78a";

export default node;
