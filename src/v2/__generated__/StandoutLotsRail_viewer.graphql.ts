/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type StandoutLotsRail_viewer = {
    readonly StandoutLotsRailConnection: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly internalID: string;
                readonly slug: string;
                readonly sale: {
                    readonly isClosed: boolean | null;
                } | null;
                readonly " $fragmentRefs": FragmentRefs<"ShelfArtwork_artwork">;
            } | null;
        } | null> | null;
    } | null;
    readonly " $refType": "StandoutLotsRail_viewer";
};
export type StandoutLotsRail_viewer$data = StandoutLotsRail_viewer;
export type StandoutLotsRail_viewer$key = {
    readonly " $data"?: StandoutLotsRail_viewer$data;
    readonly " $fragmentRefs": FragmentRefs<"StandoutLotsRail_viewer">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StandoutLotsRail_viewer",
  "selections": [
    {
      "alias": "StandoutLotsRailConnection",
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 50
        },
        {
          "kind": "Literal",
          "name": "geneIDs",
          "value": "highlights-at-auction"
        }
      ],
      "concreteType": "SaleArtworksConnection",
      "kind": "LinkedField",
      "name": "saleArtworksConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "SaleArtwork",
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
                  "name": "internalID",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "slug",
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
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "isClosed",
                      "storageKey": null
                    }
                  ],
                  "storageKey": null
                },
                {
                  "args": [
                    {
                      "kind": "Literal",
                      "name": "width",
                      "value": 325
                    }
                  ],
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
      "storageKey": "saleArtworksConnection(first:50,geneIDs:\"highlights-at-auction\")"
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};
(node as any).hash = '014a1939216e5b896476d7c80e82e971';
export default node;
