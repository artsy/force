/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type NavBarMobileMenuInboxNotificationCount_me = {
    readonly unreadConversationCount: number;
    readonly " $refType": "NavBarMobileMenuInboxNotificationCount_me";
};
export type NavBarMobileMenuInboxNotificationCount_me$data = NavBarMobileMenuInboxNotificationCount_me;
export type NavBarMobileMenuInboxNotificationCount_me$key = {
    readonly " $data"?: NavBarMobileMenuInboxNotificationCount_me$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"NavBarMobileMenuInboxNotificationCount_me">;
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
(node as any).hash = '296a5304291f3e70216223c8348dc983';
export default node;
