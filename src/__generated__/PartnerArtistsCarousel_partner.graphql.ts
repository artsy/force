/**
 * @generated SignedSource<<8434e7905032bab6eb3e15de7733747c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PartnerArtistsCarousel_partner$data = {
  readonly artistsConnection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly internalID: string;
        readonly slug: string;
      } | null | undefined;
      readonly " $fragmentSpreads": FragmentRefs<"CellPartnerArtist_partnerArtist">;
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly slug: string;
  readonly " $fragmentType": "PartnerArtistsCarousel_partner";
};
export type PartnerArtistsCarousel_partner$key = {
  readonly " $data"?: PartnerArtistsCarousel_partner$data;
  readonly " $fragmentSpreads": FragmentRefs<"PartnerArtistsCarousel_partner">;
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
                (v0/*: any*/)
              ],
              "storageKey": null
            },
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "CellPartnerArtist_partnerArtist"
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

(node as any).hash = "5a2a04dc5419e09f9180b7b52bae6077";

export default node;
