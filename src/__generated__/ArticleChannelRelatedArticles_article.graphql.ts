/**
 * @generated SignedSource<<3de74561ca990071ea87b36eadb469c0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArticleChannelRelatedArticles_article$data = {
  readonly byline: string | null | undefined;
  readonly channel: {
    readonly name: string;
  } | null | undefined;
  readonly channelArticles: ReadonlyArray<{
    readonly internalID: string;
    readonly " $fragmentSpreads": FragmentRefs<"CellArticle_article">;
  }>;
  readonly " $fragmentType": "ArticleChannelRelatedArticles_article";
};
export type ArticleChannelRelatedArticles_article$key = {
  readonly " $data"?: ArticleChannelRelatedArticles_article$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArticleChannelRelatedArticles_article">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArticleChannelRelatedArticles_article",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "byline",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Channel",
      "kind": "LinkedField",
      "name": "channel",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Article",
      "kind": "LinkedField",
      "name": "channelArticles",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "internalID",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "CellArticle_article"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Article",
  "abstractKey": null
};

(node as any).hash = "b8121df23a966cee47209d2ddd3c20a3";

export default node;
