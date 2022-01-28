/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SavedSearchAlertsOverviewRoute_me = {
    readonly savedSearchesConnection: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly internalID: string;
                readonly " $fragmentRefs": FragmentRefs<"SavedSearchAlertListItem_item">;
            } | null;
        } | null> | null;
    } | null;
    readonly " $refType": "SavedSearchAlertsOverviewRoute_me";
};
export type SavedSearchAlertsOverviewRoute_me$data = SavedSearchAlertsOverviewRoute_me;
export type SavedSearchAlertsOverviewRoute_me$key = {
    readonly " $data"?: SavedSearchAlertsOverviewRoute_me$data;
    readonly " $fragmentRefs": FragmentRefs<"SavedSearchAlertsOverviewRoute_me">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": null,
        "cursor": null,
        "direction": "forward",
        "path": [
          "savedSearchesConnection"
        ]
      }
    ]
  },
  "name": "SavedSearchAlertsOverviewRoute_me",
  "selections": [
    {
      "alias": "savedSearchesConnection",
      "args": null,
      "concreteType": "SearchCriteriaConnection",
      "kind": "LinkedField",
      "name": "__SavedSearchAlertsOverviewRoute_savedSearchesConnection_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "SearchCriteriaEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "SearchCriteria",
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
                  "name": "SavedSearchAlertListItem_item"
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
(node as any).hash = '8929c934dc3923a4f8530731295a4f9c';
export default node;
