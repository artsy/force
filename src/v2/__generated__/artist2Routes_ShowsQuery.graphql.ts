/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type artist2Routes_ShowsQueryVariables = {
    artistID: string;
};
export type artist2Routes_ShowsQueryResponse = {
    readonly viewer: {
        readonly " $fragmentRefs": FragmentRefs<"ArtistShowsRoute_viewer">;
    } | null;
};
export type artist2Routes_ShowsQuery = {
    readonly response: artist2Routes_ShowsQueryResponse;
    readonly variables: artist2Routes_ShowsQueryVariables;
};



/*
query artist2Routes_ShowsQuery(
  $artistID: String!
) {
  viewer {
    ...ArtistShowsRoute_viewer
  }
}

fragment ArtistShowsGroup_artist_12Fjro on Artist {
  slug
  showsConnection(first: 10, sort: START_AT_ASC, status: "upcoming") {
    pageInfo {
      hasNextPage
      endCursor
    }
    pageCursors {
      ...Pagination_pageCursors
    }
    edges {
      node {
        partner {
          __typename
          ... on ExternalPartner {
            name
            id
          }
          ... on Partner {
            name
          }
          ... on Node {
            id
          }
        }
        name
        href
        exhibitionPeriod
        coverImage {
          cropped(width: 440, height: 315) {
            src
            srcSet
          }
        }
        city
        id
      }
    }
  }
}

fragment ArtistShowsGroup_artist_43oec1 on Artist {
  slug
  showsConnection(first: 10, sort: END_AT_ASC, status: "running") {
    pageInfo {
      hasNextPage
      endCursor
    }
    pageCursors {
      ...Pagination_pageCursors
    }
    edges {
      node {
        partner {
          __typename
          ... on ExternalPartner {
            name
            id
          }
          ... on Partner {
            name
          }
          ... on Node {
            id
          }
        }
        name
        href
        exhibitionPeriod
        coverImage {
          cropped(width: 440, height: 315) {
            src
            srcSet
          }
        }
        city
        id
      }
    }
  }
}

fragment ArtistShowsRoute_viewer on Viewer {
  currentShows: artist(id: $artistID) {
    ...ArtistShowsGroup_artist_43oec1
    id
  }
  upcomingShows: artist(id: $artistID) {
    ...ArtistShowsGroup_artist_12Fjro
    id
  }
}

fragment Pagination_pageCursors on PageCursors {
  around {
    cursor
    page
    isCurrent
  }
  first {
    cursor
    page
    isCurrent
  }
  last {
    cursor
    page
    isCurrent
  }
  previous {
    cursor
    page
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
  "name": "first",
  "value": 10
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "page",
  "storageKey": null
},
v6 = [
  (v4/*: any*/),
  (v5/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "isCurrent",
    "storageKey": null
  }
],
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v9 = [
  (v8/*: any*/)
],
v10 = [
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
    "concreteType": "PageCursors",
    "kind": "LinkedField",
    "name": "pageCursors",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "PageCursor",
        "kind": "LinkedField",
        "name": "around",
        "plural": true,
        "selections": (v6/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "PageCursor",
        "kind": "LinkedField",
        "name": "first",
        "plural": false,
        "selections": (v6/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "PageCursor",
        "kind": "LinkedField",
        "name": "last",
        "plural": false,
        "selections": (v6/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "PageCursor",
        "kind": "LinkedField",
        "name": "previous",
        "plural": false,
        "selections": [
          (v4/*: any*/),
          (v5/*: any*/)
        ],
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
            "concreteType": null,
            "kind": "LinkedField",
            "name": "partner",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__typename",
                "storageKey": null
              },
              (v7/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": (v9/*: any*/),
                "type": "ExternalPartner"
              },
              {
                "kind": "InlineFragment",
                "selections": (v9/*: any*/),
                "type": "Partner"
              }
            ],
            "storageKey": null
          },
          (v8/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "href",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "exhibitionPeriod",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Image",
            "kind": "LinkedField",
            "name": "coverImage",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": [
                  {
                    "kind": "Literal",
                    "name": "height",
                    "value": 315
                  },
                  {
                    "kind": "Literal",
                    "name": "width",
                    "value": 440
                  }
                ],
                "concreteType": "CroppedImageUrl",
                "kind": "LinkedField",
                "name": "cropped",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "src",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "srcSet",
                    "storageKey": null
                  }
                ],
                "storageKey": "cropped(height:315,width:440)"
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "city",
            "storageKey": null
          },
          (v7/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "artist2Routes_ShowsQuery",
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
            "name": "ArtistShowsRoute_viewer"
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
    "name": "artist2Routes_ShowsQuery",
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
            "alias": "currentShows",
            "args": (v1/*: any*/),
            "concreteType": "Artist",
            "kind": "LinkedField",
            "name": "artist",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": [
                  (v3/*: any*/),
                  {
                    "kind": "Literal",
                    "name": "sort",
                    "value": "END_AT_ASC"
                  },
                  {
                    "kind": "Literal",
                    "name": "status",
                    "value": "running"
                  }
                ],
                "concreteType": "ShowConnection",
                "kind": "LinkedField",
                "name": "showsConnection",
                "plural": false,
                "selections": (v10/*: any*/),
                "storageKey": "showsConnection(first:10,sort:\"END_AT_ASC\",status:\"running\")"
              },
              (v7/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": "upcomingShows",
            "args": (v1/*: any*/),
            "concreteType": "Artist",
            "kind": "LinkedField",
            "name": "artist",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": [
                  (v3/*: any*/),
                  {
                    "kind": "Literal",
                    "name": "sort",
                    "value": "START_AT_ASC"
                  },
                  {
                    "kind": "Literal",
                    "name": "status",
                    "value": "upcoming"
                  }
                ],
                "concreteType": "ShowConnection",
                "kind": "LinkedField",
                "name": "showsConnection",
                "plural": false,
                "selections": (v10/*: any*/),
                "storageKey": "showsConnection(first:10,sort:\"START_AT_ASC\",status:\"upcoming\")"
              },
              (v7/*: any*/)
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
    "name": "artist2Routes_ShowsQuery",
    "operationKind": "query",
    "text": "query artist2Routes_ShowsQuery(\n  $artistID: String!\n) {\n  viewer {\n    ...ArtistShowsRoute_viewer\n  }\n}\n\nfragment ArtistShowsGroup_artist_12Fjro on Artist {\n  slug\n  showsConnection(first: 10, sort: START_AT_ASC, status: \"upcoming\") {\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    pageCursors {\n      ...Pagination_pageCursors\n    }\n    edges {\n      node {\n        partner {\n          __typename\n          ... on ExternalPartner {\n            name\n            id\n          }\n          ... on Partner {\n            name\n          }\n          ... on Node {\n            id\n          }\n        }\n        name\n        href\n        exhibitionPeriod\n        coverImage {\n          cropped(width: 440, height: 315) {\n            src\n            srcSet\n          }\n        }\n        city\n        id\n      }\n    }\n  }\n}\n\nfragment ArtistShowsGroup_artist_43oec1 on Artist {\n  slug\n  showsConnection(first: 10, sort: END_AT_ASC, status: \"running\") {\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    pageCursors {\n      ...Pagination_pageCursors\n    }\n    edges {\n      node {\n        partner {\n          __typename\n          ... on ExternalPartner {\n            name\n            id\n          }\n          ... on Partner {\n            name\n          }\n          ... on Node {\n            id\n          }\n        }\n        name\n        href\n        exhibitionPeriod\n        coverImage {\n          cropped(width: 440, height: 315) {\n            src\n            srcSet\n          }\n        }\n        city\n        id\n      }\n    }\n  }\n}\n\nfragment ArtistShowsRoute_viewer on Viewer {\n  currentShows: artist(id: $artistID) {\n    ...ArtistShowsGroup_artist_43oec1\n    id\n  }\n  upcomingShows: artist(id: $artistID) {\n    ...ArtistShowsGroup_artist_12Fjro\n    id\n  }\n}\n\nfragment Pagination_pageCursors on PageCursors {\n  around {\n    cursor\n    page\n    isCurrent\n  }\n  first {\n    cursor\n    page\n    isCurrent\n  }\n  last {\n    cursor\n    page\n    isCurrent\n  }\n  previous {\n    cursor\n    page\n  }\n}\n"
  }
};
})();
(node as any).hash = '5a27da8e4a04ff2f293b4ceb324e74ae';
export default node;
