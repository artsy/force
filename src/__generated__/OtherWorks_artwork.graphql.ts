/**
 * @generated SignedSource<<a77c2b5fb9d3ca4d1742f772cfa2d443>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type OtherWorks_artwork$data = {
  readonly context: {
    readonly __typename: string;
  } | null;
  readonly contextGrids: ReadonlyArray<{
    readonly __typename: string;
    readonly artworksConnection: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly slug: string;
        } | null;
      } | null> | null;
      readonly " $fragmentSpreads": FragmentRefs<"ArtworkGrid_artworks">;
    } | null;
    readonly ctaHref: string | null;
    readonly ctaTitle: string | null;
    readonly title: string | null;
  } | null> | null;
  readonly internalID: string;
  readonly sale: {
    readonly is_closed: boolean | null;
  } | null;
  readonly seriesArtist: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtistSeriesRail_artist">;
  } | null;
  readonly slug: string;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistSeriesArtworkRail_artwork">;
  readonly " $fragmentType": "OtherWorks_artwork";
};
export type OtherWorks_artwork$key = {
  readonly " $data"?: OtherWorks_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"OtherWorks_artwork">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v1 = {
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
  "name": "OtherWorks_artwork",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "includeRelatedArtworks",
          "value": false
        }
      ],
      "concreteType": null,
      "kind": "LinkedField",
      "name": "contextGrids",
      "plural": true,
      "selections": [
        (v0/*: any*/),
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
          "kind": "ScalarField",
          "name": "ctaTitle",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "ctaHref",
          "storageKey": null
        },
        {
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "first",
              "value": 8
            }
          ],
          "concreteType": "ArtworkConnection",
          "kind": "LinkedField",
          "name": "artworksConnection",
          "plural": false,
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "ArtworkGrid_artworks"
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "ArtworkEdge",
              "kind": "LinkedField",
              "name": "edges",
              "plural": true,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "Artwork",
                  "kind": "LinkedField",
                  "name": "node",
                  "plural": false,
                  "selections": [
                    (v1/*: any*/)
                  ],
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": "artworksConnection(first:8)"
        }
      ],
      "storageKey": "contextGrids(includeRelatedArtworks:false)"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtistSeriesArtworkRail_artwork"
    },
    (v1/*: any*/),
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
      "concreteType": "Sale",
      "kind": "LinkedField",
      "name": "sale",
      "plural": false,
      "selections": [
        {
          "alias": "is_closed",
          "args": null,
          "kind": "ScalarField",
          "name": "isClosed",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "context",
      "plural": false,
      "selections": [
        (v0/*: any*/)
      ],
      "storageKey": null
    },
    {
      "alias": "seriesArtist",
      "args": [
        {
          "kind": "Literal",
          "name": "shallow",
          "value": true
        }
      ],
      "concreteType": "Artist",
      "kind": "LinkedField",
      "name": "artist",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ArtistSeriesRail_artist"
        }
      ],
      "storageKey": "artist(shallow:true)"
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
})();

(node as any).hash = "0efdf87b1d36ab162d432a06d0283ef2";

export default node;
