/**
 * @generated SignedSource<<cd30e7a80ce24f11132324205298b841>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ViewingRooms_edges$data = ReadonlyArray<{
  readonly node: {
    readonly internalID: string;
    readonly " $fragmentSpreads": FragmentRefs<"ViewingRoomCard_viewingRoom">;
  } | null;
  readonly " $fragmentType": "ViewingRooms_edges";
}>;
export type ViewingRooms_edges$key = ReadonlyArray<{
  readonly " $data"?: ViewingRooms_edges$data;
  readonly " $fragmentSpreads": FragmentRefs<"ViewingRooms_edges">;
}>;

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "ViewingRooms_edges",
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
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "internalID",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ViewingRoomCard_viewingRoom"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ViewingRoomsEdge",
  "abstractKey": null
};

(node as any).hash = "10570b18f93a16f1d36cfb55965fc316";

export default node;
