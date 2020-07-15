/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ViewingRoomContentNotAccessible_viewingRoom = {
    readonly status: string;
    readonly partner: {
        readonly href: string | null;
    } | null;
    readonly " $refType": "ViewingRoomContentNotAccessible_viewingRoom";
};
export type ViewingRoomContentNotAccessible_viewingRoom$data = ViewingRoomContentNotAccessible_viewingRoom;
export type ViewingRoomContentNotAccessible_viewingRoom$key = {
    readonly " $data"?: ViewingRoomContentNotAccessible_viewingRoom$data;
    readonly " $fragmentRefs": FragmentRefs<"ViewingRoomContentNotAccessible_viewingRoom">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "ViewingRoomContentNotAccessible_viewingRoom",
  "type": "ViewingRoom",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "status",
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
          "name": "href",
          "args": null,
          "storageKey": null
        }
      ]
    }
  ]
};
(node as any).hash = 'fee7534dccbfac831698452070776d03';
export default node;
