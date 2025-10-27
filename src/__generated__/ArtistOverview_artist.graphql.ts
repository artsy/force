/**
 * @generated SignedSource<<ad3f50e614716f36f216c81b79d21a9e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistOverview_artist$data = {
  readonly artistSeriesConnection: {
    readonly totalCount: number;
  } | null | undefined;
  readonly counts: {
    readonly articles: number | null | undefined;
    readonly relatedArtists: number | null | undefined;
  } | null | undefined;
  readonly href: string | null | undefined;
  readonly insights: ReadonlyArray<{
    readonly __typename: "ArtistInsight";
  }>;
  readonly internalID: string;
  readonly name: string | null | undefined;
  readonly related: {
    readonly genes: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly __typename: "Gene";
        } | null | undefined;
      } | null | undefined> | null | undefined;
    } | null | undefined;
  } | null | undefined;
  readonly showsConnection: {
    readonly totalCount: number | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "ArtistOverview_artist";
};
export type ArtistOverview_artist$key = {
  readonly " $data"?: ArtistOverview_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistOverview_artist">;
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
],
v1 = {
  "kind": "Literal",
  "name": "first",
  "value": 0
},
v2 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "totalCount",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistOverview_artist",
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
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ArtistInsight",
      "kind": "LinkedField",
      "name": "insights",
      "plural": true,
      "selections": (v0/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        (v1/*: any*/)
      ],
      "concreteType": "ArtistSeriesConnection",
      "kind": "LinkedField",
      "name": "artistSeriesConnection",
      "plural": false,
      "selections": (v2/*: any*/),
      "storageKey": "artistSeriesConnection(first:0)"
    },
    {
      "alias": null,
      "args": [
        (v1/*: any*/),
        {
          "kind": "Literal",
          "name": "status",
          "value": "running"
        }
      ],
      "concreteType": "ShowConnection",
      "kind": "LinkedField",
      "name": "showsConnection",
      "plural": false,
      "selections": (v2/*: any*/),
      "storageKey": "showsConnection(first:0,status:\"running\")"
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ArtistCounts",
      "kind": "LinkedField",
      "name": "counts",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "relatedArtists",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "articles",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ArtistRelatedData",
      "kind": "LinkedField",
      "name": "related",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "first",
              "value": 1
            }
          ],
          "concreteType": "GeneConnection",
          "kind": "LinkedField",
          "name": "genes",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "GeneEdge",
              "kind": "LinkedField",
              "name": "edges",
              "plural": true,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "Gene",
                  "kind": "LinkedField",
                  "name": "node",
                  "plural": false,
                  "selections": (v0/*: any*/),
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": "genes(first:1)"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artist",
  "abstractKey": null
};
})();

(node as any).hash = "d409e60c6d511fede7e6b68b24ac5567";

export default node;
