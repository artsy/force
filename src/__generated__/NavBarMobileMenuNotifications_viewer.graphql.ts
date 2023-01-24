/**
 * @generated SignedSource<<477ba7e3617a4f1a0580f2238e0cb6ca>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NavBarMobileMenuNotifications_viewer$data = {
  readonly notificationsConnection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly publishedAt: string;
      } | null;
    } | null> | null;
  } | null;
  readonly " $fragmentType": "NavBarMobileMenuNotifications_viewer";
};
export type NavBarMobileMenuNotifications_viewer$key = {
  readonly " $data"?: NavBarMobileMenuNotifications_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"NavBarMobileMenuNotifications_viewer">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NavBarMobileMenuNotifications_viewer",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 3
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
      "storageKey": "notificationsConnection(first:3)"
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};

(node as any).hash = "0a1d1a2db659d250b6da4931f90bf091";

export default node;
