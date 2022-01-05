/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PartnerArtistsCarousel_partner = {
    readonly slug: string;
    readonly artists: {
        readonly edges: ReadonlyArray<{
            readonly counts: {
                readonly artworks: number | null;
            } | null;
            readonly node: {
                readonly id: string;
                readonly slug: string;
            } | null;
            readonly " $fragmentRefs": FragmentRefs<"PartnerArtistsCarouselItem_artist">;
        } | null> | null;
    } | null;
    readonly " $refType": "PartnerArtistsCarousel_partner";
};
export type PartnerArtistsCarousel_partner$data = PartnerArtistsCarousel_partner;
export type PartnerArtistsCarousel_partner$key = {
    readonly " $data"?: PartnerArtistsCarousel_partner$data;
    readonly " $fragmentRefs": FragmentRefs<"PartnerArtistsCarousel_partner">;
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
  "name": "PartnerArtistsCarousel_partner",
  "selections": [
    (v0/*: any*/),
    {
      "alias": "artists",
      "args": [
        {
          "kind": "Literal",
          "name": "displayOnPartnerProfile",
          "value": true
        },
        {
          "kind": "Literal",
          "name": "first",
          "value": 19
        },
        {
          "kind": "Literal",
          "name": "hasPublishedArtworks",
          "value": true
        }
      ],
      "concreteType": "ArtistPartnerConnection",
      "kind": "LinkedField",
      "name": "artistsConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ArtistPartnerEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "PartnerArtistCounts",
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
              "concreteType": "Artist",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "id",
                  "storageKey": null
                },
                (v0/*: any*/)
              ],
              "storageKey": null
            },
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "PartnerArtistsCarouselItem_artist"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "artistsConnection(displayOnPartnerProfile:true,first:19,hasPublishedArtworks:true)"
    }
  ],
  "type": "Partner"
};
})();
(node as any).hash = '2ce6d9009b596b4d17a0ce6d6b7cc4f4';
export default node;
