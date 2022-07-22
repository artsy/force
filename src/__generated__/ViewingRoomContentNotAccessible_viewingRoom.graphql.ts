/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

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
    readonly " $data"?: ViewingRoomContentNotAccessible_viewingRoom$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ViewingRoomContentNotAccessible_viewingRoom">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ViewingRoomContentNotAccessible_viewingRoom",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "status",
      "storageKey": null
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
          "name": "href",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ViewingRoom",
  "abstractKey": null
};
(node as any).hash = 'fee7534dccbfac831698452070776d03';
export default node;
