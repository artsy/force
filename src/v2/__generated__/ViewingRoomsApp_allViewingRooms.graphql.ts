/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ViewingRoomsApp_allViewingRooms = {
    readonly " $fragmentRefs": FragmentRefs<"ViewingRoomsLatestGrid_viewingRooms">;
    readonly " $refType": "ViewingRoomsApp_allViewingRooms";
};
export type ViewingRoomsApp_allViewingRooms$data = ViewingRoomsApp_allViewingRooms;
export type ViewingRoomsApp_allViewingRooms$key = {
    readonly " $data"?: ViewingRoomsApp_allViewingRooms$data;
    readonly " $fragmentRefs": FragmentRefs<"ViewingRoomsApp_allViewingRooms">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "count",
      "type": "Int"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "after",
      "type": "String"
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
  "type": "Viewer"
};
(node as any).hash = 'bac462a0b1f43ecffedeb54a49be7a86';
export default node;
