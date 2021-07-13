/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairExhibitors_fair = {
    readonly slug: string;
    readonly exhibitors: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly id: string;
                readonly counts: {
                    readonly artworks: number | null;
                } | null;
                readonly partner: {
                    readonly id?: string;
                } | null;
                readonly " $fragmentRefs": FragmentRefs<"FairExhibitorRail_show">;
            } | null;
        } | null> | null;
    } | null;
    readonly " $refType": "FairExhibitors_fair";
};
export type FairExhibitors_fair$data = FairExhibitors_fair;
export type FairExhibitors_fair$key = {
    readonly " $data"?: FairExhibitors_fair$data;
    readonly " $fragmentRefs": FragmentRefs<"FairExhibitors_fair">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = [
  (v0/*: any*/)
];
return {
  "argumentDefinitions": [
    {
      "defaultValue": "FEATURED_DESC",
      "kind": "LocalArgument",
      "name": "sort",
      "type": "ShowSorts"
    },
    {
      "defaultValue": 15,
      "kind": "LocalArgument",
      "name": "first",
      "type": "Int"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "after",
      "type": "String"
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
          "exhibitors"
        ]
      }
    ]
  },
  "name": "FairExhibitors_fair",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": "exhibitors",
      "args": [
        {
          "kind": "Variable",
          "name": "sort",
          "variableName": "sort"
        },
        {
          "kind": "Literal",
          "name": "totalCount",
          "value": true
        }
      ],
      "concreteType": "ShowConnection",
      "kind": "LinkedField",
      "name": "__FairExhibitorsQuery_exhibitors_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ShowEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Show",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                (v0/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "ShowCounts",
                  "kind": "LinkedField",
                  "name": "counts",
                  "plural": false,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "artworks",
                      "storageKey": null
                    }
                  ],
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "concreteType": null,
                  "kind": "LinkedField",
                  "name": "partner",
                  "plural": false,
                  "selections": [
                    {
                      "kind": "InlineFragment",
                      "selections": (v1/*: any*/),
                      "type": "Partner"
                    },
                    {
                      "kind": "InlineFragment",
                      "selections": (v1/*: any*/),
                      "type": "ExternalPartner"
                    }
                  ],
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
                  "name": "FairExhibitorRail_show"
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
  "type": "Fair"
};
})();
(node as any).hash = '6cbe334b06fc8fe681ee99d67114931c';
export default node;
