/**
 * @generated SignedSource<<e8234de9afe5e94138c6f0ac3f71883d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type SubGroupStatus = "SUBSCRIBED" | "UNSUBSCRIBED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type NotificationPreferences_viewer$data = {
  readonly notificationPreferences: ReadonlyArray<{
    readonly channel: string;
    readonly name: string;
    readonly status: SubGroupStatus;
  }>;
  readonly " $fragmentType": "NotificationPreferences_viewer";
};
export type NotificationPreferences_viewer$key = {
  readonly " $data"?: NotificationPreferences_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"NotificationPreferences_viewer">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "authenticationToken"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "NotificationPreferences_viewer",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Variable",
          "name": "authenticationToken",
          "variableName": "authenticationToken"
        }
      ],
      "concreteType": "NotificationPreference",
      "kind": "LinkedField",
      "name": "notificationPreferences",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "channel",
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
          "name": "status",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};

(node as any).hash = "b8ec1dd81e66b8eb891c047f25b4be6c";

export default node;
