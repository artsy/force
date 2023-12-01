/**
 * @generated SignedSource<<6ebea59df1e6794ab929625ca9cdefed>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type SubGroupStatus = "SUBSCRIBED" | "UNSUBSCRIBED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type EmailPreferenceWarningMessage_viewer$data = {
  readonly notificationPreferences: ReadonlyArray<{
    readonly channel: string;
    readonly name: string;
    readonly status: SubGroupStatus;
  }>;
  readonly " $fragmentType": "EmailPreferenceWarningMessage_viewer";
};
export type EmailPreferenceWarningMessage_viewer$key = {
  readonly " $data"?: EmailPreferenceWarningMessage_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"EmailPreferenceWarningMessage_viewer">;
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
  "name": "EmailPreferenceWarningMessage_viewer",
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

(node as any).hash = "e76be824e2eadf69fd3e4d9a4ed1a9c8";

export default node;
