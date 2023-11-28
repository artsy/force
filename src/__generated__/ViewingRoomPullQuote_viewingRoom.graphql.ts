/**
 * @generated SignedSource<<4218a09c771b93004a70e03bd38e6c17>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ViewingRoomPullQuote_viewingRoom$data = {
  readonly pullQuote: string | null | undefined;
  readonly " $fragmentType": "ViewingRoomPullQuote_viewingRoom";
};
export type ViewingRoomPullQuote_viewingRoom$key = {
  readonly " $data"?: ViewingRoomPullQuote_viewingRoom$data;
  readonly " $fragmentSpreads": FragmentRefs<"ViewingRoomPullQuote_viewingRoom">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ViewingRoomPullQuote_viewingRoom",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "pullQuote",
      "storageKey": null
    }
  ],
  "type": "ViewingRoom",
  "abstractKey": null
};

(node as any).hash = "69ccb558158ea6f401e3263146f93fd2";

export default node;
