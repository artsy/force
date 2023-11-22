/**
 * @generated SignedSource<<e3d55070b4a81ad38dba8e978716468a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FairsPastFairs_viewer$data = {
  readonly pastFairs: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly internalID: string;
        readonly isPublished: boolean | null | undefined;
        readonly profile: {
          readonly isPublished: boolean | null | undefined;
        } | null | undefined;
        readonly " $fragmentSpreads": FragmentRefs<"FairsFairRow_fair">;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "FairsPastFairs_viewer";
};
export type FairsPastFairs_viewer$key = {
  readonly " $data"?: FairsPastFairs_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"FairsPastFairs_viewer">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isPublished",
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
      "defaultValue": 15,
      "kind": "LocalArgument",
      "name": "first"
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
          "pastFairs"
        ]
      }
    ]
  },
  "name": "FairsPastFairs_viewer",
  "selections": [
    {
      "alias": "pastFairs",
      "args": [
        {
          "kind": "Literal",
          "name": "hasFullFeature",
          "value": true
        },
        {
          "kind": "Literal",
          "name": "hasListing",
          "value": true
        },
        {
          "kind": "Literal",
          "name": "sort",
          "value": "START_AT_DESC"
        },
        {
          "kind": "Literal",
          "name": "status",
          "value": "CLOSED"
        }
      ],
      "concreteType": "FairConnection",
      "kind": "LinkedField",
      "name": "__FairsPastFairsQuery_pastFairs_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "FairEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Fair",
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
                (v0/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "Profile",
                  "kind": "LinkedField",
                  "name": "profile",
                  "plural": false,
                  "selections": [
                    (v0/*: any*/)
                  ],
                  "storageKey": null
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "FairsFairRow_fair"
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
      "storageKey": "__FairsPastFairsQuery_pastFairs_connection(hasFullFeature:true,hasListing:true,sort:\"START_AT_DESC\",status:\"CLOSED\")"
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};
})();

(node as any).hash = "64dc2aa4701a7a1bab02c02d7c29621e";

export default node;
