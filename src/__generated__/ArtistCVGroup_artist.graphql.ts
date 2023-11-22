/**
 * @generated SignedSource<<610f054f40983bd129bf6f88c41060f9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistCVGroup_artist$data = {
  readonly showsConnection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly city: string | null | undefined;
        readonly href: string | null | undefined;
        readonly id: string;
        readonly name: string | null | undefined;
        readonly partner: {
          readonly href?: string | null | undefined;
          readonly name?: string | null | undefined;
        } | null | undefined;
        readonly startAt: string | null | undefined;
      } | null | undefined;
    } | null | undefined> | null | undefined;
    readonly pageInfo: {
      readonly hasNextPage: boolean;
    };
  } | null | undefined;
  readonly slug: string;
  readonly " $fragmentType": "ArtistCVGroup_artist";
};
export type ArtistCVGroup_artist$key = {
  readonly " $data"?: ArtistCVGroup_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistCVGroup_artist">;
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
      "defaultValue": false,
      "kind": "LocalArgument",
      "name": "atAFair"
    },
    {
      "defaultValue": 10,
      "kind": "LocalArgument",
      "name": "count"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "cursor"
    },
    {
      "defaultValue": true,
      "kind": "LocalArgument",
      "name": "isReference"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "soloShow"
    },
    {
      "defaultValue": "START_AT_DESC",
      "kind": "LocalArgument",
      "name": "sort"
    },
    {
      "defaultValue": false,
      "kind": "LocalArgument",
      "name": "visibleToPublic"
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
                      "type": "ExternalPartner",
                      "abstractKey": null
                    },
                    {
                      "kind": "InlineFragment",
                      "selections": [
                        (v0/*: any*/),
                        (v1/*: any*/)
                      ],
                      "type": "Partner",
                      "abstractKey": null
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
  "type": "Artist",
  "abstractKey": null
};
})();

(node as any).hash = "7b49bf81026b3aaff19cb0bfa7c3057a";

export default node;
