/**
 * @generated SignedSource<<83213f5102b8b378e31a4c7e2ee036ee>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebarShowingNow_artwork$data = {
  readonly collectorSignals: {
    readonly runningShow: {
      readonly endAt: string | null | undefined;
      readonly href: string | null | undefined;
      readonly name: string | null | undefined;
      readonly startAt: string | null | undefined;
    } | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "ArtworkSidebarShowingNow_artwork";
};
export type ArtworkSidebarShowingNow_artwork$key = {
  readonly " $data"?: ArtworkSidebarShowingNow_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkSidebarShowingNow_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkSidebarShowingNow_artwork",
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

(node as any).hash = "6bf4be92826714edf338194af9c7dea0";

export default node;
