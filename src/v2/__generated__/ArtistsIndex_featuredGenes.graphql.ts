/**
 * @generated SignedSource<<2d0bbc1dd6c373e983644ddd7dae7507>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistsIndex_featuredGenes$data = ReadonlyArray<{
  readonly name: string | null;
  readonly genes: ReadonlyArray<{
    readonly internalID?: string;
    readonly name?: string | null;
    readonly href?: string | null;
    readonly trendingArtists?: ReadonlyArray<{
      readonly internalID: string;
      readonly " $fragmentSpreads": FragmentRefs<"ArtistsArtistCard_artist">;
    } | null> | null;
  } | null> | null;
  readonly " $fragmentType": "ArtistsIndex_featuredGenes";
}>;
export type ArtistsIndex_featuredGenes$key = ReadonlyArray<{
  readonly " $data"?: ArtistsIndex_featuredGenes$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistsIndex_featuredGenes">;
}>;

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "ArtistsIndex_featuredGenes",
  "selections": [
    (v0/*: any*/),
    {
      "alias": "genes",
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "items",
      "plural": true,
      "selections": [
        {
          "kind": "InlineFragment",
          "selections": [
            (v1/*: any*/),
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
              "args": [
                {
                  "kind": "Literal",
                  "name": "sample",
                  "value": 4
                }
              ],
              "concreteType": "Artist",
              "kind": "LinkedField",
              "name": "trendingArtists",
              "plural": true,
              "selections": [
                (v1/*: any*/),
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "ArtistsArtistCard_artist"
                }
              ],
              "storageKey": "trendingArtists(sample:4)"
            }
          ],
          "type": "Gene",
          "abstractKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "OrderedSet",
  "abstractKey": null
};
})();

(node as any).hash = "64b07efb8dc9cb2ad5f98213e6216081";

export default node;
