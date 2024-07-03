/**
 * @generated SignedSource<<7a15142e9b99167f5a576f0eaecb369c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NotificationItemCollectorProfileUpdatePrompt_notificationItem$data = {
  readonly me?: {
    readonly userInterestsConnection: {
      readonly totalCount: number | null | undefined;
    } | null | undefined;
  };
  readonly " $fragmentType": "NotificationItemCollectorProfileUpdatePrompt_notificationItem";
};
export type NotificationItemCollectorProfileUpdatePrompt_notificationItem$key = {
  readonly " $data"?: NotificationItemCollectorProfileUpdatePrompt_notificationItem$data;
  readonly " $fragmentSpreads": FragmentRefs<"NotificationItemCollectorProfileUpdatePrompt_notificationItem">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NotificationItemCollectorProfileUpdatePrompt_notificationItem",
  "selections": [
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Me",
          "kind": "LinkedField",
          "name": "me",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": [
                {
                  "kind": "Literal",
                  "name": "first",
                  "value": 1
                },
                {
                  "kind": "Literal",
                  "name": "interestType",
                  "value": "ARTIST"
                }
              ],
              "concreteType": "UserInterestConnection",
              "kind": "LinkedField",
              "name": "userInterestsConnection",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "totalCount",
                  "storageKey": null
                }
              ],
              "storageKey": "userInterestsConnection(first:1,interestType:\"ARTIST\")"
            }
          ],
          "storageKey": null
        }
      ],
      "type": "CollectorProfileUpdatePromptNotificationItem",
      "abstractKey": null
    }
  ],
  "type": "NotificationItem",
  "abstractKey": "__isNotificationItem"
};

(node as any).hash = "d8e0e0573ea533b32ac66de7f869adac";

export default node;
