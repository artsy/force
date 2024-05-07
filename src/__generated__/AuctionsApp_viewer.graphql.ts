/**
 * @generated SignedSource<<c967ba9138307a7743ccf366bc8eb888>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AuctionsApp_viewer$data = {
  readonly me: {
    readonly myBids: {
      readonly active: ReadonlyArray<{
        readonly sale: {
          readonly slug: string;
        } | null | undefined;
      } | null | undefined> | null | undefined;
    } | null | undefined;
  } | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"CuritorialRailsTabBar_viewer">;
  readonly " $fragmentType": "AuctionsApp_viewer";
};
export type AuctionsApp_viewer$key = {
  readonly " $data"?: AuctionsApp_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"AuctionsApp_viewer">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AuctionsApp_viewer",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CuritorialRailsTabBar_viewer"
    },
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
          "args": null,
          "concreteType": "MyBids",
          "kind": "LinkedField",
          "name": "myBids",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "MyBid",
              "kind": "LinkedField",
              "name": "active",
              "plural": true,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "Sale",
                  "kind": "LinkedField",
                  "name": "sale",
                  "plural": false,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "slug",
                      "storageKey": null
                    }
                  ],
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};

(node as any).hash = "217a64755a9ca690fed91958c0f7a3ac";

export default node;
