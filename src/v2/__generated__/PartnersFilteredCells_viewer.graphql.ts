/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PartnersFilteredCells_viewer = {
    readonly partnersConnection: {
        readonly totalCount: number | null;
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly internalID: string;
                readonly " $fragmentRefs": FragmentRefs<"PartnerCell_partner">;
            } | null;
        } | null> | null;
    } | null;
    readonly " $refType": "PartnersFilteredCells_viewer";
};
export type PartnersFilteredCells_viewer$data = PartnersFilteredCells_viewer;
export type PartnersFilteredCells_viewer$key = {
    readonly " $data"?: PartnersFilteredCells_viewer$data;
    readonly " $fragmentRefs": FragmentRefs<"PartnersFilteredCells_viewer">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "after"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "category"
    },
    {
      "defaultValue": 12,
      "kind": "LocalArgument",
      "name": "first"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "near"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "type"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": "first",
        "cursor": "after",
        "direction": "forward",
        "path": [
          "partnersConnection"
        ]
      }
    ]
  },
  "name": "PartnersFilteredCells_viewer",
  "selections": [
    {
      "alias": "partnersConnection",
      "args": [
        {
          "kind": "Literal",
          "name": "defaultProfilePublic",
          "value": true
        },
        {
          "kind": "Literal",
          "name": "eligibleForListing",
          "value": true
        },
        {
          "kind": "Variable",
          "name": "near",
          "variableName": "near"
        },
        {
          "kind": "Variable",
          "name": "partnerCategories",
          "variableName": "category"
        },
        {
          "kind": "Literal",
          "name": "sort",
          "value": "RANDOM_SCORE_DESC"
        },
        {
          "kind": "Variable",
          "name": "type",
          "variableName": "type"
        }
      ],
      "concreteType": "PartnerConnection",
      "kind": "LinkedField",
      "name": "__PartnersFilteredCells_partnersConnection_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "totalCount",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "PartnerEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Partner",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "internalID",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "__typename",
                  "storageKey": null
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "PartnerCell_partner"
                }
              ],
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "cursor",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "PageInfo",
          "kind": "LinkedField",
          "name": "pageInfo",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "endCursor",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "hasNextPage",
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
(node as any).hash = '2481c1769e31d61ea5e961c1ccb7d0fe';
export default node;
