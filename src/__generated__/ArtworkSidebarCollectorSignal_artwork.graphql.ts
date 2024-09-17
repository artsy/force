/**
 * @generated SignedSource<<a42b85b8656cd31ca2c4fccd481bdd84>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
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
          "args": null,
          "kind": "ScalarField",
          "name": "primaryLabel",
          "storageKey": null
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

(node as any).hash = "d96a67b5d8fb964d2a53ed8af0648861";

export default node;
