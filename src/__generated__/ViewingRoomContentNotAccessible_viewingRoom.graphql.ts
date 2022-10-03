/**
 * @generated SignedSource<<8b84ae63255844e144aa2796e02b4bab>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ViewingRoomContentNotAccessible_viewingRoom$data = {
  readonly partner: {
    readonly href: string | null;
  } | null;
  readonly status: string;
  readonly " $fragmentType": "ViewingRoomContentNotAccessible_viewingRoom";
};
export type ViewingRoomContentNotAccessible_viewingRoom$key = {
  readonly " $data"?: ViewingRoomContentNotAccessible_viewingRoom$data;
  readonly " $fragmentSpreads": FragmentRefs<"ViewingRoomContentNotAccessible_viewingRoom">;
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

(node as any).hash = "fee7534dccbfac831698452070776d03";

export default node;
