/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type NavBarMobileMenuNotificationsIndicator_me = {
    readonly unreadConversationCount: number;
    readonly unreadNotificationsCount: number;
    readonly " $refType": "NavBarMobileMenuNotificationsIndicator_me";
};
export type NavBarMobileMenuNotificationsIndicator_me$data = NavBarMobileMenuNotificationsIndicator_me;
export type NavBarMobileMenuNotificationsIndicator_me$key = {
    readonly " $data"?: NavBarMobileMenuNotificationsIndicator_me$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"NavBarMobileMenuNotificationsIndicator_me">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NavBarMobileMenuNotificationsIndicator_me",
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
(node as any).hash = '8bfb3627d6825178d58a6ad8c2836d2d';
export default node;
