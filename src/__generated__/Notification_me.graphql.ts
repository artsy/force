/**
 * @generated SignedSource<<3658f4e2ff102c75bec79aa0efd002f5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Notification_me$data = {
  readonly notification: {
    readonly title: string;
  } | null | undefined;
  readonly " $fragmentType": "Notification_me";
};
export type Notification_me$key = {
  readonly " $data"?: Notification_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"Notification_me">;
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
  "name": "Notification_me",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Variable",
          "name": "id",
          "variableName": "notificationId"
        }
      ],
      "concreteType": "Notification",
      "kind": "LinkedField",
      "name": "notification",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "title",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "cc5b8614334e0f7fc04430c2b439a66b";

export default node;
