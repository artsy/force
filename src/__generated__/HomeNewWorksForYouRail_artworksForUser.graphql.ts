/**
 * @generated SignedSource<<bb898d63344301e66a55b8348e6a2577>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type LabelSignalEnum = "CURATORS_PICK" | "INCREASED_INTEREST" | "PARTNER_OFFER" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type HomeNewWorksForYouRail_artworksForUser$data = {
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
  readonly " $fragmentType": "HomeNewWorksForYouRail_artworksForUser";
};
export type HomeNewWorksForYouRail_artworksForUser$key = {
  readonly " $data"?: HomeNewWorksForYouRail_artworksForUser$data;
  readonly " $fragmentSpreads": FragmentRefs<"HomeNewWorksForYouRail_artworksForUser">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "ignorePrimaryLabelSignals"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "HomeNewWorksForYouRail_artworksForUser",
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
                  "args": [
                    {
                      "kind": "Variable",
                      "name": "ignore",
                      "variableName": "ignorePrimaryLabelSignals"
                    }
                  ],
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
            },
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
  "type": "ArtworkConnection",
  "abstractKey": null
};

(node as any).hash = "3d37686d2f266657293a87ded52446b1";

export default node;
