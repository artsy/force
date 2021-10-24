/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UserRegistrationAuctions_me = {
    readonly saleRegistrationsConnection: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly isRegistered: boolean | null;
                readonly sale: {
                    readonly name: string | null;
                    readonly href: string | null;
                    readonly id: string;
                    readonly isClosed: boolean | null;
                    readonly startAt: string | null;
                } | null;
            } | null;
        } | null> | null;
    } | null;
    readonly " $refType": "UserRegistrationAuctions_me";
};
export type UserRegistrationAuctions_me$data = UserRegistrationAuctions_me;
export type UserRegistrationAuctions_me$key = {
    readonly " $data"?: UserRegistrationAuctions_me$data;
    readonly " $fragmentRefs": FragmentRefs<"UserRegistrationAuctions_me">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UserRegistrationAuctions_me",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "SaleRegistrationConnection",
      "kind": "LinkedField",
      "name": "saleRegistrationsConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "SaleRegistrationEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "SaleRegistration",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "isRegistered",
                  "storageKey": null
                },
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
                      "args": null,
                      "kind": "ScalarField",
                      "name": "id",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "isClosed",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "startAt",
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
  "type": "Me"
};
(node as any).hash = 'f9e861977bd06440fe09d92e25665e91';
export default node;
