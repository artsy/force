/**
 * @generated SignedSource<<ac8d3ff7e058095fbd7c3a7597fa4922>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ViewingRoomApp_viewingRoom$data = {
  readonly partner: {
    readonly internalID: string;
  } | null;
  readonly status: string;
  readonly " $fragmentSpreads": FragmentRefs<"ViewingRoomMeta_viewingRoom" | "ViewingRoomHeader_viewingRoom" | "ViewingRoomContentNotAccessible_viewingRoom">;
  readonly " $fragmentType": "ViewingRoomApp_viewingRoom";
};
export type ViewingRoomApp_viewingRoom$key = {
  readonly " $data"?: ViewingRoomApp_viewingRoom$data;
  readonly " $fragmentSpreads": FragmentRefs<"ViewingRoomApp_viewingRoom">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ViewingRoomApp_viewingRoom",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ViewingRoomMeta_viewingRoom"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ViewingRoomHeader_viewingRoom"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ViewingRoomContentNotAccessible_viewingRoom"
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Partner",
      "kind": "LinkedField",
      "name": "partner",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "internalID",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "status",
      "storageKey": null
    }
  ],
  "type": "ViewingRoom",
  "abstractKey": null
};

(node as any).hash = "42b4a4acd26b4325cfef0fefd73552d6";

export default node;
