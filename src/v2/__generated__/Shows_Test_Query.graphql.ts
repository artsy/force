/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Shows_Test_QueryVariables = {
    artistID: string;
};
export type Shows_Test_QueryResponse = {
    readonly viewer: {
        readonly " $fragmentRefs": FragmentRefs<"Shows_viewer">;
    } | null;
};
export type Shows_Test_QueryRawResponse = {
    readonly viewer: ({
        readonly artist_currentShows: ({
            readonly slug: string;
            readonly showsConnection: ({
                readonly pageInfo: {
                    readonly hasNextPage: boolean;
                    readonly endCursor: string | null;
                };
                readonly pageCursors: {
                    readonly around: ReadonlyArray<{
                        readonly cursor: string;
                        readonly page: number;
                        readonly isCurrent: boolean;
                    }>;
                    readonly first: ({
                        readonly cursor: string;
                        readonly page: number;
                        readonly isCurrent: boolean;
                    }) | null;
                    readonly last: ({
                        readonly cursor: string;
                        readonly page: number;
                        readonly isCurrent: boolean;
                    }) | null;
                    readonly previous: ({
                        readonly cursor: string;
                        readonly page: number;
                    }) | null;
                };
                readonly edges: ReadonlyArray<({
                    readonly node: ({
                        readonly partner: ({
                            readonly __typename: "ExternalPartner";
                            readonly id: string | null;
                            readonly name: string | null;
                        } | {
                            readonly __typename: "Partner";
                            readonly id: string | null;
                            readonly name: string | null;
                        } | {
                            readonly __typename: string | null;
                            readonly id: string | null;
                        }) | null;
                        readonly name: string | null;
                        readonly href: string | null;
                        readonly exhibition_period: string | null;
                        readonly cover_image: ({
                            readonly cropped: ({
                                readonly url: string;
                            }) | null;
                        }) | null;
                        readonly city: string | null;
                        readonly id: string | null;
                    }) | null;
                }) | null> | null;
            }) | null;
            readonly id: string | null;
        }) | null;
        readonly artist_upcomingShows: ({
            readonly slug: string;
            readonly showsConnection: ({
                readonly pageInfo: {
                    readonly hasNextPage: boolean;
                    readonly endCursor: string | null;
                };
                readonly pageCursors: {
                    readonly around: ReadonlyArray<{
                        readonly cursor: string;
                        readonly page: number;
                        readonly isCurrent: boolean;
                    }>;
                    readonly first: ({
                        readonly cursor: string;
                        readonly page: number;
                        readonly isCurrent: boolean;
                    }) | null;
                    readonly last: ({
                        readonly cursor: string;
                        readonly page: number;
                        readonly isCurrent: boolean;
                    }) | null;
                    readonly previous: ({
                        readonly cursor: string;
                        readonly page: number;
                    }) | null;
                };
                readonly edges: ReadonlyArray<({
                    readonly node: ({
                        readonly partner: ({
                            readonly __typename: "ExternalPartner";
                            readonly id: string | null;
                            readonly name: string | null;
                        } | {
                            readonly __typename: "Partner";
                            readonly id: string | null;
                            readonly name: string | null;
                        } | {
                            readonly __typename: string | null;
                            readonly id: string | null;
                        }) | null;
                        readonly name: string | null;
                        readonly href: string | null;
                        readonly exhibition_period: string | null;
                        readonly cover_image: ({
                            readonly cropped: ({
                                readonly url: string;
                            }) | null;
                        }) | null;
                        readonly city: string | null;
                        readonly id: string | null;
                    }) | null;
                }) | null> | null;
            }) | null;
            readonly id: string | null;
        }) | null;
        readonly artist_pastShows: ({
            readonly slug: string;
            readonly showsConnection: ({
                readonly pageInfo: {
                    readonly hasNextPage: boolean;
                    readonly endCursor: string | null;
                };
                readonly pageCursors: {
                    readonly around: ReadonlyArray<{
                        readonly cursor: string;
                        readonly page: number;
                        readonly isCurrent: boolean;
                    }>;
                    readonly first: ({
                        readonly cursor: string;
                        readonly page: number;
                        readonly isCurrent: boolean;
                    }) | null;
                    readonly last: ({
                        readonly cursor: string;
                        readonly page: number;
                        readonly isCurrent: boolean;
                    }) | null;
                    readonly previous: ({
                        readonly cursor: string;
                        readonly page: number;
                    }) | null;
                };
                readonly edges: ReadonlyArray<({
                    readonly node: ({
                        readonly partner: ({
                            readonly __typename: "ExternalPartner";
                            readonly id: string | null;
                            readonly name: string | null;
                        } | {
                            readonly __typename: "Partner";
                            readonly id: string | null;
                            readonly name: string | null;
                        } | {
                            readonly __typename: string | null;
                            readonly id: string | null;
                        }) | null;
                        readonly name: string | null;
                        readonly href: string | null;
                        readonly exhibition_period: string | null;
                        readonly cover_image: ({
                            readonly cropped: ({
                                readonly url: string;
                            }) | null;
                        }) | null;
                        readonly city: string | null;
                        readonly id: string | null;
                    }) | null;
                }) | null> | null;
            }) | null;
            readonly id: string | null;
        }) | null;
    }) | null;
};
export type Shows_Test_Query = {
    readonly response: Shows_Test_QueryResponse;
    readonly variables: Shows_Test_QueryVariables;
    readonly rawResponse: Shows_Test_QueryRawResponse;
};



/*
query Shows_Test_Query(
  $artistID: String!
) {
  viewer {
    ...Shows_viewer
  }
}

fragment ArtistShows_artist_12Fjro on Artist {
  slug
  showsConnection(first: 4, sort: START_AT_ASC, status: "upcoming") {
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
        exhibition_period: exhibitionPeriod
        cover_image: coverImage {
          cropped(width: 800, height: 600) {
            url
          }
        }
        city
        id
      }
    }
  }
}

fragment ArtistShows_artist_3dp4w3 on Artist {
  slug
  showsConnection(first: 4, sort: END_AT_DESC, status: "closed") {
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
        exhibition_period: exhibitionPeriod
        cover_image: coverImage {
          cropped(width: 800, height: 600) {
            url
          }
        }
        city
        id
      }
    }
  }
}

fragment ArtistShows_artist_43oec1 on Artist {
  slug
  showsConnection(first: 4, sort: END_AT_ASC, status: "running") {
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
        exhibition_period: exhibitionPeriod
        cover_image: coverImage {
          cropped(width: 800, height: 600) {
            url
          }
        }
        city
        id
      }
    }
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

fragment Shows_viewer on Viewer {
  artist_currentShows: artist(id: $artistID) {
    ...ArtistShows_artist_43oec1
    id
  }
  artist_upcomingShows: artist(id: $artistID) {
    ...ArtistShows_artist_12Fjro
    id
  }
  artist_pastShows: artist(id: $artistID) {
    ...ArtistShows_artist_3dp4w3
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
  "name": "first",
  "value": 4
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
            "alias": "exhibition_period",
            "args": null,
            "kind": "ScalarField",
            "name": "exhibitionPeriod",
            "storageKey": null
          },
          {
            "alias": "cover_image",
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
                    "value": 600
                  },
                  {
                    "kind": "Literal",
                    "name": "width",
                    "value": 800
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
                    "name": "url",
                    "storageKey": null
                  }
                ],
                "storageKey": "cropped(height:600,width:800)"
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
    "name": "Shows_Test_Query",
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
            "name": "Shows_viewer"
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
    "name": "Shows_Test_Query",
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
            "alias": "artist_currentShows",
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
                "storageKey": "showsConnection(first:4,sort:\"END_AT_ASC\",status:\"running\")"
              },
              (v7/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": "artist_upcomingShows",
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
                "storageKey": "showsConnection(first:4,sort:\"START_AT_ASC\",status:\"upcoming\")"
              },
              (v7/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": "artist_pastShows",
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
                    "value": "END_AT_DESC"
                  },
                  {
                    "kind": "Literal",
                    "name": "status",
                    "value": "closed"
                  }
                ],
                "concreteType": "ShowConnection",
                "kind": "LinkedField",
                "name": "showsConnection",
                "plural": false,
                "selections": (v10/*: any*/),
                "storageKey": "showsConnection(first:4,sort:\"END_AT_DESC\",status:\"closed\")"
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
    "name": "Shows_Test_Query",
    "operationKind": "query",
    "text": "query Shows_Test_Query(\n  $artistID: String!\n) {\n  viewer {\n    ...Shows_viewer\n  }\n}\n\nfragment ArtistShows_artist_12Fjro on Artist {\n  slug\n  showsConnection(first: 4, sort: START_AT_ASC, status: \"upcoming\") {\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    pageCursors {\n      ...Pagination_pageCursors\n    }\n    edges {\n      node {\n        partner {\n          __typename\n          ... on ExternalPartner {\n            name\n            id\n          }\n          ... on Partner {\n            name\n          }\n          ... on Node {\n            id\n          }\n        }\n        name\n        href\n        exhibition_period: exhibitionPeriod\n        cover_image: coverImage {\n          cropped(width: 800, height: 600) {\n            url\n          }\n        }\n        city\n        id\n      }\n    }\n  }\n}\n\nfragment ArtistShows_artist_3dp4w3 on Artist {\n  slug\n  showsConnection(first: 4, sort: END_AT_DESC, status: \"closed\") {\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    pageCursors {\n      ...Pagination_pageCursors\n    }\n    edges {\n      node {\n        partner {\n          __typename\n          ... on ExternalPartner {\n            name\n            id\n          }\n          ... on Partner {\n            name\n          }\n          ... on Node {\n            id\n          }\n        }\n        name\n        href\n        exhibition_period: exhibitionPeriod\n        cover_image: coverImage {\n          cropped(width: 800, height: 600) {\n            url\n          }\n        }\n        city\n        id\n      }\n    }\n  }\n}\n\nfragment ArtistShows_artist_43oec1 on Artist {\n  slug\n  showsConnection(first: 4, sort: END_AT_ASC, status: \"running\") {\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    pageCursors {\n      ...Pagination_pageCursors\n    }\n    edges {\n      node {\n        partner {\n          __typename\n          ... on ExternalPartner {\n            name\n            id\n          }\n          ... on Partner {\n            name\n          }\n          ... on Node {\n            id\n          }\n        }\n        name\n        href\n        exhibition_period: exhibitionPeriod\n        cover_image: coverImage {\n          cropped(width: 800, height: 600) {\n            url\n          }\n        }\n        city\n        id\n      }\n    }\n  }\n}\n\nfragment Pagination_pageCursors on PageCursors {\n  around {\n    cursor\n    page\n    isCurrent\n  }\n  first {\n    cursor\n    page\n    isCurrent\n  }\n  last {\n    cursor\n    page\n    isCurrent\n  }\n  previous {\n    cursor\n    page\n  }\n}\n\nfragment Shows_viewer on Viewer {\n  artist_currentShows: artist(id: $artistID) {\n    ...ArtistShows_artist_43oec1\n    id\n  }\n  artist_upcomingShows: artist(id: $artistID) {\n    ...ArtistShows_artist_12Fjro\n    id\n  }\n  artist_pastShows: artist(id: $artistID) {\n    ...ArtistShows_artist_3dp4w3\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '733d28d99e58211eb302f2a5a0376f91';
export default node;
