/**
 * @generated SignedSource<<0897c7c5a89d9c36efb9412c789dd9d2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NotificationsApp_me$data = {
  readonly unreadNotificationsCount: number;
  readonly " $fragmentType": "NotificationsApp_me";
};
export type NotificationsApp_me$key = {
  readonly " $data"?: NotificationsApp_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"NotificationsApp_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NotificationsApp_me",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "unreadNotificationsCount",
      "storageKey": null
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "14dbb767eaa152c635acc649e417f853";

export default node;
