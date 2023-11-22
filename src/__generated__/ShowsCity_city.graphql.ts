/**
 * @generated SignedSource<<a54a7b1f4adeecffd178871f54506e15>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ShowsCity_city$data = {
  readonly currentShows: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly internalID: string;
        readonly " $fragmentSpreads": FragmentRefs<"ShowsFeaturedShow_show">;
      } | null | undefined;
    } | null | undefined> | null | undefined;
    readonly pageCursors: {
      readonly " $fragmentSpreads": FragmentRefs<"Pagination_pageCursors">;
    };
    readonly pageInfo: {
      readonly endCursor: string | null | undefined;
      readonly hasNextPage: boolean;
    };
    readonly totalCount: number | null | undefined;
  } | null | undefined;
  readonly name: string;
  readonly pastShows: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly internalID: string;
        readonly " $fragmentSpreads": FragmentRefs<"ShowsFeaturedShow_show">;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly slug: string;
  readonly upcomingShows: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly internalID: string;
        readonly startAt: string | null | undefined;
        readonly " $fragmentSpreads": FragmentRefs<"ShowsFeaturedShow_show">;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "ShowsCity_city";
};
export type ShowsCity_city$key = {
  readonly " $data"?: ShowsCity_city$data;
  readonly " $fragmentSpreads": FragmentRefs<"ShowsCity_city">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "kind": "Literal",
  "name": "first",
  "value": 18
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v2 = {
  "args": null,
  "kind": "FragmentSpread",
  "name": "ShowsFeaturedShow_show"
},
v3 = {
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
        (v1/*: any*/),
        (v2/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "after"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "page"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "ShowsCity_city",
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
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": "upcomingShows",
      "args": [
        (v0/*: any*/),
        {
          "kind": "Literal",
          "name": "sort",
          "value": "START_AT_ASC"
        },
        {
          "kind": "Literal",
          "name": "status",
          "value": "UPCOMING"
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
                (v1/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "startAt",
                  "storageKey": null
                },
                (v2/*: any*/)
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "showsConnection(first:18,sort:\"START_AT_ASC\",status:\"UPCOMING\")"
    },
    {
      "alias": "currentShows",
      "args": [
        {
          "kind": "Variable",
          "name": "after",
          "variableName": "after"
        },
        (v0/*: any*/),
        {
          "kind": "Variable",
          "name": "page",
          "variableName": "page"
        },
        {
          "kind": "Literal",
          "name": "sort",
          "value": "END_AT_ASC"
        },
        {
          "kind": "Literal",
          "name": "status",
          "value": "RUNNING"
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
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "endCursor",
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
          "kind": "ScalarField",
          "name": "totalCount",
          "storageKey": null
        },
        (v3/*: any*/)
      ],
      "storageKey": null
    },
    {
      "alias": "pastShows",
      "args": [
        (v0/*: any*/),
        {
          "kind": "Literal",
          "name": "sort",
          "value": "END_AT_DESC"
        },
        {
          "kind": "Literal",
          "name": "status",
          "value": "CLOSED"
        }
      ],
      "concreteType": "ShowConnection",
      "kind": "LinkedField",
      "name": "showsConnection",
      "plural": false,
      "selections": [
        (v3/*: any*/)
      ],
      "storageKey": "showsConnection(first:18,sort:\"END_AT_DESC\",status:\"CLOSED\")"
    }
  ],
  "type": "City",
  "abstractKey": null
};
})();

(node as any).hash = "0bf0c87351c5631ece3cf3b9e1c3548c";

export default node;
