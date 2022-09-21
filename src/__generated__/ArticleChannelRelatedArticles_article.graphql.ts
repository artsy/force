/**
 * @generated SignedSource<<a3351354fcff18d12b672f65eddcad53>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArticleChannelRelatedArticles_article$data = {
  readonly byline: string | null;
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

(node as any).hash = "f14731273fb9b7023f44396acf49ba8f";

export default node;
