/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworksRail_partner = {
    readonly slug: string;
    readonly filterArtworksConnection: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly id: string;
                readonly " $fragmentRefs": FragmentRefs<"FillwidthItem_artwork">;
            } | null;
        } | null> | null;
    } | null;
    readonly " $refType": "ArtworksRail_partner";
};
export type ArtworksRail_partner$data = ArtworksRail_partner;
export type ArtworksRail_partner$key = {
    readonly " $data"?: ArtworksRail_partner$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtworksRail_partner">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworksRail_partner",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 14
        },
        {
          "kind": "Literal",
          "name": "forSale",
          "value": true
        },
        {
          "kind": "Literal",
          "name": "sort",
          "value": "-partner_updated_at"
        }
      ],
      "concreteType": "FilterArtworksConnection",
      "kind": "LinkedField",
      "name": "filterArtworksConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "FilterArtworksEdge",
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
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "id",
                  "storageKey": null
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "FillwidthItem_artwork"
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "filterArtworksConnection(first:14,forSale:true,sort:\"-partner_updated_at\")"
    }
  ],
  "type": "Partner"
};
(node as any).hash = 'e2d311845170acc5d9456dfdb701e0ac';
export default node;
