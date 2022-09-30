/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PartnerArtistsCarousel_partner = {
    readonly slug: string;
    readonly artistsConnection: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly internalID: string;
                readonly slug: string;
                readonly " $fragmentRefs": FragmentRefs<"CellArtist_artist">;
            } | null;
        } | null> | null;
    } | null;
    readonly " $refType": "PartnerArtistsCarousel_partner";
};
export type PartnerArtistsCarousel_partner$data = PartnerArtistsCarousel_partner;
export type PartnerArtistsCarousel_partner$key = {
    readonly " $data"?: PartnerArtistsCarousel_partner$data | undefined;
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
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "displayOnPartnerProfile",
          "value": true
        },
        {
          "kind": "Literal",
          "name": "first",
          "value": 20
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
              "concreteType": "Artist",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "internalID",
                  "storageKey": null
                },
                (v0/*: any*/),
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "CellArtist_artist"
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "artistsConnection(displayOnPartnerProfile:true,first:20,hasPublishedArtworks:true)"
    }
  ],
  "type": "Partner",
  "abstractKey": null
};
})();
(node as any).hash = '29d1837af9e22e88c9fd85a64a7317f2';
export default node;
