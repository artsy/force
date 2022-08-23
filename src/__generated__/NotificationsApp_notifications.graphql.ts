/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type NotificationsApp_notifications = {
    readonly edges: ReadonlyArray<{
        readonly node: {
            readonly internalID: string;
            readonly " $fragmentRefs": FragmentRefs<"NotificationItem_item">;
        } | null;
    } | null> | null;
    readonly " $refType": "NotificationsApp_notifications";
};
export type NotificationsApp_notifications$data = NotificationsApp_notifications;
export type NotificationsApp_notifications$key = {
    readonly " $data"?: NotificationsApp_notifications$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"NotificationsApp_notifications">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NotificationsApp_notifications",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "NotificationEdge",
      "kind": "LinkedField",
      "name": "edges",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Notification",
          "kind": "LinkedField",
          "name": "node",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "internalID",
              "storageKey": null
            },
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "NotificationItem_item"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "NotificationConnection",
  "abstractKey": null
};
(node as any).hash = 'bbd4eb0ecc0d66e5fece34484dae9163';
export default node;
