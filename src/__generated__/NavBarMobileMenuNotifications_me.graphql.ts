/**
 * @generated SignedSource<<256df34dea610f5b0f0c98e34048963f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NavBarMobileMenuNotifications_me$data = {
  readonly unreadConversationCount: number;
  readonly unreadNotificationsCount: number;
  readonly " $fragmentType": "NavBarMobileMenuNotifications_me";
};
export type NavBarMobileMenuNotifications_me$key = {
  readonly " $data"?: NavBarMobileMenuNotifications_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"NavBarMobileMenuNotifications_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NavBarMobileMenuNotifications_me",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "unreadNotificationsCount",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "unreadConversationCount",
      "storageKey": null
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "0064720241150f809384bc103216037a";

export default node;
