/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SubGroupStatus = "SUBSCRIBED" | "UNSUBSCRIBED" | "%future added value";
export type PreferencesApp_viewer = {
    readonly notificationPreferences: ReadonlyArray<{
        readonly id: string;
        readonly name: string;
        readonly channel: string;
        readonly status: SubGroupStatus;
    }>;
    readonly " $refType": "PreferencesApp_viewer";
};
export type PreferencesApp_viewer$data = PreferencesApp_viewer;
export type PreferencesApp_viewer$key = {
    readonly " $data"?: PreferencesApp_viewer$data;
    readonly " $fragmentRefs": FragmentRefs<"PreferencesApp_viewer">;
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
  "name": "PreferencesApp_viewer",
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
          "name": "id",
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
(node as any).hash = '407ddcff82ae4483ee244e3633b65cc9';
export default node;
