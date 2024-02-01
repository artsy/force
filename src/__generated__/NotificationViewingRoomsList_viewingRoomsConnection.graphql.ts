/**
 * @generated SignedSource<<1da8f325c9fe110e9d79685200ef047c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NotificationViewingRoomsList_viewingRoomsConnection$data = {
  readonly edges: ReadonlyArray<{
    readonly node: {
      readonly internalID: string;
      readonly " $fragmentSpreads": FragmentRefs<"NotificationViewingRoom_viewingRoom">;
    } | null | undefined;
  } | null | undefined> | null | undefined;
  readonly " $fragmentType": "NotificationViewingRoomsList_viewingRoomsConnection";
};
export type NotificationViewingRoomsList_viewingRoomsConnection$key = {
  readonly " $data"?: NotificationViewingRoomsList_viewingRoomsConnection$data;
  readonly " $fragmentSpreads": FragmentRefs<"NotificationViewingRoomsList_viewingRoomsConnection">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NotificationViewingRoomsList_viewingRoomsConnection",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ViewingRoomsEdge",
      "kind": "LinkedField",
      "name": "edges",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ViewingRoom",
          "kind": "LinkedField",
          "name": "node",
          "plural": false,
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "NotificationViewingRoom_viewingRoom"
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "internalID",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ViewingRoomsConnection",
  "abstractKey": null
};

(node as any).hash = "e47be87bfa1933e5f0e43d0b7ded09b0";

export default node;
