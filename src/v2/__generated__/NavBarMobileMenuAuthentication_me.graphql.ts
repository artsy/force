/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type NavBarMobileMenuAuthentication_me = {
    readonly unreadNotificationsCount: number;
    readonly unreadConversationCount: number;
    readonly " $refType": "NavBarMobileMenuAuthentication_me";
};
export type NavBarMobileMenuAuthentication_me$data = NavBarMobileMenuAuthentication_me;
export type NavBarMobileMenuAuthentication_me$key = {
    readonly " $data"?: NavBarMobileMenuAuthentication_me$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"NavBarMobileMenuAuthentication_me">;
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
(node as any).hash = '55605d871ddab628fa4b2e82b5e91142';
export default node;
