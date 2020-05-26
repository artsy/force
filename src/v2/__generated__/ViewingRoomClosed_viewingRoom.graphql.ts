/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ViewingRoomClosed_viewingRoom = {
    readonly partner: {
        readonly href: string | null;
    } | null;
    readonly " $refType": "ViewingRoomClosed_viewingRoom";
};
export type ViewingRoomClosed_viewingRoom$data = ViewingRoomClosed_viewingRoom;
export type ViewingRoomClosed_viewingRoom$key = {
    readonly " $data"?: ViewingRoomClosed_viewingRoom$data;
    readonly " $fragmentRefs": FragmentRefs<"ViewingRoomClosed_viewingRoom">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "ViewingRoomClosed_viewingRoom",
  "type": "ViewingRoom",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
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
(node as any).hash = '6bd511c97fcfdf50711b53bcf45cc54c';
export default node;
