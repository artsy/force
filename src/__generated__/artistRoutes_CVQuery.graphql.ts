/**
 * @generated SignedSource<<5b52db99042fa2dcd3f71916111c81c7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type artistRoutes_CVQuery$variables = {
  artistID: string;
};
export type artistRoutes_CVQuery$data = {
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtistCVRoute_viewer">;
  } | null | undefined;
};
export type artistRoutes_CVQuery = {
  response: artistRoutes_CVQuery$data;
  variables: artistRoutes_CVQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "artistID"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "artistID"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = {
  "kind": "Literal",
  "name": "atAFair",
  "value": false
},
v6 = {
  "kind": "Literal",
  "name": "first",
  "value": 10
},
v7 = {
  "kind": "Literal",
  "name": "isReference",
  "value": true
},
v8 = {
  "kind": "Literal",
  "name": "sort",
  "value": "START_AT_DESC"
},
v9 = {
  "kind": "Literal",
  "name": "visibleToPublic",
  "value": false
},
v10 = [
  (v5/*: any*/),
  (v6/*: any*/),
  (v7/*: any*/),
  {
    "kind": "Literal",
    "name": "soloShow",
    "value": true
  },
  (v8/*: any*/),
  (v9/*: any*/)
],
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v13 = [
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
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "partner",
            "plural": false,
            "selections": [
              (v11/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  (v2/*: any*/),
                  (v4/*: any*/)
                ],
                "type": "ExternalPartner",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  (v2/*: any*/),
                  (v12/*: any*/)
                ],
                "type": "Partner",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  (v4/*: any*/)
                ],
                "type": "Node",
                "abstractKey": "__isNode"
              }
            ],
            "storageKey": null
          },
          (v2/*: any*/),
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
          (v12/*: any*/),
          (v11/*: any*/)
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
v14 = [
  "sort",
  "atAFair",
  "soloShow",
  "isReference",
  "visibleToPublic"
],
v15 = [
  (v5/*: any*/),
  (v6/*: any*/),
  (v7/*: any*/),
  {
    "kind": "Literal",
    "name": "soloShow",
    "value": false
  },
  (v8/*: any*/),
  (v9/*: any*/)
],
v16 = [
  {
    "kind": "Literal",
    "name": "atAFair",
    "value": true
  },
  (v6/*: any*/),
  (v7/*: any*/),
  (v8/*: any*/),
  (v9/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "artistRoutes_CVQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ArtistCVRoute_viewer"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "artistRoutes_CVQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v1/*: any*/),
            "concreteType": "Artist",
            "kind": "LinkedField",
            "name": "artist",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": "soloShows",
            "args": (v1/*: any*/),
            "concreteType": "Artist",
            "kind": "LinkedField",
            "name": "artist",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              {
                "alias": null,
                "args": (v10/*: any*/),
                "concreteType": "ShowConnection",
                "kind": "LinkedField",
                "name": "showsConnection",
                "plural": false,
                "selections": (v13/*: any*/),
                "storageKey": "showsConnection(atAFair:false,first:10,isReference:true,soloShow:true,sort:\"START_AT_DESC\",visibleToPublic:false)"
              },
              {
                "alias": null,
                "args": (v10/*: any*/),
                "filters": (v14/*: any*/),
                "handle": "connection",
                "key": "ArtistCVGroup_showsConnection",
                "kind": "LinkedHandle",
                "name": "showsConnection"
              },
              (v4/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": "groupShows",
            "args": (v1/*: any*/),
            "concreteType": "Artist",
            "kind": "LinkedField",
            "name": "artist",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              {
                "alias": null,
                "args": (v15/*: any*/),
                "concreteType": "ShowConnection",
                "kind": "LinkedField",
                "name": "showsConnection",
                "plural": false,
                "selections": (v13/*: any*/),
                "storageKey": "showsConnection(atAFair:false,first:10,isReference:true,soloShow:false,sort:\"START_AT_DESC\",visibleToPublic:false)"
              },
              {
                "alias": null,
                "args": (v15/*: any*/),
                "filters": (v14/*: any*/),
                "handle": "connection",
                "key": "ArtistCVGroup_showsConnection",
                "kind": "LinkedHandle",
                "name": "showsConnection"
              },
              (v4/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": "fairBooths",
            "args": (v1/*: any*/),
            "concreteType": "Artist",
            "kind": "LinkedField",
            "name": "artist",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              {
                "alias": null,
                "args": (v16/*: any*/),
                "concreteType": "ShowConnection",
                "kind": "LinkedField",
                "name": "showsConnection",
                "plural": false,
                "selections": (v13/*: any*/),
                "storageKey": "showsConnection(atAFair:true,first:10,isReference:true,sort:\"START_AT_DESC\",visibleToPublic:false)"
              },
              {
                "alias": null,
                "args": (v16/*: any*/),
                "filters": (v14/*: any*/),
                "handle": "connection",
                "key": "ArtistCVGroup_showsConnection",
                "kind": "LinkedHandle",
                "name": "showsConnection"
              },
              (v4/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "0a7b8f5754545e7e3e4f768030c3249b",
    "id": null,
    "metadata": {},
    "name": "artistRoutes_CVQuery",
    "operationKind": "query",
    "text": "query artistRoutes_CVQuery(\n  $artistID: String!\n) @cacheable {\n  viewer {\n    ...ArtistCVRoute_viewer\n  }\n}\n\nfragment ArtistCVGroup_artist_47e96d on Artist {\n  slug\n  showsConnection(first: 10, sort: START_AT_DESC, atAFair: true, isReference: true, visibleToPublic: false) {\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    edges {\n      node {\n        id\n        partner {\n          __typename\n          ... on ExternalPartner {\n            name\n            id\n          }\n          ... on Partner {\n            name\n            href\n          }\n          ... on Node {\n            __isNode: __typename\n            id\n          }\n        }\n        name\n        startAt(format: \"YYYY\")\n        city\n        href\n        __typename\n      }\n      cursor\n    }\n  }\n}\n\nfragment ArtistCVGroup_artist_8zYC6 on Artist {\n  slug\n  showsConnection(first: 10, sort: START_AT_DESC, atAFair: false, soloShow: false, isReference: true, visibleToPublic: false) {\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    edges {\n      node {\n        id\n        partner {\n          __typename\n          ... on ExternalPartner {\n            name\n            id\n          }\n          ... on Partner {\n            name\n            href\n          }\n          ... on Node {\n            __isNode: __typename\n            id\n          }\n        }\n        name\n        startAt(format: \"YYYY\")\n        city\n        href\n        __typename\n      }\n      cursor\n    }\n  }\n}\n\nfragment ArtistCVGroup_artist_ieWPx on Artist {\n  slug\n  showsConnection(first: 10, sort: START_AT_DESC, atAFair: false, soloShow: true, isReference: true, visibleToPublic: false) {\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    edges {\n      node {\n        id\n        partner {\n          __typename\n          ... on ExternalPartner {\n            name\n            id\n          }\n          ... on Partner {\n            name\n            href\n          }\n          ... on Node {\n            __isNode: __typename\n            id\n          }\n        }\n        name\n        startAt(format: \"YYYY\")\n        city\n        href\n        __typename\n      }\n      cursor\n    }\n  }\n}\n\nfragment ArtistCVRoute_viewer on Viewer {\n  artist(id: $artistID) @principalField {\n    name\n    slug\n    id\n  }\n  soloShows: artist(id: $artistID) {\n    ...ArtistCVGroup_artist_ieWPx\n    id\n  }\n  groupShows: artist(id: $artistID) {\n    ...ArtistCVGroup_artist_8zYC6\n    id\n  }\n  fairBooths: artist(id: $artistID) {\n    ...ArtistCVGroup_artist_47e96d\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "ccdb44e832454873e6509ab787140334";

export default node;
