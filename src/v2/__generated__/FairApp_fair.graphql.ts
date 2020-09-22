/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairApp_fair = {
    readonly slug: string;
    readonly articles: {
        readonly edges: ReadonlyArray<{
            readonly __typename: string;
        } | null> | null;
    } | null;
    readonly marketingCollections: ReadonlyArray<{
        readonly __typename: string;
    } | null>;
    readonly " $fragmentRefs": FragmentRefs<"FairMeta_fair" | "FairHeader_fair" | "FairEditorial_fair" | "FairCollections_fair">;
    readonly " $refType": "FairApp_fair";
};
export type FairApp_fair$data = FairApp_fair;
export type FairApp_fair$key = {
    readonly " $data"?: FairApp_fair$data;
    readonly " $fragmentRefs": FragmentRefs<"FairApp_fair">;
};



const node: ReaderFragment = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "__typename",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FairApp_fair",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": "articles",
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 5
        },
        {
          "kind": "Literal",
          "name": "sort",
          "value": "PUBLISHED_AT_DESC"
        }
      ],
      "concreteType": "ArticleConnection",
      "kind": "LinkedField",
      "name": "articlesConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ArticleEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": (v0/*: any*/),
          "storageKey": null
        }
      ],
      "storageKey": "articlesConnection(first:5,sort:\"PUBLISHED_AT_DESC\")"
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "size",
          "value": 1
        }
      ],
      "concreteType": "MarketingCollection",
      "kind": "LinkedField",
      "name": "marketingCollections",
      "plural": true,
      "selections": (v0/*: any*/),
      "storageKey": "marketingCollections(size:1)"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FairMeta_fair"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FairHeader_fair"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FairEditorial_fair"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FairCollections_fair"
    }
  ],
  "type": "Fair"
};
})();
(node as any).hash = '282c0ad896edff8f12f0f13df653f204';
export default node;
