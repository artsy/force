/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ViewingRoomHeader_viewingRoom = {
    readonly heroImageURL: string | null;
    readonly title: string;
    readonly partner: {
        readonly name: string | null;
    } | null;
    readonly formattedEndAt: string | null;
    readonly " $refType": "ViewingRoomHeader_viewingRoom";
};
export type ViewingRoomHeader_viewingRoom$data = ViewingRoomHeader_viewingRoom;
export type ViewingRoomHeader_viewingRoom$key = {
    readonly " $data"?: ViewingRoomHeader_viewingRoom$data;
    readonly " $fragmentRefs": FragmentRefs<"ViewingRoomHeader_viewingRoom">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "ViewingRoomHeader_viewingRoom",
  "type": "ViewingRoom",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "heroImageURL",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "title",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "partner",
      "storageKey": null,
      "args": null,
      "concreteType": "Partner",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "name",
          "args": null,
          "storageKey": null
        }
      ]
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "formattedEndAt",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = 'd30a37f7ed489d8f410d4b330b8d4489';
export default node;
