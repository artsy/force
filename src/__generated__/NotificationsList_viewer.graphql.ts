/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type NotificationsList_viewer = {
    readonly notifications: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly internalID: string;
                readonly " $fragmentRefs": FragmentRefs<"NotificationItem_item">;
            } | null;
        } | null> | null;
    } | null;
    readonly " $refType": "NotificationsList_viewer";
};
export type NotificationsList_viewer$data = NotificationsList_viewer;
export type NotificationsList_viewer$key = {
    readonly " $data"?: NotificationsList_viewer$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"NotificationsList_viewer">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NotificationsList_viewer",
  "selections": [
    {
      "alias": "notifications",
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 10
        }
      ],
      "concreteType": "NotificationConnection",
      "kind": "LinkedField",
      "name": "notificationsConnection",
      "plural": false,
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
      "storageKey": "notificationsConnection(first:10)"
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};
(node as any).hash = '86592ba5edad92bee58f00361828e4ae';
export default node;
