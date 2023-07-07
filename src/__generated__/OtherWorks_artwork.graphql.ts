/**
 * @generated SignedSource<<a0f826a8f88a8e7bb29ba16f3a0a0c13>>
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
  readonly slug: string;
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
    (v1/*: any*/),
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
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
})();

(node as any).hash = "dbc77ea065b65ce50d176f210a11be0c";

export default node;
