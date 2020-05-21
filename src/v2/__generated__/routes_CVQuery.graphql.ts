/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type routes_CVQueryVariables = {
    artistID: string;
};
export type routes_CVQueryResponse = {
    readonly viewer: {
        readonly " $fragmentRefs": FragmentRefs<"CV_viewer">;
    } | null;
};
export type routes_CVQuery = {
    readonly response: routes_CVQueryResponse;
    readonly variables: routes_CVQueryVariables;
};



/*
query routes_CVQuery(
  $artistID: String!
) {
  viewer {
    ...CV_viewer
  }
}

fragment CVItem_artist_47e96d on Artist {
  slug
  showsConnection(first: 10, sort: START_AT_DESC, atAFair: true, soloShow: false, isReference: true, visibleToPublic: false) {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        id
        partner {
          __typename
          ... on ExternalPartner {
            name
            id
          }
          ... on Partner {
            name
            href
          }
          ... on Node {
            id
          }
        }
        name
        start_at: startAt(format: "YYYY")
        city
        href
        __typename
      }
      cursor
    }
  }
}

fragment CVItem_artist_4DszuY on Artist {
  slug
  showsConnection(first: 10, sort: START_AT_DESC, atAFair: false, soloShow: false, isReference: true, visibleToPublic: false) {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        id
        partner {
          __typename
          ... on ExternalPartner {
            name
            id
          }
          ... on Partner {
            name
            href
          }
          ... on Node {
            id
          }
        }
        name
        start_at: startAt(format: "YYYY")
        city
        href
        __typename
      }
      cursor
    }
  }
}

fragment CVItem_artist_ieWPx on Artist {
  slug
  showsConnection(first: 10, sort: START_AT_DESC, atAFair: false, soloShow: true, isReference: true, visibleToPublic: false) {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        id
        partner {
          __typename
          ... on ExternalPartner {
            name
            id
          }
          ... on Partner {
            name
            href
          }
          ... on Node {
            id
          }
        }
        name
        start_at: startAt(format: "YYYY")
        city
        href
        __typename
      }
      cursor
    }
  }
}

fragment CV_viewer on Viewer {
  artist_soloShows: artist(id: $artistID) {
    ...CVItem_artist_ieWPx
    id
  }
  artist_groupShows: artist(id: $artistID) {
    ...CVItem_artist_4DszuY
    id
  }
  artist_fairBooths: artist(id: $artistID) {
    ...CVItem_artist_47e96d
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "artistID",
    "type": "String!",
    "defaultValue": null
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
  "kind": "ScalarField",
  "alias": null,
  "name": "slug",
  "args": null,
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
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v10 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__typename",
  "args": null,
  "storageKey": null
},
v11 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v12 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "href",
  "args": null,
  "storageKey": null
},
v13 = [
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
          (v9/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "partner",
            "storageKey": null,
            "args": null,
            "concreteType": null,
            "plural": false,
            "selections": [
              (v10/*: any*/),
              (v9/*: any*/),
              {
                "kind": "InlineFragment",
                "type": "ExternalPartner",
                "selections": [
                  (v11/*: any*/)
                ]
              },
              {
                "kind": "InlineFragment",
                "type": "Partner",
                "selections": [
                  (v11/*: any*/),
                  (v12/*: any*/)
                ]
              }
            ]
          },
          (v11/*: any*/),
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
          (v12/*: any*/),
          (v10/*: any*/)
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
],
v14 = [
  "sort",
  "atAFair",
  "soloShow",
  "isReference",
  "visibleToPublic"
],
v15 = {
  "kind": "Literal",
  "name": "soloShow",
  "value": false
},
v16 = [
  (v3/*: any*/),
  (v4/*: any*/),
  (v5/*: any*/),
  (v15/*: any*/),
  (v6/*: any*/),
  (v7/*: any*/)
],
v17 = [
  {
    "kind": "Literal",
    "name": "atAFair",
    "value": true
  },
  (v4/*: any*/),
  (v5/*: any*/),
  (v15/*: any*/),
  (v6/*: any*/),
  (v7/*: any*/)
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "routes_CVQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "viewer",
        "storageKey": null,
        "args": null,
        "concreteType": "Viewer",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "CV_viewer",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "routes_CVQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "viewer",
        "storageKey": null,
        "args": null,
        "concreteType": "Viewer",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": "artist_soloShows",
            "name": "artist",
            "storageKey": null,
            "args": (v1/*: any*/),
            "concreteType": "Artist",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "showsConnection",
                "storageKey": "showsConnection(atAFair:false,first:10,isReference:true,soloShow:true,sort:\"START_AT_DESC\",visibleToPublic:false)",
                "args": (v8/*: any*/),
                "concreteType": "ShowConnection",
                "plural": false,
                "selections": (v13/*: any*/)
              },
              {
                "kind": "LinkedHandle",
                "alias": null,
                "name": "showsConnection",
                "args": (v8/*: any*/),
                "handle": "connection",
                "key": "Artist_showsConnection",
                "filters": (v14/*: any*/)
              },
              (v9/*: any*/)
            ]
          },
          {
            "kind": "LinkedField",
            "alias": "artist_groupShows",
            "name": "artist",
            "storageKey": null,
            "args": (v1/*: any*/),
            "concreteType": "Artist",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "showsConnection",
                "storageKey": "showsConnection(atAFair:false,first:10,isReference:true,soloShow:false,sort:\"START_AT_DESC\",visibleToPublic:false)",
                "args": (v16/*: any*/),
                "concreteType": "ShowConnection",
                "plural": false,
                "selections": (v13/*: any*/)
              },
              {
                "kind": "LinkedHandle",
                "alias": null,
                "name": "showsConnection",
                "args": (v16/*: any*/),
                "handle": "connection",
                "key": "Artist_showsConnection",
                "filters": (v14/*: any*/)
              },
              (v9/*: any*/)
            ]
          },
          {
            "kind": "LinkedField",
            "alias": "artist_fairBooths",
            "name": "artist",
            "storageKey": null,
            "args": (v1/*: any*/),
            "concreteType": "Artist",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "showsConnection",
                "storageKey": "showsConnection(atAFair:true,first:10,isReference:true,soloShow:false,sort:\"START_AT_DESC\",visibleToPublic:false)",
                "args": (v17/*: any*/),
                "concreteType": "ShowConnection",
                "plural": false,
                "selections": (v13/*: any*/)
              },
              {
                "kind": "LinkedHandle",
                "alias": null,
                "name": "showsConnection",
                "args": (v17/*: any*/),
                "handle": "connection",
                "key": "Artist_showsConnection",
                "filters": (v14/*: any*/)
              },
              (v9/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "routes_CVQuery",
    "id": null,
    "text": "query routes_CVQuery(\n  $artistID: String!\n) {\n  viewer {\n    ...CV_viewer\n  }\n}\n\nfragment CVItem_artist_47e96d on Artist {\n  slug\n  showsConnection(first: 10, sort: START_AT_DESC, atAFair: true, soloShow: false, isReference: true, visibleToPublic: false) {\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    edges {\n      node {\n        id\n        partner {\n          __typename\n          ... on ExternalPartner {\n            name\n            id\n          }\n          ... on Partner {\n            name\n            href\n          }\n          ... on Node {\n            id\n          }\n        }\n        name\n        start_at: startAt(format: \"YYYY\")\n        city\n        href\n        __typename\n      }\n      cursor\n    }\n  }\n}\n\nfragment CVItem_artist_4DszuY on Artist {\n  slug\n  showsConnection(first: 10, sort: START_AT_DESC, atAFair: false, soloShow: false, isReference: true, visibleToPublic: false) {\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    edges {\n      node {\n        id\n        partner {\n          __typename\n          ... on ExternalPartner {\n            name\n            id\n          }\n          ... on Partner {\n            name\n            href\n          }\n          ... on Node {\n            id\n          }\n        }\n        name\n        start_at: startAt(format: \"YYYY\")\n        city\n        href\n        __typename\n      }\n      cursor\n    }\n  }\n}\n\nfragment CVItem_artist_ieWPx on Artist {\n  slug\n  showsConnection(first: 10, sort: START_AT_DESC, atAFair: false, soloShow: true, isReference: true, visibleToPublic: false) {\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    edges {\n      node {\n        id\n        partner {\n          __typename\n          ... on ExternalPartner {\n            name\n            id\n          }\n          ... on Partner {\n            name\n            href\n          }\n          ... on Node {\n            id\n          }\n        }\n        name\n        start_at: startAt(format: \"YYYY\")\n        city\n        href\n        __typename\n      }\n      cursor\n    }\n  }\n}\n\nfragment CV_viewer on Viewer {\n  artist_soloShows: artist(id: $artistID) {\n    ...CVItem_artist_ieWPx\n    id\n  }\n  artist_groupShows: artist(id: $artistID) {\n    ...CVItem_artist_4DszuY\n    id\n  }\n  artist_fairBooths: artist(id: $artistID) {\n    ...CVItem_artist_47e96d\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '0d19d6e79f51852c6aff6bc82562eeb8';
export default node;
