/**
 * @generated SignedSource<<baf5b81c96626cdbf0347221d2e4dd1a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NavBarMobileMenuNotificationsIndicator_me$data = {
  readonly unreadConversationCount: number;
  readonly unreadNotificationsCount: number;
  readonly unseenNotificationsCount: number;
  readonly " $fragmentType": "NavBarMobileMenuNotificationsIndicator_me";
};
export type NavBarMobileMenuNotificationsIndicator_me$key = {
  readonly " $data"?: NavBarMobileMenuNotificationsIndicator_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"NavBarMobileMenuNotificationsIndicator_me">;
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

(node as any).hash = "da97339ca68f35ba626818e5f885ed83";

export default node;
