/**
 * @generated SignedSource<<9a101760c13c0b2d2e3a3ad150df3886>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type LabelSignalEnum = "CURATORS_PICK" | "INCREASED_INTEREST" | "PARTNER_OFFER" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type HomeRecentlyViewedRail_homePage$data = {
  readonly artworkModule: {
    readonly results: ReadonlyArray<{
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
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "HomeRecentlyViewedRail_homePage";
};
export type HomeRecentlyViewedRail_homePage$key = {
  readonly " $data"?: HomeRecentlyViewedRail_homePage$data;
  readonly " $fragmentSpreads": FragmentRefs<"HomeRecentlyViewedRail_homePage">;
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
  "name": "HomeRecentlyViewedRail_homePage",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "key",
          "value": "RECENTLY_VIEWED_WORKS"
        }
      ],
      "concreteType": "HomePageArtworkModule",
      "kind": "LinkedField",
      "name": "artworkModule",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Artwork",
          "kind": "LinkedField",
          "name": "results",
          "plural": true,
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
      "storageKey": "artworkModule(key:\"RECENTLY_VIEWED_WORKS\")"
    }
  ],
  "type": "HomePage",
  "abstractKey": null
};

(node as any).hash = "81b2db45db2f6ce0bff4ddab664e2d9f";

export default node;
