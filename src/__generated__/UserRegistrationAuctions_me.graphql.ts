/**
 * @generated SignedSource<<f91adf14906c05d4c31d7852513ee162>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UserRegistrationAuctions_me$data = {
  readonly saleRegistrationsConnection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly isRegistered: boolean | null | undefined;
        readonly sale: {
          readonly href: string | null | undefined;
          readonly id: string;
          readonly isClosed: boolean | null | undefined;
          readonly isRegistrationClosed: boolean | null | undefined;
          readonly name: string | null | undefined;
          readonly startAt: string | null | undefined;
        } | null | undefined;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "UserRegistrationAuctions_me";
};
export type UserRegistrationAuctions_me$key = {
  readonly " $data"?: UserRegistrationAuctions_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"UserRegistrationAuctions_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UserRegistrationAuctions_me",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 10
        },
        {
          "kind": "Literal",
          "name": "isAuction",
          "value": true
        },
        {
          "kind": "Literal",
          "name": "published",
          "value": true
        },
        {
          "kind": "Literal",
          "name": "registered",
          "value": false
        },
        {
          "kind": "Literal",
          "name": "sort",
          "value": "CREATED_AT_DESC"
        }
      ],
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
                      "name": "id",
                      "storageKey": null
                    },
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
                      "name": "startAt",
                      "storageKey": "startAt(format:\"MMMM D, h:mmA\")"
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
                      "name": "isRegistrationClosed",
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
      "storageKey": "saleRegistrationsConnection(first:10,isAuction:true,published:true,registered:false,sort:\"CREATED_AT_DESC\")"
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "32afe03cbf742da4fd537cf62c91569f";

export default node;
