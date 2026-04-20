/**
 * @generated SignedSource<<f6d9da1c1eb9c43d92fad691b086f29b>>
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
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "href",
      "storageKey": null
    },
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

(node as any).hash = "40108db48badacc09e3e22a37a95653d";

export default node;
