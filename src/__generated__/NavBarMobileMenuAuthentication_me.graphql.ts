/**
 * @generated SignedSource<<1c16a60cdc27939da2dcd047350f2428>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NavBarMobileMenuAuthentication_me$data = {
  readonly unreadConversationCount: number;
  readonly unreadNotificationsCount: number;
  readonly " $fragmentType": "NavBarMobileMenuAuthentication_me";
};
export type NavBarMobileMenuAuthentication_me$key = {
  readonly " $data"?: NavBarMobileMenuAuthentication_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"NavBarMobileMenuAuthentication_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NavBarMobileMenuAuthentication_me",
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

(node as any).hash = "55605d871ddab628fa4b2e82b5e91142";

export default node;
