/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type NotificationsList_notifications = {
    readonly edges: ReadonlyArray<{
        readonly node: {
            readonly internalID: string;
            readonly " $fragmentRefs": FragmentRefs<"NotificationItem_item">;
        } | null;
    } | null> | null;
    readonly " $refType": "NotificationsList_notifications";
};
export type NotificationsList_notifications$data = NotificationsList_notifications;
export type NotificationsList_notifications$key = {
    readonly " $data"?: NotificationsList_notifications$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"NotificationsList_notifications">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NotificationsList_notifications",
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
(node as any).hash = '0243c3ed55bab22f316eab75ba076256';
export default node;
