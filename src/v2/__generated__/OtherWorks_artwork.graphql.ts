/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type OtherWorks_artwork = {
    readonly contextGrids: ReadonlyArray<{
        readonly __typename: string;
        readonly title: string | null;
        readonly ctaTitle: string | null;
        readonly ctaHref: string | null;
        readonly artworksConnection: {
            readonly edges: ReadonlyArray<{
                readonly node: {
                    readonly slug: string;
                } | null;
            } | null> | null;
            readonly " $fragmentRefs": FragmentRefs<"ArtworkGrid_artworks">;
        } | null;
    } | null> | null;
    readonly slug: string;
    readonly internalID: string;
    readonly sale: {
        readonly is_closed: boolean | null;
    } | null;
    readonly context: {
        readonly __typename: string;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"RelatedWorksArtworkGrid_artwork" | "ArtistSeriesArtworkRail_artwork">;
    readonly " $refType": "OtherWorks_artwork";
};
export type OtherWorks_artwork$data = OtherWorks_artwork;
export type OtherWorks_artwork$key = {
    readonly " $data"?: OtherWorks_artwork$data;
    readonly " $fragmentRefs": FragmentRefs<"OtherWorks_artwork">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__typename",
  "args": null,
  "storageKey": null
},
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "slug",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "OtherWorks_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [
    {
      "kind": "LocalArgument",
      "name": "shouldFetchArtistSeriesData",
      "type": "Boolean!",
      "defaultValue": false
    }
  ],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "contextGrids",
      "storageKey": null,
      "args": null,
      "concreteType": null,
      "plural": true,
      "selections": [
        (v0/*: any*/),
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "title",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "ctaTitle",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "ctaHref",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "artworksConnection",
          "storageKey": "artworksConnection(first:8)",
          "args": [
            {
              "kind": "Literal",
              "name": "first",
              "value": 8
            }
          ],
          "concreteType": "ArtworkConnection",
          "plural": false,
          "selections": [
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "edges",
              "storageKey": null,
              "args": null,
              "concreteType": "ArtworkEdge",
              "plural": true,
              "selections": [
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "node",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "Artwork",
                  "plural": false,
                  "selections": [
                    (v1/*: any*/)
                  ]
                }
              ]
            },
            {
              "kind": "FragmentSpread",
              "name": "ArtworkGrid_artworks",
              "args": null
            }
          ]
        }
      ]
    },
    (v1/*: any*/),
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "internalID",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "sale",
      "storageKey": null,
      "args": null,
      "concreteType": "Sale",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": "is_closed",
          "name": "isClosed",
          "args": null,
          "storageKey": null
        }
      ]
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "context",
      "storageKey": null,
      "args": null,
      "concreteType": null,
      "plural": false,
      "selections": [
        (v0/*: any*/)
      ]
    },
    {
      "kind": "FragmentSpread",
      "name": "RelatedWorksArtworkGrid_artwork",
      "args": null
    },
    {
      "kind": "Condition",
      "passingValue": true,
      "condition": "shouldFetchArtistSeriesData",
      "selections": [
        {
          "kind": "FragmentSpread",
          "name": "ArtistSeriesArtworkRail_artwork",
          "args": null
        }
      ]
    }
  ]
};
})();
(node as any).hash = '9f92c6f7ef8640d934350a89ba7ec1c7';
export default node;
