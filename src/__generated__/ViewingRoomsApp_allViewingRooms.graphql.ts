/**
 * @generated SignedSource<<dbfa96bf8f3b0e4c5a67d7b141cbae2e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ViewingRoomsApp_allViewingRooms$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ViewingRoomsLatestGrid_viewingRooms">;
  readonly " $fragmentType": "ViewingRoomsApp_allViewingRooms";
};
export type ViewingRoomsApp_allViewingRooms$key = {
  readonly " $data"?: ViewingRoomsApp_allViewingRooms$data;
  readonly " $fragmentSpreads": FragmentRefs<"ViewingRoomsApp_allViewingRooms">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "after"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "count"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "ViewingRoomsApp_allViewingRooms",
  "selections": [
    {
      "args": [
        {
          "kind": "Variable",
          "name": "after",
          "variableName": "after"
        },
        {
          "kind": "Variable",
          "name": "count",
          "variableName": "count"
        }
      ],
      "kind": "FragmentSpread",
      "name": "ViewingRoomsLatestGrid_viewingRooms"
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};

(node as any).hash = "bac462a0b1f43ecffedeb54a49be7a86";

export default node;
