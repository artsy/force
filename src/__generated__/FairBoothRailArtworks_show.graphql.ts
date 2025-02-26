/**
 * @generated SignedSource<<2b5ab9b966696a3b28c6076fde16c8a4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type LabelSignalEnum = "CURATORS_PICK" | "INCREASED_INTEREST" | "PARTNER_OFFER" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type FairBoothRailArtworks_show$data = {
  readonly artworksConnection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly collectorSignals: {
          readonly auction: {
            readonly bidCount: number;
            readonly lotWatcherCount: number;
          } | null | undefined;
          readonly primaryLabel: LabelSignalEnum | null | undefined;
        } | null | undefined;
        readonly internalID: string;
        readonly slug: string;
        readonly " $fragmentSpreads": FragmentRefs<"ShelfArtwork_artwork">;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "FairBoothRailArtworks_show";
};
export type FairBoothRailArtworks_show$key = {
  readonly " $data"?: FairBoothRailArtworks_show$data;
  readonly " $fragmentSpreads": FragmentRefs<"FairBoothRailArtworks_show">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FairBoothRailArtworks_show",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 20
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
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "ShelfArtwork_artwork"
                },
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
                  "concreteType": "CollectorSignals",
                  "kind": "LinkedField",
                  "name": "collectorSignals",
                  "plural": false,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "primaryLabel",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "concreteType": "AuctionCollectorSignals",
                      "kind": "LinkedField",
                      "name": "auction",
                      "plural": false,
                      "selections": [
                        {
                          "alias": null,
                          "args": null,
                          "kind": "ScalarField",
                          "name": "bidCount",
                          "storageKey": null
                        },
                        {
                          "alias": null,
                          "args": null,
                          "kind": "ScalarField",
                          "name": "lotWatcherCount",
                          "storageKey": null
                        }
                      ],
                      "storageKey": null
                    }
                  ],
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "artworksConnection(first:20)"
    }
  ],
  "type": "Show",
  "abstractKey": null
};

(node as any).hash = "6d38f5faad5f661d8efd3c9f887cca71";

export default node;
