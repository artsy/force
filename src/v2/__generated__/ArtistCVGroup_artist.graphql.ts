/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistCVGroup_artist = {
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
                readonly startAt: string | null;
                readonly city: string | null;
                readonly href: string | null;
            } | null;
        } | null> | null;
    } | null;
    readonly " $refType": "ArtistCVGroup_artist";
};
export type ArtistCVGroup_artist$data = ArtistCVGroup_artist;
export type ArtistCVGroup_artist$key = {
    readonly " $data"?: ArtistCVGroup_artist$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtistCVGroup_artist">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
};
return {
  "argumentDefinitions": [
    {
      "defaultValue": 10,
      "kind": "LocalArgument",
      "name": "count",
      "type": "Int"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "cursor",
      "type": "String"
    },
    {
      "defaultValue": "START_AT_DESC",
      "kind": "LocalArgument",
      "name": "sort",
      "type": "ShowSorts"
    },
    {
      "defaultValue": false,
      "kind": "LocalArgument",
      "name": "atAFair",
      "type": "Boolean"
    },
    {
      "defaultValue": false,
      "kind": "LocalArgument",
      "name": "soloShow",
      "type": "Boolean"
    },
    {
      "defaultValue": true,
      "kind": "LocalArgument",
      "name": "isReference",
      "type": "Boolean"
    },
    {
      "defaultValue": false,
      "kind": "LocalArgument",
      "name": "visibleToPublic",
      "type": "Boolean"
    }
  ],
  "kind": "Fragment",
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
  "name": "ArtistCVGroup_artist",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": "showsConnection",
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
      "kind": "LinkedField",
      "name": "__ArtistCVGroup_showsConnection_connection",
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
                  "name": "id",
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
                      "selections": [
                        (v0/*: any*/)
                      ],
                      "type": "ExternalPartner"
                    },
                    {
                      "kind": "InlineFragment",
                      "selections": [
                        (v0/*: any*/),
                        (v1/*: any*/)
                      ],
                      "type": "Partner"
                    }
                  ],
                  "storageKey": null
                },
                (v0/*: any*/),
                {
                  "alias": null,
                  "args": [
                    {
                      "kind": "Literal",
                      "name": "format",
                      "value": "YYYY"
                    }
                  ],
                  "kind": "ScalarField",
                  "name": "startAt",
                  "storageKey": "startAt(format:\"YYYY\")"
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "city",
                  "storageKey": null
                },
                (v1/*: any*/),
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
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artist"
};
})();
(node as any).hash = '54b80d5c989039c4be5cd687b5399c1e';
export default node;
