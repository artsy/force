/**
 * @generated SignedSource<<aae94d475010b4220edd4e405c5c5316>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NavBarMobileMenuInboxNotificationCount_me$data = {
  readonly unreadConversationCount: number;
  readonly " $fragmentType": "NavBarMobileMenuInboxNotificationCount_me";
};
export type NavBarMobileMenuInboxNotificationCount_me$key = {
  readonly " $data"?: NavBarMobileMenuInboxNotificationCount_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"NavBarMobileMenuInboxNotificationCount_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NavBarMobileMenuInboxNotificationCount_me",
  "selections": [
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

(node as any).hash = "296a5304291f3e70216223c8348dc983";

export default node;
