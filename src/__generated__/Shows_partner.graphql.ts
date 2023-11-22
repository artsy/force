/**
 * @generated SignedSource<<b02cd7af80a9bd2f1343e475f869033e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Shows_partner$data = {
  readonly currentEvents: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly internalID: string;
        readonly " $fragmentSpreads": FragmentRefs<"CellShow_show">;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly featuredEvents: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly internalID: string;
        readonly isFeatured: boolean | null | undefined;
        readonly " $fragmentSpreads": FragmentRefs<"ShowBanner_show">;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly slug: string;
  readonly upcomingEvents: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly internalID: string;
        readonly " $fragmentSpreads": FragmentRefs<"CellShow_show">;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "Shows_partner";
};
export type Shows_partner$key = {
  readonly " $data"?: Shows_partner$data;
  readonly " $fragmentSpreads": FragmentRefs<"Shows_partner">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "kind": "Literal",
  "name": "isDisplayable",
  "value": true
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v2 = {
  "kind": "Literal",
  "name": "first",
  "value": 12
},
v3 = [
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
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "CellShow_show"
          },
          (v1/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Shows_partner",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": "featuredEvents",
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 1
        },
        (v0/*: any*/),
        {
          "kind": "Literal",
          "name": "sort",
          "value": "FEATURED_DESC_END_AT_DESC"
        },
        {
          "kind": "Literal",
          "name": "status",
          "value": "ALL"
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
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "isFeatured",
                  "storageKey": null
                },
                (v1/*: any*/),
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "ShowBanner_show"
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "showsConnection(first:1,isDisplayable:true,sort:\"FEATURED_DESC_END_AT_DESC\",status:\"ALL\")"
    },
    {
      "alias": "currentEvents",
      "args": [
        (v2/*: any*/),
        (v0/*: any*/),
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
      "selections": (v3/*: any*/),
      "storageKey": "showsConnection(first:12,isDisplayable:true,status:\"RUNNING\")"
    },
    {
      "alias": "upcomingEvents",
      "args": [
        (v2/*: any*/),
        (v0/*: any*/),
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
      "selections": (v3/*: any*/),
      "storageKey": "showsConnection(first:12,isDisplayable:true,status:\"UPCOMING\")"
    }
  ],
  "type": "Partner",
  "abstractKey": null
};
})();

(node as any).hash = "a8a169083bf31768bbec1a51531ed995";

export default node;
