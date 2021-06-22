/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type HomeArtworkModuleContext_Test_QueryVariables = {};
export type HomeArtworkModuleContext_Test_QueryResponse = {
    readonly homePage: {
        readonly artworkModules: ReadonlyArray<{
            readonly context: {
                readonly " $fragmentRefs": FragmentRefs<"HomeArtworkModuleContext_context">;
            } | null;
        } | null> | null;
    } | null;
};
export type HomeArtworkModuleContext_Test_Query = {
    readonly response: HomeArtworkModuleContext_Test_QueryResponse;
    readonly variables: HomeArtworkModuleContext_Test_QueryVariables;
};



/*
query HomeArtworkModuleContext_Test_Query {
  homePage {
    artworkModules {
      context {
        __typename
        ...HomeArtworkModuleContext_context
        ... on Node {
          id
        }
      }
      id
    }
  }
}

fragment HomeArtworkModuleContext_context on HomePageArtworkModuleContext {
  __typename
  ... on Sale {
    href
    liveStartAt(format: "MMM D")
    startAt(format: "MMM D")
    endAt(format: "MMM D")
  }
  ... on Fair {
    href
    exhibitionPeriod
  }
  ... on Gene {
    href
  }
  ... on HomePageRelatedArtistArtworkModule {
    artist {
      name
      href
      id
    }
    basedOn {
      name
      href
      id
    }
  }
  ... on HomePageFollowedArtistArtworkModule {
    artist {
      href
      id
    }
  }
  ... on FollowArtists {
    counts {
      artists
    }
    artists {
      href
      name
      id
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v2 = [
  {
    "kind": "Literal",
    "name": "format",
    "value": "MMM D"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v4 = [
  (v3/*: any*/),
  (v1/*: any*/),
  (v0/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "HomeArtworkModuleContext_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "HomePage",
        "kind": "LinkedField",
        "name": "homePage",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "HomePageArtworkModule",
            "kind": "LinkedField",
            "name": "artworkModules",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "context",
                "plural": false,
                "selections": [
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "HomeArtworkModuleContext_context"
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "HomeArtworkModuleContext_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "HomePage",
        "kind": "LinkedField",
        "name": "homePage",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "HomePageArtworkModule",
            "kind": "LinkedField",
            "name": "artworkModules",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "context",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "__typename",
                    "storageKey": null
                  },
                  (v0/*: any*/),
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v1/*: any*/),
                      {
                        "alias": null,
                        "args": (v2/*: any*/),
                        "kind": "ScalarField",
                        "name": "liveStartAt",
                        "storageKey": "liveStartAt(format:\"MMM D\")"
                      },
                      {
                        "alias": null,
                        "args": (v2/*: any*/),
                        "kind": "ScalarField",
                        "name": "startAt",
                        "storageKey": "startAt(format:\"MMM D\")"
                      },
                      {
                        "alias": null,
                        "args": (v2/*: any*/),
                        "kind": "ScalarField",
                        "name": "endAt",
                        "storageKey": "endAt(format:\"MMM D\")"
                      }
                    ],
                    "type": "Sale"
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v1/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "exhibitionPeriod",
                        "storageKey": null
                      }
                    ],
                    "type": "Fair"
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v1/*: any*/)
                    ],
                    "type": "Gene"
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Artist",
                        "kind": "LinkedField",
                        "name": "artist",
                        "plural": false,
                        "selections": (v4/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Artist",
                        "kind": "LinkedField",
                        "name": "basedOn",
                        "plural": false,
                        "selections": (v4/*: any*/),
                        "storageKey": null
                      }
                    ],
                    "type": "HomePageRelatedArtistArtworkModule"
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Artist",
                        "kind": "LinkedField",
                        "name": "artist",
                        "plural": false,
                        "selections": [
                          (v1/*: any*/),
                          (v0/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "type": "HomePageFollowedArtistArtworkModule"
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "FollowArtistCounts",
                        "kind": "LinkedField",
                        "name": "counts",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "artists",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Artist",
                        "kind": "LinkedField",
                        "name": "artists",
                        "plural": true,
                        "selections": [
                          (v1/*: any*/),
                          (v3/*: any*/),
                          (v0/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "type": "FollowArtists"
                  }
                ],
                "storageKey": null
              },
              (v0/*: any*/)
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
    "name": "HomeArtworkModuleContext_Test_Query",
    "operationKind": "query",
    "text": "query HomeArtworkModuleContext_Test_Query {\n  homePage {\n    artworkModules {\n      context {\n        __typename\n        ...HomeArtworkModuleContext_context\n        ... on Node {\n          id\n        }\n      }\n      id\n    }\n  }\n}\n\nfragment HomeArtworkModuleContext_context on HomePageArtworkModuleContext {\n  __typename\n  ... on Sale {\n    href\n    liveStartAt(format: \"MMM D\")\n    startAt(format: \"MMM D\")\n    endAt(format: \"MMM D\")\n  }\n  ... on Fair {\n    href\n    exhibitionPeriod\n  }\n  ... on Gene {\n    href\n  }\n  ... on HomePageRelatedArtistArtworkModule {\n    artist {\n      name\n      href\n      id\n    }\n    basedOn {\n      name\n      href\n      id\n    }\n  }\n  ... on HomePageFollowedArtistArtworkModule {\n    artist {\n      href\n      id\n    }\n  }\n  ... on FollowArtists {\n    counts {\n      artists\n    }\n    artists {\n      href\n      name\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '071cd01e4b5a94b922694ffeba6ff41d';
export default node;
