/**
 * @generated SignedSource<<16be811773128373d123d5194d53d765>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SavedSearchAlertsApp_me$data = {
  readonly alertsConnection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly artistIDs: ReadonlyArray<string | null | undefined> | null | undefined;
        readonly artworksConnection: {
          readonly counts: {
            readonly total: any | null | undefined;
          } | null | undefined;
        } | null | undefined;
        readonly internalID: string;
        readonly subtitle: string;
        readonly title: string;
        readonly " $fragmentSpreads": FragmentRefs<"SavedSearchAlertListItem_item">;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  };
  readonly " $fragmentType": "SavedSearchAlertsApp_me";
};
export type SavedSearchAlertsApp_me$key = {
  readonly " $data"?: SavedSearchAlertsApp_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"SavedSearchAlertsApp_me">;
};

const node: ReaderFragment = (function(){
var v0 = [
  "artistIDs"
];
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "after"
    },
    {
      "defaultValue": 10,
      "kind": "LocalArgument",
      "name": "count"
    },
    {
      "defaultValue": "ENABLED_AT_DESC",
      "kind": "LocalArgument",
      "name": "sort"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": "count",
        "cursor": "after",
        "direction": "forward",
        "path": [
          "alertsConnection"
        ]
      }
    ]
  },
  "name": "SavedSearchAlertsApp_me",
  "selections": [
    {
      "alias": "alertsConnection",
      "args": [
        {
          "kind": "Variable",
          "name": "sort",
          "variableName": "sort"
        }
      ],
      "concreteType": "AlertConnection",
      "kind": "LinkedField",
      "name": "__SavedSearchAlertsApp_alertsConnection_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "AlertEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Alert",
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
                  "name": "artistIDs",
                  "storageKey": null
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "SavedSearchAlertListItem_item"
                },
                {
                  "alias": "title",
                  "args": [
                    {
                      "kind": "Literal",
                      "name": "only",
                      "value": (v0/*: any*/)
                    }
                  ],
                  "kind": "ScalarField",
                  "name": "displayName",
                  "storageKey": "displayName(only:[\"artistIDs\"])"
                },
                {
                  "alias": "subtitle",
                  "args": [
                    {
                      "kind": "Literal",
                      "name": "except",
                      "value": (v0/*: any*/)
                    }
                  ],
                  "kind": "ScalarField",
                  "name": "displayName",
                  "storageKey": "displayName(except:[\"artistIDs\"])"
                },
                {
                  "alias": null,
                  "args": [
                    {
                      "kind": "Literal",
                      "name": "first",
                      "value": 10
                    }
                  ],
                  "concreteType": "FilterArtworksConnection",
                  "kind": "LinkedField",
                  "name": "artworksConnection",
                  "plural": false,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "concreteType": "FilterArtworksCounts",
                      "kind": "LinkedField",
                      "name": "counts",
                      "plural": false,
                      "selections": [
                        {
                          "alias": null,
                          "args": null,
                          "kind": "ScalarField",
                          "name": "total",
                          "storageKey": null
                        }
                      ],
                      "storageKey": null
                    }
                  ],
                  "storageKey": "artworksConnection(first:10)"
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "__typename",
                  "storageKey": null
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
  "type": "Me",
  "abstractKey": null
};
})();

(node as any).hash = "0257b11a740e18fa68b0e85216fa7b9d";

export default node;
