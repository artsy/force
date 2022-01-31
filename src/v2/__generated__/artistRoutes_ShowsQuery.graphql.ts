/**
 * @generated SignedSource<<e5666959a171bebd841816dec0317d2f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type artistRoutes_ShowsQuery$variables = {
  artistID: string;
};
export type artistRoutes_ShowsQuery$data = {
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtistShowsRoute_viewer">;
  } | null;
};
export type artistRoutes_ShowsQuery = {
  variables: artistRoutes_ShowsQuery$variables;
  response: artistRoutes_ShowsQuery$data;
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
  "name": "name",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v9 = [
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
              {
                "kind": "InlineFragment",
                "selections": [
                  (v7/*: any*/),
                  (v8/*: any*/)
                ],
                "type": "ExternalPartner",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  (v7/*: any*/)
                ],
                "type": "Partner",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  (v8/*: any*/)
                ],
                "type": "Node",
                "abstractKey": "__isNode"
              }
            ],
            "storageKey": null
          },
          (v7/*: any*/),
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
          (v8/*: any*/)
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
    "name": "artistRoutes_ShowsQuery",
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
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "artistRoutes_ShowsQuery",
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
                "selections": (v9/*: any*/),
                "storageKey": "showsConnection(first:10,sort:\"END_AT_ASC\",status:\"running\")"
              },
              (v7/*: any*/),
              (v8/*: any*/)
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
                "selections": (v9/*: any*/),
                "storageKey": "showsConnection(first:10,sort:\"START_AT_ASC\",status:\"upcoming\")"
              },
              (v8/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "86c973ea1bdda0df330c907c04cd1699",
    "id": null,
    "metadata": {},
    "name": "artistRoutes_ShowsQuery",
    "operationKind": "query",
    "text": "query artistRoutes_ShowsQuery(\n  $artistID: String!\n) {\n  viewer {\n    ...ArtistShowsRoute_viewer\n  }\n}\n\nfragment ArtistShowsGroup_artist_12Fjro on Artist {\n  slug\n  showsConnection(first: 10, sort: START_AT_ASC, status: \"upcoming\") {\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    pageCursors {\n      ...Pagination_pageCursors\n    }\n    edges {\n      node {\n        partner {\n          __typename\n          ... on ExternalPartner {\n            name\n            id\n          }\n          ... on Partner {\n            name\n          }\n          ... on Node {\n            __isNode: __typename\n            id\n          }\n        }\n        name\n        href\n        exhibitionPeriod\n        coverImage {\n          cropped(width: 440, height: 315) {\n            src\n            srcSet\n          }\n        }\n        city\n        id\n      }\n    }\n  }\n}\n\nfragment ArtistShowsGroup_artist_43oec1 on Artist {\n  slug\n  showsConnection(first: 10, sort: END_AT_ASC, status: \"running\") {\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    pageCursors {\n      ...Pagination_pageCursors\n    }\n    edges {\n      node {\n        partner {\n          __typename\n          ... on ExternalPartner {\n            name\n            id\n          }\n          ... on Partner {\n            name\n          }\n          ... on Node {\n            __isNode: __typename\n            id\n          }\n        }\n        name\n        href\n        exhibitionPeriod\n        coverImage {\n          cropped(width: 440, height: 315) {\n            src\n            srcSet\n          }\n        }\n        city\n        id\n      }\n    }\n  }\n}\n\nfragment ArtistShowsRoute_viewer on Viewer {\n  currentShows: artist(id: $artistID) {\n    ...ArtistShowsGroup_artist_43oec1\n    name\n    id\n  }\n  upcomingShows: artist(id: $artistID) {\n    ...ArtistShowsGroup_artist_12Fjro\n    id\n  }\n}\n\nfragment Pagination_pageCursors on PageCursors {\n  around {\n    cursor\n    page\n    isCurrent\n  }\n  first {\n    cursor\n    page\n    isCurrent\n  }\n  last {\n    cursor\n    page\n    isCurrent\n  }\n  previous {\n    cursor\n    page\n  }\n}\n"
  }
};
})();

(node as any).hash = "634807912343139c14caeabde6688a5b";

export default node;
