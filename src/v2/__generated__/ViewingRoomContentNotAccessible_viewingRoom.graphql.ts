/**
 * @generated SignedSource<<8639d272f6d812d6395f32f633babc89>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ViewingRoomContentNotAccessible_viewingRoom$data = {
  readonly status: string;
  readonly partner: {
    readonly href: string | null;
  } | null;
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
