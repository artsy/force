/**
 * @generated SignedSource<<69b943158b9ef5655edce164b954bd9f>>
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
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "9a5c67568521ba1b8605f4465510ba25";

export default node;
