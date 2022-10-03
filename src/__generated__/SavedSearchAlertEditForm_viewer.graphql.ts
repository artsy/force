/**
 * @generated SignedSource<<cb132bb4510fdcdfd661b7c964229b69>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type SubGroupStatus = "SUBSCRIBED" | "UNSUBSCRIBED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type SavedSearchAlertEditForm_viewer$data = {
  readonly notificationPreferences: ReadonlyArray<{
    readonly channel: string;
    readonly name: string;
    readonly status: SubGroupStatus;
  }>;
  readonly " $fragmentType": "SavedSearchAlertEditForm_viewer";
};
export type SavedSearchAlertEditForm_viewer$key = {
  readonly " $data"?: SavedSearchAlertEditForm_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"SavedSearchAlertEditForm_viewer">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SavedSearchAlertEditForm_viewer",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "NotificationPreference",
      "kind": "LinkedField",
      "name": "notificationPreferences",
      "plural": true,
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
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "channel",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};

(node as any).hash = "7793cf50a0f573d8b329a1de785b2cfe";

export default node;
