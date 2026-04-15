/**
 * @generated SignedSource<<7b0b2a437530eb67eeb1ec348d695ea4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArticleTableOfContents_article$data = {
  readonly href: string | null | undefined;
  readonly outline: ReadonlyArray<{
    readonly heading: string;
    readonly slug: string;
  }>;
  readonly slug: string | null | undefined;
  readonly " $fragmentType": "ArticleTableOfContents_article";
};
export type ArticleTableOfContents_article$key = {
  readonly " $data"?: ArticleTableOfContents_article$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArticleTableOfContents_article">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArticleTableOfContents_article",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "href",
      "storageKey": null
    },
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "ArticleOutlineEntry",
      "kind": "LinkedField",
      "name": "outline",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "heading",
          "storageKey": null
        },
        (v0/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "Article",
  "abstractKey": null
};
})();

(node as any).hash = "ac2ae55e80391b53ad41d58f67014b83";

export default node;
