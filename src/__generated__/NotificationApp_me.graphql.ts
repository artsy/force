/**
 * @generated SignedSource<<5905e4d468f112493aaf238b934a74a0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NotificationApp_me$data = {
  readonly unreadNotificationsCount: number;
  readonly " $fragmentSpreads": FragmentRefs<"Notification_me">;
  readonly " $fragmentType": "NotificationApp_me";
};
export type NotificationApp_me$key = {
  readonly " $data"?: NotificationApp_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"NotificationApp_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "notificationId"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "NotificationApp_me",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "unreadNotificationsCount",
      "storageKey": null
    },
    {
      "args": [
        {
          "kind": "Variable",
          "name": "notificationId",
          "variableName": "notificationId"
        }
      ],
      "kind": "FragmentSpread",
      "name": "Notification_me"
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "3022b028f7b6190f1ef863e9d3e9c18d";

export default node;
