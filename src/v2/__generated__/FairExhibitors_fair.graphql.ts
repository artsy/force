/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairExhibitors_fair = {
    readonly slug: string;
    readonly exhibitors: {
        readonly pageInfo: {
            readonly hasNextPage: boolean;
        };
        readonly pageCursors: {
            readonly " $fragmentRefs": FragmentRefs<"Pagination_pageCursors">;
        };
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
      "defaultValue": 1,
      "kind": "LocalArgument",
      "name": "page",
      "type": "Int"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
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
          "name": "first",
          "variableName": "first"
        },
        {
          "kind": "Variable",
          "name": "page",
          "variableName": "page"
        },
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
      "name": "showsConnection",
      "plural": false,
      "selections": [
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
              "name": "hasNextPage",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "PageCursors",
          "kind": "LinkedField",
          "name": "pageCursors",
          "plural": false,
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "Pagination_pageCursors"
            }
          ],
          "storageKey": null
        },
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
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "FairExhibitorRail_show"
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
  "type": "Fair"
};
})();
(node as any).hash = 'a592977087f2ee380e24d6f9cf299413';
export default node;
