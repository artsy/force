/**
 * @generated SignedSource<<436ce5cfe879313b40f197c86e5e6b29>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NotificationApp_me$data = {
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

(node as any).hash = "a532eb63f088d4e3238f0fe688583e36";

export default node;
