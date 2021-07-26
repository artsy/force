/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairApp_fair = {
    readonly internalID: string;
    readonly href: string | null;
    readonly slug: string;
    readonly articlesConnection: {
        readonly totalCount: number | null;
        readonly edges: ReadonlyArray<{
            readonly __typename: string;
        } | null> | null;
    } | null;
    readonly marketingCollections: ReadonlyArray<{
        readonly id: string;
    } | null>;
    readonly counts: {
        readonly artworks: number | null;
    } | null;
    readonly profile: {
        readonly id: string;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"FairMeta_fair" | "FairHeader_fair" | "FairHeaderImage_fair" | "FairFollowedArtists_fair">;
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
    "name": "id",
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
      "name": "internalID",
      "storageKey": null
    },
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
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 6
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
          "kind": "ScalarField",
          "name": "totalCount",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "ArticleEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
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
        }
      ],
      "storageKey": "articlesConnection(first:6,sort:\"PUBLISHED_AT_DESC\")"
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "size",
          "value": 5
        }
      ],
      "concreteType": "MarketingCollection",
      "kind": "LinkedField",
      "name": "marketingCollections",
      "plural": true,
      "selections": (v0/*: any*/),
      "storageKey": "marketingCollections(size:5)"
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "FairCounts",
      "kind": "LinkedField",
      "name": "counts",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "artworks",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Profile",
      "kind": "LinkedField",
      "name": "profile",
      "plural": false,
      "selections": (v0/*: any*/),
      "storageKey": null
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
      "name": "FairHeaderImage_fair"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FairFollowedArtists_fair"
    }
  ],
  "type": "Fair"
};
})();
(node as any).hash = '4d18f6973d42b8ecb6efd5172bf41bb7';
export default node;
