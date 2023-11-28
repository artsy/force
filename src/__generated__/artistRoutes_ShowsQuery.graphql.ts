/**
 * @generated SignedSource<<a0b05fb6ef4443efef964a7403a29246>>
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
  } | null | undefined;
};
export type artistRoutes_ShowsQuery = {
  response: artistRoutes_ShowsQuery$data;
  variables: artistRoutes_ShowsQuery$variables;
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
  "kind": "Literal",
  "name": "first",
  "value": 1
},
v4 = {
  "kind": "Literal",
  "name": "status",
  "value": "running"
},
v5 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "totalCount",
    "storageKey": null
  }
],
v6 = {
  "kind": "Literal",
  "name": "status",
  "value": "upcoming"
},
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
  "name": "slug",
  "storageKey": null
},
v9 = {
  "kind": "Literal",
  "name": "first",
  "value": 12
},
v10 = {
  "kind": "Literal",
  "name": "page",
  "value": 1
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "page",
  "storageKey": null
},
v13 = [
  (v11/*: any*/),
  (v12/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "isCurrent",
    "storageKey": null
  }
],
v14 = [
  (v7/*: any*/)
],
v15 = [
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
        "selections": (v13/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "PageCursor",
        "kind": "LinkedField",
        "name": "first",
        "plural": false,
        "selections": (v13/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "PageCursor",
        "kind": "LinkedField",
        "name": "last",
        "plural": false,
        "selections": (v13/*: any*/),
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
          (v11/*: any*/),
          (v12/*: any*/)
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
            "kind": "ScalarField",
            "name": "internalID",
            "storageKey": null
          },
          (v8/*: any*/),
          (v2/*: any*/),
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
            "name": "startAt",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "endAt",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isFairBooth",
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
                  (v2/*: any*/)
                ],
                "type": "Partner",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": (v14/*: any*/),
                "type": "Node",
                "abstractKey": "__isNode"
              },
              {
                "kind": "InlineFragment",
                "selections": (v14/*: any*/),
                "type": "ExternalPartner",
                "abstractKey": null
              }
            ],
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
                    "value": 334
                  },
                  {
                    "kind": "Literal",
                    "name": "version",
                    "value": [
                      "larger",
                      "large"
                    ]
                  },
                  {
                    "kind": "Literal",
                    "name": "width",
                    "value": 445
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
                "storageKey": "cropped(height:334,version:[\"larger\",\"large\"],width:445)"
              }
            ],
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
            "alias": null,
            "args": (v1/*: any*/),
            "concreteType": "Artist",
            "kind": "LinkedField",
            "name": "artist",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "alias": "currentShowsCount",
                "args": [
                  (v3/*: any*/),
                  (v4/*: any*/)
                ],
                "concreteType": "ShowConnection",
                "kind": "LinkedField",
                "name": "showsConnection",
                "plural": false,
                "selections": (v5/*: any*/),
                "storageKey": "showsConnection(first:1,status:\"running\")"
              },
              {
                "alias": "upcomingShowsCount",
                "args": [
                  (v3/*: any*/),
                  (v6/*: any*/)
                ],
                "concreteType": "ShowConnection",
                "kind": "LinkedField",
                "name": "showsConnection",
                "plural": false,
                "selections": (v5/*: any*/),
                "storageKey": "showsConnection(first:1,status:\"upcoming\")"
              },
              (v7/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": "currentShows",
            "args": (v1/*: any*/),
            "concreteType": "Artist",
            "kind": "LinkedField",
            "name": "artist",
            "plural": false,
            "selections": [
              (v8/*: any*/),
              {
                "alias": null,
                "args": [
                  (v9/*: any*/),
                  (v10/*: any*/),
                  {
                    "kind": "Literal",
                    "name": "sort",
                    "value": "END_AT_ASC"
                  },
                  (v4/*: any*/)
                ],
                "concreteType": "ShowConnection",
                "kind": "LinkedField",
                "name": "showsConnection",
                "plural": false,
                "selections": (v15/*: any*/),
                "storageKey": "showsConnection(first:12,page:1,sort:\"END_AT_ASC\",status:\"running\")"
              },
              (v2/*: any*/),
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
              (v8/*: any*/),
              {
                "alias": null,
                "args": [
                  (v9/*: any*/),
                  (v10/*: any*/),
                  {
                    "kind": "Literal",
                    "name": "sort",
                    "value": "START_AT_ASC"
                  },
                  (v6/*: any*/)
                ],
                "concreteType": "ShowConnection",
                "kind": "LinkedField",
                "name": "showsConnection",
                "plural": false,
                "selections": (v15/*: any*/),
                "storageKey": "showsConnection(first:12,page:1,sort:\"START_AT_ASC\",status:\"upcoming\")"
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
    "cacheID": "700661f000483136350b1979f681469d",
    "id": null,
    "metadata": {},
    "name": "artistRoutes_ShowsQuery",
    "operationKind": "query",
    "text": "query artistRoutes_ShowsQuery(\n  $artistID: String!\n) {\n  viewer {\n    ...ArtistShowsRoute_viewer\n  }\n}\n\nfragment ArtistShowsGroup_artist_12Fjro on Artist {\n  slug\n  showsConnection(first: 12, page: 1, sort: START_AT_ASC, status: \"upcoming\") {\n    pageInfo {\n      hasNextPage\n    }\n    pageCursors {\n      ...Pagination_pageCursors\n    }\n    edges {\n      node {\n        ...CellShow_show\n        internalID\n        id\n      }\n    }\n  }\n}\n\nfragment ArtistShowsGroup_artist_43oec1 on Artist {\n  slug\n  showsConnection(first: 12, page: 1, sort: END_AT_ASC, status: \"running\") {\n    pageInfo {\n      hasNextPage\n    }\n    pageCursors {\n      ...Pagination_pageCursors\n    }\n    edges {\n      node {\n        ...CellShow_show\n        internalID\n        id\n      }\n    }\n  }\n}\n\nfragment ArtistShowsRoute_viewer on Viewer {\n  artist(id: $artistID) {\n    name\n    currentShowsCount: showsConnection(first: 1, status: \"running\") {\n      totalCount\n    }\n    upcomingShowsCount: showsConnection(first: 1, status: \"upcoming\") {\n      totalCount\n    }\n    id\n  }\n  currentShows: artist(id: $artistID) {\n    ...ArtistShowsGroup_artist_43oec1\n    name\n    id\n  }\n  upcomingShows: artist(id: $artistID) {\n    ...ArtistShowsGroup_artist_12Fjro\n    id\n  }\n}\n\nfragment CellShow_show on Show {\n  internalID\n  slug\n  name\n  href\n  startAt\n  endAt\n  isFairBooth\n  exhibitionPeriod\n  partner {\n    __typename\n    ... on Partner {\n      name\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n    ... on ExternalPartner {\n      id\n    }\n  }\n  coverImage {\n    cropped(width: 445, height: 334, version: [\"larger\", \"large\"]) {\n      src\n      srcSet\n    }\n  }\n}\n\nfragment Pagination_pageCursors on PageCursors {\n  around {\n    cursor\n    page\n    isCurrent\n  }\n  first {\n    cursor\n    page\n    isCurrent\n  }\n  last {\n    cursor\n    page\n    isCurrent\n  }\n  previous {\n    cursor\n    page\n  }\n}\n"
  }
};
})();

(node as any).hash = "634807912343139c14caeabde6688a5b";

export default node;
