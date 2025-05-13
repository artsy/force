/**
 * @generated SignedSource<<25b59086cc55bbc3cb1509747264e895>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ViewingRoomApp_viewingRoom$data = {
  readonly internalID: string;
  readonly partner: {
    readonly internalID: string;
  } | null | undefined;
  readonly status: string;
  readonly " $fragmentSpreads": FragmentRefs<"ViewingRoomContentNotAccessible_viewingRoom" | "ViewingRoomHeader_viewingRoom" | "ViewingRoomMeta_viewingRoom" | "ViewingRoomStructuredData_viewingRoom">;
  readonly " $fragmentType": "ViewingRoomApp_viewingRoom";
};
export type ViewingRoomApp_viewingRoom$key = {
  readonly " $data"?: ViewingRoomApp_viewingRoom$data;
  readonly " $fragmentSpreads": FragmentRefs<"ViewingRoomApp_viewingRoom">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
};
return {
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "ViewingRoomStructuredData_viewingRoom"
    },
    (v0/*: any*/),
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
        (v0/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "ViewingRoom",
  "abstractKey": null
};
})();

(node as any).hash = "878cf655cc8bca7b2a444e2601072036";

export default node;
