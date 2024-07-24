/**
 * @generated SignedSource<<7c9fb07ad9867c4743e7f8e7e70f81a7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NotificationCollectorProfileUpdatePrompt_notification$data = {
  readonly item: {
    readonly me?: {
      readonly userInterestsConnection: {
        readonly totalCount: number | null | undefined;
      } | null | undefined;
    };
  } | null | undefined;
  readonly " $fragmentType": "NotificationCollectorProfileUpdatePrompt_notification";
};
export type NotificationCollectorProfileUpdatePrompt_notification$key = {
  readonly " $data"?: NotificationCollectorProfileUpdatePrompt_notification$data;
  readonly " $fragmentSpreads": FragmentRefs<"NotificationCollectorProfileUpdatePrompt_notification">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NotificationCollectorProfileUpdatePrompt_notification",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "item",
      "plural": false,
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
      "storageKey": null
    }
  ],
  "type": "Notification",
  "abstractKey": null
};

(node as any).hash = "e6be92eae09a99f5b9f5936dceb3c62d";

export default node;
