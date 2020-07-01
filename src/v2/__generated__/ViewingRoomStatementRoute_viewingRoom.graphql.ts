/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ViewingRoomStatementRoute_viewingRoom = {
    readonly artworksConnection: {
        readonly totalCount: number | null;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"ViewingRoomIntro_viewingRoom" | "ViewingRoomWorks_viewingRoom" | "ViewingRoomPullQuote_viewingRoom" | "ViewingRoomBody_viewingRoom" | "ViewingRoomSubsections_viewingRoom">;
    readonly " $refType": "ViewingRoomStatementRoute_viewingRoom";
};
export type ViewingRoomStatementRoute_viewingRoom$data = ViewingRoomStatementRoute_viewingRoom;
export type ViewingRoomStatementRoute_viewingRoom$key = {
    readonly " $data"?: ViewingRoomStatementRoute_viewingRoom$data;
    readonly " $fragmentRefs": FragmentRefs<"ViewingRoomStatementRoute_viewingRoom">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "ViewingRoomStatementRoute_viewingRoom",
  "type": "ViewingRoom",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "artworksConnection",
      "storageKey": "artworksConnection(first:2)",
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 2
        }
      ],
      "concreteType": "ArtworkConnection",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "totalCount",
          "args": null,
          "storageKey": null
        }
      ]
    },
    {
      "kind": "FragmentSpread",
      "name": "ViewingRoomIntro_viewingRoom",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ViewingRoomWorks_viewingRoom",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ViewingRoomPullQuote_viewingRoom",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ViewingRoomBody_viewingRoom",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ViewingRoomSubsections_viewingRoom",
      "args": null
    }
  ]
};
(node as any).hash = 'eb89dc547a16f9d2e7413352b51ab944';
export default node;
