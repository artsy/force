/**
 * @generated SignedSource<<9960e3be66431f220ae6fdb688a49901>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistCVRouteTestQuery$variables = {
  artistID: string;
};
export type ArtistCVRouteTestQuery$data = {
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtistCVRoute_viewer">;
  } | null | undefined;
};
export type ArtistCVRouteTestQuery = {
  response: ArtistCVRouteTestQuery$data;
  variables: ArtistCVRouteTestQuery$variables;
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
  "name": "slug",
  "storageKey": null
},
v3 = {
  "kind": "Literal",
  "name": "atAFair",
  "value": false
},
v4 = {
  "kind": "Literal",
  "name": "first",
  "value": 10
},
v5 = {
  "kind": "Literal",
  "name": "isReference",
  "value": true
},
v6 = {
  "kind": "Literal",
  "name": "sort",
  "value": "START_AT_DESC"
},
v7 = {
  "kind": "Literal",
  "name": "visibleToPublic",
  "value": false
},
v8 = [
  (v3/*: any*/),
  (v4/*: any*/),
  (v5/*: any*/),
  {
    "kind": "Literal",
    "name": "soloShow",
    "value": true
  },
  (v6/*: any*/),
  (v7/*: any*/)
],
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
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
          (v9/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "partner",
            "plural": false,
            "selections": [
              (v10/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  (v11/*: any*/),
                  (v9/*: any*/)
                ],
                "type": "ExternalPartner",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  (v11/*: any*/),
                  (v12/*: any*/)
                ],
                "type": "Partner",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  (v9/*: any*/)
                ],
                "type": "Node",
                "abstractKey": "__isNode"
              }
            ],
            "storageKey": null
          },
          (v11/*: any*/),
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
          (v10/*: any*/)
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
  (v3/*: any*/),
  (v4/*: any*/),
  (v5/*: any*/),
  {
    "kind": "Literal",
    "name": "soloShow",
    "value": false
  },
  (v6/*: any*/),
  (v7/*: any*/)
],
v16 = [
  {
    "kind": "Literal",
    "name": "atAFair",
    "value": true
  },
  (v4/*: any*/),
  (v5/*: any*/),
  (v6/*: any*/),
  (v7/*: any*/)
],
v17 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Artist"
},
v18 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v19 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ShowConnection"
},
v20 = {
  "enumValues": null,
  "nullable": true,
  "plural": true,
  "type": "ShowEdge"
},
v21 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v22 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Show"
},
v23 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v24 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "PartnerTypes"
},
v25 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "PageInfo"
},
v26 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Boolean"
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtistCVRouteTestQuery",
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
    "name": "ArtistCVRouteTestQuery",
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
            "alias": "soloShows",
            "args": (v1/*: any*/),
            "concreteType": "Artist",
            "kind": "LinkedField",
            "name": "artist",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": (v8/*: any*/),
                "concreteType": "ShowConnection",
                "kind": "LinkedField",
                "name": "showsConnection",
                "plural": false,
                "selections": (v13/*: any*/),
                "storageKey": "showsConnection(atAFair:false,first:10,isReference:true,soloShow:true,sort:\"START_AT_DESC\",visibleToPublic:false)"
              },
              {
                "alias": null,
                "args": (v8/*: any*/),
                "filters": (v14/*: any*/),
                "handle": "connection",
                "key": "ArtistCVGroup_showsConnection",
                "kind": "LinkedHandle",
                "name": "showsConnection"
              },
              (v11/*: any*/),
              (v9/*: any*/)
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
              (v2/*: any*/),
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
              (v9/*: any*/)
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
              (v2/*: any*/),
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
              (v9/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "2bfa412792b58459416b92c2b5370335",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "viewer": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Viewer"
        },
        "viewer.fairBooths": (v17/*: any*/),
        "viewer.fairBooths.id": (v18/*: any*/),
        "viewer.fairBooths.showsConnection": (v19/*: any*/),
        "viewer.fairBooths.showsConnection.edges": (v20/*: any*/),
        "viewer.fairBooths.showsConnection.edges.cursor": (v21/*: any*/),
        "viewer.fairBooths.showsConnection.edges.node": (v22/*: any*/),
        "viewer.fairBooths.showsConnection.edges.node.__typename": (v21/*: any*/),
        "viewer.fairBooths.showsConnection.edges.node.city": (v23/*: any*/),
        "viewer.fairBooths.showsConnection.edges.node.href": (v23/*: any*/),
        "viewer.fairBooths.showsConnection.edges.node.id": (v18/*: any*/),
        "viewer.fairBooths.showsConnection.edges.node.name": (v23/*: any*/),
        "viewer.fairBooths.showsConnection.edges.node.partner": (v24/*: any*/),
        "viewer.fairBooths.showsConnection.edges.node.partner.__isNode": (v21/*: any*/),
        "viewer.fairBooths.showsConnection.edges.node.partner.__typename": (v21/*: any*/),
        "viewer.fairBooths.showsConnection.edges.node.partner.href": (v23/*: any*/),
        "viewer.fairBooths.showsConnection.edges.node.partner.id": (v18/*: any*/),
        "viewer.fairBooths.showsConnection.edges.node.partner.name": (v23/*: any*/),
        "viewer.fairBooths.showsConnection.edges.node.startAt": (v23/*: any*/),
        "viewer.fairBooths.showsConnection.pageInfo": (v25/*: any*/),
        "viewer.fairBooths.showsConnection.pageInfo.endCursor": (v23/*: any*/),
        "viewer.fairBooths.showsConnection.pageInfo.hasNextPage": (v26/*: any*/),
        "viewer.fairBooths.slug": (v18/*: any*/),
        "viewer.groupShows": (v17/*: any*/),
        "viewer.groupShows.id": (v18/*: any*/),
        "viewer.groupShows.showsConnection": (v19/*: any*/),
        "viewer.groupShows.showsConnection.edges": (v20/*: any*/),
        "viewer.groupShows.showsConnection.edges.cursor": (v21/*: any*/),
        "viewer.groupShows.showsConnection.edges.node": (v22/*: any*/),
        "viewer.groupShows.showsConnection.edges.node.__typename": (v21/*: any*/),
        "viewer.groupShows.showsConnection.edges.node.city": (v23/*: any*/),
        "viewer.groupShows.showsConnection.edges.node.href": (v23/*: any*/),
        "viewer.groupShows.showsConnection.edges.node.id": (v18/*: any*/),
        "viewer.groupShows.showsConnection.edges.node.name": (v23/*: any*/),
        "viewer.groupShows.showsConnection.edges.node.partner": (v24/*: any*/),
        "viewer.groupShows.showsConnection.edges.node.partner.__isNode": (v21/*: any*/),
        "viewer.groupShows.showsConnection.edges.node.partner.__typename": (v21/*: any*/),
        "viewer.groupShows.showsConnection.edges.node.partner.href": (v23/*: any*/),
        "viewer.groupShows.showsConnection.edges.node.partner.id": (v18/*: any*/),
        "viewer.groupShows.showsConnection.edges.node.partner.name": (v23/*: any*/),
        "viewer.groupShows.showsConnection.edges.node.startAt": (v23/*: any*/),
        "viewer.groupShows.showsConnection.pageInfo": (v25/*: any*/),
        "viewer.groupShows.showsConnection.pageInfo.endCursor": (v23/*: any*/),
        "viewer.groupShows.showsConnection.pageInfo.hasNextPage": (v26/*: any*/),
        "viewer.groupShows.slug": (v18/*: any*/),
        "viewer.soloShows": (v17/*: any*/),
        "viewer.soloShows.id": (v18/*: any*/),
        "viewer.soloShows.name": (v23/*: any*/),
        "viewer.soloShows.showsConnection": (v19/*: any*/),
        "viewer.soloShows.showsConnection.edges": (v20/*: any*/),
        "viewer.soloShows.showsConnection.edges.cursor": (v21/*: any*/),
        "viewer.soloShows.showsConnection.edges.node": (v22/*: any*/),
        "viewer.soloShows.showsConnection.edges.node.__typename": (v21/*: any*/),
        "viewer.soloShows.showsConnection.edges.node.city": (v23/*: any*/),
        "viewer.soloShows.showsConnection.edges.node.href": (v23/*: any*/),
        "viewer.soloShows.showsConnection.edges.node.id": (v18/*: any*/),
        "viewer.soloShows.showsConnection.edges.node.name": (v23/*: any*/),
        "viewer.soloShows.showsConnection.edges.node.partner": (v24/*: any*/),
        "viewer.soloShows.showsConnection.edges.node.partner.__isNode": (v21/*: any*/),
        "viewer.soloShows.showsConnection.edges.node.partner.__typename": (v21/*: any*/),
        "viewer.soloShows.showsConnection.edges.node.partner.href": (v23/*: any*/),
        "viewer.soloShows.showsConnection.edges.node.partner.id": (v18/*: any*/),
        "viewer.soloShows.showsConnection.edges.node.partner.name": (v23/*: any*/),
        "viewer.soloShows.showsConnection.edges.node.startAt": (v23/*: any*/),
        "viewer.soloShows.showsConnection.pageInfo": (v25/*: any*/),
        "viewer.soloShows.showsConnection.pageInfo.endCursor": (v23/*: any*/),
        "viewer.soloShows.showsConnection.pageInfo.hasNextPage": (v26/*: any*/),
        "viewer.soloShows.slug": (v18/*: any*/)
      }
    },
    "name": "ArtistCVRouteTestQuery",
    "operationKind": "query",
    "text": "query ArtistCVRouteTestQuery(\n  $artistID: String!\n) {\n  viewer {\n    ...ArtistCVRoute_viewer\n  }\n}\n\nfragment ArtistCVGroup_artist_47e96d on Artist {\n  slug\n  showsConnection(first: 10, sort: START_AT_DESC, atAFair: true, isReference: true, visibleToPublic: false) {\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    edges {\n      node {\n        id\n        partner {\n          __typename\n          ... on ExternalPartner {\n            name\n            id\n          }\n          ... on Partner {\n            name\n            href\n          }\n          ... on Node {\n            __isNode: __typename\n            id\n          }\n        }\n        name\n        startAt(format: \"YYYY\")\n        city\n        href\n        __typename\n      }\n      cursor\n    }\n  }\n}\n\nfragment ArtistCVGroup_artist_8zYC6 on Artist {\n  slug\n  showsConnection(first: 10, sort: START_AT_DESC, atAFair: false, soloShow: false, isReference: true, visibleToPublic: false) {\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    edges {\n      node {\n        id\n        partner {\n          __typename\n          ... on ExternalPartner {\n            name\n            id\n          }\n          ... on Partner {\n            name\n            href\n          }\n          ... on Node {\n            __isNode: __typename\n            id\n          }\n        }\n        name\n        startAt(format: \"YYYY\")\n        city\n        href\n        __typename\n      }\n      cursor\n    }\n  }\n}\n\nfragment ArtistCVGroup_artist_ieWPx on Artist {\n  slug\n  showsConnection(first: 10, sort: START_AT_DESC, atAFair: false, soloShow: true, isReference: true, visibleToPublic: false) {\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    edges {\n      node {\n        id\n        partner {\n          __typename\n          ... on ExternalPartner {\n            name\n            id\n          }\n          ... on Partner {\n            name\n            href\n          }\n          ... on Node {\n            __isNode: __typename\n            id\n          }\n        }\n        name\n        startAt(format: \"YYYY\")\n        city\n        href\n        __typename\n      }\n      cursor\n    }\n  }\n}\n\nfragment ArtistCVRoute_viewer on Viewer {\n  soloShows: artist(id: $artistID) @principalField {\n    ...ArtistCVGroup_artist_ieWPx\n    name\n    id\n  }\n  groupShows: artist(id: $artistID) {\n    ...ArtistCVGroup_artist_8zYC6\n    id\n  }\n  fairBooths: artist(id: $artistID) {\n    ...ArtistCVGroup_artist_47e96d\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "488a29ae46a67234f339e4b2a9734c3c";

export default node;
