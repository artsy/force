/**
 * @generated SignedSource<<6deabcabeb81cb646aadb08e0f6e1ff6>>
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
      "name": "unreadConversationCount",
      "storageKey": null
    },
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

(node as any).hash = "69a3bbf8b3824cd16d5dfd404cca3e0a";

export default node;
