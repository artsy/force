/**
 * @generated SignedSource<<c2d687cecf4772a5ced2e3967d84406e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistWorksForSaleRail_artist$data = {
  readonly artworksConnection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly internalID: string;
        readonly slug: string;
        readonly " $fragmentSpreads": FragmentRefs<"ShelfArtwork_artwork">;
      } | null;
    } | null> | null;
  } | null;
  readonly internalID: string;
  readonly slug: string;
  readonly " $fragmentType": "ArtistWorksForSaleRail_artist";
};
export type ArtistWorksForSaleRail_artist$key = {
  readonly " $data"?: ArtistWorksForSaleRail_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistWorksForSaleRail_artist">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
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
  "name": "ArtistWorksForSaleRail_artist",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 20
        },
        {
          "kind": "Literal",
          "name": "sort",
          "value": "AVAILABILITY_ASC"
        }
      ],
      "concreteType": "ArtworkConnection",
      "kind": "LinkedField",
      "name": "artworksConnection",
      "plural": false,
      "selections": [
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
                (v0/*: any*/),
                (v1/*: any*/),
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "ShelfArtwork_artwork"
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "artworksConnection(first:20,sort:\"AVAILABILITY_ASC\")"
    },
    (v0/*: any*/),
    (v1/*: any*/)
  ],
  "type": "Artist",
  "abstractKey": null
};
})();

(node as any).hash = "67f0c44c49040adff0455f06b2ec214d";

export default node;
