/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UserBidHistory_me = {
    readonly myBids: {
        readonly closed: ReadonlyArray<{
            readonly sale: {
                readonly name: string | null;
                readonly href: string | null;
                readonly endAt: string | null;
                readonly profile: {
                    readonly bio: string | null;
                } | null;
            } | null;
        } | null> | null;
    } | null;
    readonly " $refType": "UserBidHistory_me";
};
export type UserBidHistory_me$data = UserBidHistory_me;
export type UserBidHistory_me$key = {
    readonly " $data"?: UserBidHistory_me$data;
    readonly " $fragmentRefs": FragmentRefs<"UserBidHistory_me">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UserBidHistory_me",
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
          "name": "closed",
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
                  "name": "name",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "href",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": [
                    {
                      "kind": "Literal",
                      "name": "format",
                      "value": "MMMM D, h:mmA"
                    }
                  ],
                  "kind": "ScalarField",
                  "name": "endAt",
                  "storageKey": "endAt(format:\"MMMM D, h:mmA\")"
                },
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "Profile",
                  "kind": "LinkedField",
                  "name": "profile",
                  "plural": false,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "bio",
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
  "type": "Me",
  "abstractKey": null
};
(node as any).hash = 'fa9b5983912909b48a917273fa13ae2d';
export default node;
