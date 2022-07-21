/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SubGroupStatus = "SUBSCRIBED" | "UNSUBSCRIBED" | "%future added value";
export type SavedSearchAlertEditForm_viewer = {
    readonly notificationPreferences: ReadonlyArray<{
        readonly status: SubGroupStatus;
        readonly name: string;
        readonly channel: string;
    }>;
    readonly " $refType": "SavedSearchAlertEditForm_viewer";
};
export type SavedSearchAlertEditForm_viewer$data = SavedSearchAlertEditForm_viewer;
export type SavedSearchAlertEditForm_viewer$key = {
    readonly " $data"?: SavedSearchAlertEditForm_viewer$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"SavedSearchAlertEditForm_viewer">;
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
(node as any).hash = '7793cf50a0f573d8b329a1de785b2cfe';
export default node;
