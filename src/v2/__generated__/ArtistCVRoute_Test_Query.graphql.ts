/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistCVRoute_Test_QueryVariables = {
    artistID: string;
};
export type ArtistCVRoute_Test_QueryResponse = {
    readonly viewer: {
        readonly " $fragmentRefs": FragmentRefs<"ArtistCVRoute_viewer">;
    } | null;
};
export type ArtistCVRoute_Test_Query = {
    readonly response: ArtistCVRoute_Test_QueryResponse;
    readonly variables: ArtistCVRoute_Test_QueryVariables;
};



/*
query ArtistCVRoute_Test_Query(
  $artistID: String!
) {
  viewer {
    ...ArtistCVRoute_viewer
  }
}

fragment ArtistCVGroup_artist_47e96d on Artist {
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
        startAt(format: "YYYY")
        city
        href
        __typename
      }
      cursor
    }
  }
}

fragment ArtistCVGroup_artist_4DszuY on Artist {
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
        startAt(format: "YYYY")
        city
        href
        __typename
      }
      cursor
    }
  }
}

fragment ArtistCVGroup_artist_ieWPx on Artist {
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
        startAt(format: "YYYY")
        city
        href
        __typename
      }
      cursor
    }
  }
}

fragment ArtistCVRoute_viewer on Viewer {
  soloShows: artist(id: $artistID) {
    ...ArtistCVGroup_artist_ieWPx
    name
    id
  }
  groupShows: artist(id: $artistID) {
    ...ArtistCVGroup_artist_4DszuY
    id
  }
  fairBooths: artist(id: $artistID) {
    ...ArtistCVGroup_artist_47e96d
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "artistID",
    "type": "String!"
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
              (v9/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  (v11/*: any*/)
                ],
                "type": "ExternalPartner"
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  (v11/*: any*/),
                  (v12/*: any*/)
                ],
                "type": "Partner"
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
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtistCVRoute_Test_Query",
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
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ArtistCVRoute_Test_Query",
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
                "args": (v16/*: any*/),
                "concreteType": "ShowConnection",
                "kind": "LinkedField",
                "name": "showsConnection",
                "plural": false,
                "selections": (v13/*: any*/),
                "storageKey": "showsConnection(atAFair:false,first:10,isReference:true,soloShow:false,sort:\"START_AT_DESC\",visibleToPublic:false)"
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
                "args": (v17/*: any*/),
                "concreteType": "ShowConnection",
                "kind": "LinkedField",
                "name": "showsConnection",
                "plural": false,
                "selections": (v13/*: any*/),
                "storageKey": "showsConnection(atAFair:true,first:10,isReference:true,soloShow:false,sort:\"START_AT_DESC\",visibleToPublic:false)"
              },
              {
                "alias": null,
                "args": (v17/*: any*/),
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
    "id": null,
    "metadata": {},
    "name": "ArtistCVRoute_Test_Query",
    "operationKind": "query",
    "text": "query ArtistCVRoute_Test_Query(\n  $artistID: String!\n) {\n  viewer {\n    ...ArtistCVRoute_viewer\n  }\n}\n\nfragment ArtistCVGroup_artist_47e96d on Artist {\n  slug\n  showsConnection(first: 10, sort: START_AT_DESC, atAFair: true, soloShow: false, isReference: true, visibleToPublic: false) {\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    edges {\n      node {\n        id\n        partner {\n          __typename\n          ... on ExternalPartner {\n            name\n            id\n          }\n          ... on Partner {\n            name\n            href\n          }\n          ... on Node {\n            id\n          }\n        }\n        name\n        startAt(format: \"YYYY\")\n        city\n        href\n        __typename\n      }\n      cursor\n    }\n  }\n}\n\nfragment ArtistCVGroup_artist_4DszuY on Artist {\n  slug\n  showsConnection(first: 10, sort: START_AT_DESC, atAFair: false, soloShow: false, isReference: true, visibleToPublic: false) {\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    edges {\n      node {\n        id\n        partner {\n          __typename\n          ... on ExternalPartner {\n            name\n            id\n          }\n          ... on Partner {\n            name\n            href\n          }\n          ... on Node {\n            id\n          }\n        }\n        name\n        startAt(format: \"YYYY\")\n        city\n        href\n        __typename\n      }\n      cursor\n    }\n  }\n}\n\nfragment ArtistCVGroup_artist_ieWPx on Artist {\n  slug\n  showsConnection(first: 10, sort: START_AT_DESC, atAFair: false, soloShow: true, isReference: true, visibleToPublic: false) {\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    edges {\n      node {\n        id\n        partner {\n          __typename\n          ... on ExternalPartner {\n            name\n            id\n          }\n          ... on Partner {\n            name\n            href\n          }\n          ... on Node {\n            id\n          }\n        }\n        name\n        startAt(format: \"YYYY\")\n        city\n        href\n        __typename\n      }\n      cursor\n    }\n  }\n}\n\nfragment ArtistCVRoute_viewer on Viewer {\n  soloShows: artist(id: $artistID) {\n    ...ArtistCVGroup_artist_ieWPx\n    name\n    id\n  }\n  groupShows: artist(id: $artistID) {\n    ...ArtistCVGroup_artist_4DszuY\n    id\n  }\n  fairBooths: artist(id: $artistID) {\n    ...ArtistCVGroup_artist_47e96d\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = 'ffc2acdde5e291925270e12eb40152b4';
export default node;
