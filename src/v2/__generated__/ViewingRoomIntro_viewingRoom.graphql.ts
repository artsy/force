/**
 * @generated SignedSource<<9592e24579bccb5edda6082baf7565d1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ViewingRoomIntro_viewingRoom$data = {
  readonly introStatement: string | null;
  readonly " $fragmentType": "ViewingRoomIntro_viewingRoom";
};
export type ViewingRoomIntro_viewingRoom$key = {
  readonly " $data"?: ViewingRoomIntro_viewingRoom$data;
  readonly " $fragmentSpreads": FragmentRefs<"ViewingRoomIntro_viewingRoom">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ViewingRoomIntro_viewingRoom",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "introStatement",
      "storageKey": null
    }
  ],
  "type": "ViewingRoom",
  "abstractKey": null
};

(node as any).hash = "f6bd6fd9181c2b21295bf6f5bc6d3aff";

export default node;
