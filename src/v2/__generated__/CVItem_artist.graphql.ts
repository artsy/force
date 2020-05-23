/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CVItem_artist = {
    readonly slug: string;
    readonly showsConnection: {
        readonly pageInfo: {
            readonly hasNextPage: boolean;
        };
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly id: string;
                readonly partner: {
                    readonly name?: string | null;
                    readonly href?: string | null;
                } | null;
                readonly name: string | null;
                readonly start_at: string | null;
                readonly city: string | null;
                readonly href: string | null;
            } | null;
        } | null> | null;
    } | null;
    readonly " $refType": "CVItem_artist";
};
export type CVItem_artist$data = CVItem_artist;
export type CVItem_artist$key = {
    readonly " $data"?: CVItem_artist$data;
    readonly " $fragmentRefs": FragmentRefs<"CVItem_artist">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "href",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "CVItem_artist",
  "type": "Artist",
  "metadata": {
    "connection": [
      {
        "count": "count",
        "cursor": "cursor",
        "direction": "forward",
        "path": [
          "showsConnection"
        ]
      }
    ]
  },
  "argumentDefinitions": [
    {
      "kind": "LocalArgument",
      "name": "count",
      "type": "Int",
      "defaultValue": 10
    },
    {
      "kind": "LocalArgument",
      "name": "cursor",
      "type": "String",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "sort",
      "type": "ShowSorts",
      "defaultValue": "START_AT_DESC"
    },
    {
      "kind": "LocalArgument",
      "name": "atAFair",
      "type": "Boolean",
      "defaultValue": false
    },
    {
      "kind": "LocalArgument",
      "name": "soloShow",
      "type": "Boolean",
      "defaultValue": false
    },
    {
      "kind": "LocalArgument",
      "name": "isReference",
      "type": "Boolean",
      "defaultValue": true
    },
    {
      "kind": "LocalArgument",
      "name": "visibleToPublic",
      "type": "Boolean",
      "defaultValue": false
    }
  ],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "slug",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": "showsConnection",
      "name": "__Artist_showsConnection_connection",
      "storageKey": null,
      "args": [
        {
          "kind": "Variable",
          "name": "atAFair",
          "variableName": "atAFair"
        },
        {
          "kind": "Variable",
          "name": "isReference",
          "variableName": "isReference"
        },
        {
          "kind": "Variable",
          "name": "soloShow",
          "variableName": "soloShow"
        },
        {
          "kind": "Variable",
          "name": "sort",
          "variableName": "sort"
        },
        {
          "kind": "Variable",
          "name": "visibleToPublic",
          "variableName": "visibleToPublic"
        }
      ],
      "concreteType": "ShowConnection",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "pageInfo",
          "storageKey": null,
          "args": null,
          "concreteType": "PageInfo",
          "plural": false,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "hasNextPage",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "endCursor",
              "args": null,
              "storageKey": null
            }
          ]
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "edges",
          "storageKey": null,
          "args": null,
          "concreteType": "ShowEdge",
          "plural": true,
          "selections": [
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "node",
              "storageKey": null,
              "args": null,
              "concreteType": "Show",
              "plural": false,
              "selections": [
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "id",
                  "args": null,
                  "storageKey": null
                },
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "partner",
                  "storageKey": null,
                  "args": null,
                  "concreteType": null,
                  "plural": false,
                  "selections": [
                    {
                      "kind": "InlineFragment",
                      "type": "ExternalPartner",
                      "selections": [
                        (v0/*: any*/)
                      ]
                    },
                    {
                      "kind": "InlineFragment",
                      "type": "Partner",
                      "selections": [
                        (v0/*: any*/),
                        (v1/*: any*/)
                      ]
                    }
                  ]
                },
                (v0/*: any*/),
                {
                  "kind": "ScalarField",
                  "alias": "start_at",
                  "name": "startAt",
                  "args": [
                    {
                      "kind": "Literal",
                      "name": "format",
                      "value": "YYYY"
                    }
                  ],
                  "storageKey": "startAt(format:\"YYYY\")"
                },
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "city",
                  "args": null,
                  "storageKey": null
                },
                (v1/*: any*/),
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "__typename",
                  "args": null,
                  "storageKey": null
                }
              ]
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "cursor",
              "args": null,
              "storageKey": null
            }
          ]
        }
      ]
    }
  ]
};
})();
(node as any).hash = '66c5999a1cef19c064dc7edd029de163';
export default node;
