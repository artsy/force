/**
 * @generated SignedSource<<d13f8aee6d4d870198b082c64cc50f2e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkErrorAppOtherWorks_artwork$data = {
  readonly context: {
    readonly __typename: string;
  } | null | undefined;
  readonly contextGrids: ReadonlyArray<{
    readonly __typename: string;
    readonly artworksConnection: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly slug: string;
        } | null | undefined;
      } | null | undefined> | null | undefined;
      readonly " $fragmentSpreads": FragmentRefs<"ArtworkGrid_artworks">;
    } | null | undefined;
    readonly ctaHref: string | null | undefined;
    readonly ctaTitle: string | null | undefined;
    readonly title: string | null | undefined;
  } | null | undefined> | null | undefined;
  readonly slug: string;
  readonly " $fragmentType": "ArtworkErrorAppOtherWorks_artwork";
};
export type ArtworkErrorAppOtherWorks_artwork$key = {
  readonly " $data"?: ArtworkErrorAppOtherWorks_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkErrorAppOtherWorks_artwork">;
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
  "name": "ArtworkErrorAppOtherWorks_artwork",
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
  "type": "PartialArtwork",
  "abstractKey": null
};
})();

(node as any).hash = "401e478156f81129f6c00b635e8f0ecf";

export default node;
