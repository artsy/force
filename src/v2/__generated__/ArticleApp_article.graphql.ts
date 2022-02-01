/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArticleApp_article = {
    readonly internalID: string;
    readonly title: string | null;
    readonly hero: {
        readonly __typename: string;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"ArticleBody_article">;
    readonly " $refType": "ArticleApp_article";
};
export type ArticleApp_article$data = ArticleApp_article;
export type ArticleApp_article$key = {
    readonly " $data"?: ArticleApp_article$data;
    readonly " $fragmentRefs": FragmentRefs<"ArticleApp_article">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArticleApp_article",
  "selections": [
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
      "name": "title",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "hero",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "__typename",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArticleBody_article"
    }
  ],
  "type": "Article",
  "abstractKey": null
};
(node as any).hash = '7c64afa3db10e705339de0bf183c9c6e';
export default node;
