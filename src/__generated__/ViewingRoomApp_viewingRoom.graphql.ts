/**
 * @generated SignedSource<<e910b96fc6a0d08871ed6502ae0723aa>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ViewingRoomApp_viewingRoom$data = {
  readonly internalID: string;
  readonly partner: {
    readonly internalID: string;
  } | null | undefined;
  readonly status: string;
  readonly " $fragmentSpreads": FragmentRefs<"ViewingRoomContentNotAccessible_viewingRoom" | "ViewingRoomHeader_viewingRoom" | "ViewingRoomMeta_viewingRoom">;
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

(node as any).hash = "2d21bb76bccd60f41b8510ed547e84cd";

export default node;
