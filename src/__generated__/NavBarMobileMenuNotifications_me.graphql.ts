/**
 * @generated SignedSource<<f3612dffe88ecd2b814abbdb3fa7efd4>>
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
  readonly unseenNotificationsCount: number;
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "unseenNotificationsCount",
      "storageKey": null
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "edc8de2d253d1ce56d8c58bfb45abe93";

export default node;
