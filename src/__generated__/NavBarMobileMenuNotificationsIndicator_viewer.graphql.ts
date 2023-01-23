/**
 * @generated SignedSource<<6d10d1495261f107713d26374c1ba65e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NavBarMobileMenuNotificationsIndicator_viewer$data = {
  readonly notificationsConnection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly publishedAt: string;
      } | null;
    } | null> | null;
  } | null;
  readonly " $fragmentType": "NavBarMobileMenuNotificationsIndicator_viewer";
};
export type NavBarMobileMenuNotificationsIndicator_viewer$key = {
  readonly " $data"?: NavBarMobileMenuNotificationsIndicator_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"NavBarMobileMenuNotificationsIndicator_viewer">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NavBarMobileMenuNotificationsIndicator_viewer",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 1
        }
      ],
      "concreteType": "NotificationConnection",
      "kind": "LinkedField",
      "name": "notificationsConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "NotificationEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Notification",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "publishedAt",
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "notificationsConnection(first:1)"
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};

(node as any).hash = "96fbbd2dcc318d0c902c09b28607a0c0";

export default node;
