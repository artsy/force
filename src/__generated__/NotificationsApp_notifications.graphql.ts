/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type NotificationsApp_notifications = {
    readonly " $fragmentRefs": FragmentRefs<"NotificationsList_notifications">;
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "NotificationsList_notifications"
    }
  ],
  "type": "NotificationConnection",
  "abstractKey": null
};
(node as any).hash = '01d1277234b9e3d2cdd3552ed9aab14d';
export default node;
