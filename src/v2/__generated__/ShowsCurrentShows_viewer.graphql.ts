/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ShowsCurrentShows_viewer = {
    readonly showsConnection: {
        readonly pageInfo: {
            readonly hasNextPage: boolean;
            readonly endCursor: string | null;
        };
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly internalID: string;
                readonly " $fragmentRefs": FragmentRefs<"ShowsCurrentShow_show">;
            } | null;
        } | null> | null;
    } | null;
    readonly " $refType": "ShowsCurrentShows_viewer";
};
export type ShowsCurrentShows_viewer$data = ShowsCurrentShows_viewer;
export type ShowsCurrentShows_viewer$key = {
    readonly " $data"?: ShowsCurrentShows_viewer$data;
    readonly " $fragmentRefs": FragmentRefs<"ShowsCurrentShows_viewer">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "after"
    },
    {
      "defaultValue": 10,
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
          "showsConnection"
        ]
      }
    ]
  },
  "name": "ShowsCurrentShows_viewer",
  "selections": [
    {
      "alias": "showsConnection",
      "args": [
        {
          "kind": "Literal",
          "name": "atAFair",
          "value": false
        },
        {
          "kind": "Literal",
          "name": "displayable",
          "value": true
        },
        {
          "kind": "Literal",
          "name": "sort",
          "value": "END_AT_ASC"
        },
        {
          "kind": "Literal",
          "name": "status",
          "value": "CURRENT"
        }
      ],
      "concreteType": "ShowConnection",
      "kind": "LinkedField",
      "name": "__ShowsCurrentShowsQuery_showsConnection_connection",
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
                  "name": "ShowsCurrentShow_show"
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
        }
      ],
      "storageKey": "__ShowsCurrentShowsQuery_showsConnection_connection(atAFair:false,displayable:true,sort:\"END_AT_ASC\",status:\"CURRENT\")"
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};
(node as any).hash = '39a18e1e1b6680eb506b335810498416';
export default node;
