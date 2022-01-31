/**
 * @generated SignedSource<<50ee788e1e165bb5712d65b16e2ae93d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NavBarMobileMenuAuthentication_me$data = {
  readonly unreadNotificationsCount: number;
  readonly unreadConversationCount: number;
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
