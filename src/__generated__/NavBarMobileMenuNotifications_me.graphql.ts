/**
 * @generated SignedSource<<af795367ac1f2af287dc08f40f19895e>>
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
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "10848da25fd78911cb13ff93b1ea9fc1";

export default node;
