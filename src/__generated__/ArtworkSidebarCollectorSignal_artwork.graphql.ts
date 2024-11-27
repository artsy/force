/**
 * @generated SignedSource<<cdd0ee9a46507ee60e7a4b4559cc1311>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type LabelSignalEnum = "CURATORS_PICK" | "INCREASED_INTEREST" | "PARTNER_OFFER" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebarCollectorSignal_artwork$data = {
  readonly collectorSignals: {
    readonly primaryLabel: LabelSignalEnum | null | undefined;
    readonly runningShow: {
      readonly endAt: string | null | undefined;
      readonly href: string | null | undefined;
      readonly name: string | null | undefined;
      readonly startAt: string | null | undefined;
    } | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "ArtworkSidebarCollectorSignal_artwork";
};
export type ArtworkSidebarCollectorSignal_artwork$key = {
  readonly " $data"?: ArtworkSidebarCollectorSignal_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkSidebarCollectorSignal_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkSidebarCollectorSignal_artwork",
  "selections": [
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
              "kind": "Literal",
              "name": "ignore",
              "value": [
                "PARTNER_OFFER"
              ]
            }
          ],
          "kind": "ScalarField",
          "name": "primaryLabel",
          "storageKey": "primaryLabel(ignore:[\"PARTNER_OFFER\"])"
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Show",
          "kind": "LinkedField",
          "name": "runningShow",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "name",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "href",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "startAt",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "endAt",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "6519c75d094bd73720b3820c86d1bb7f";

export default node;
