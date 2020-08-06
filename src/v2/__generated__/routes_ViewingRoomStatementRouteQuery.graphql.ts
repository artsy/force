/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type routes_ViewingRoomStatementRouteQueryVariables = {
    slug: string;
};
export type routes_ViewingRoomStatementRouteQueryResponse = {
    readonly viewingRoom: {
        readonly " $fragmentRefs": FragmentRefs<"ViewingRoomStatementRoute_viewingRoom">;
    } | null;
};
export type routes_ViewingRoomStatementRouteQuery = {
    readonly response: routes_ViewingRoomStatementRouteQueryResponse;
    readonly variables: routes_ViewingRoomStatementRouteQueryVariables;
};



/*
query routes_ViewingRoomStatementRouteQuery(
  $slug: ID!
) {
  viewingRoom(id: $slug) {
    ...ViewingRoomStatementRoute_viewingRoom
  }
}

fragment ViewingRoomBody_viewingRoom on ViewingRoom {
  body
}

fragment ViewingRoomIntro_viewingRoom on ViewingRoom {
  introStatement
}

fragment ViewingRoomPullQuote_viewingRoom on ViewingRoom {
  pullQuote
}

fragment ViewingRoomStatementRoute_viewingRoom on ViewingRoom {
  ...ViewingRoomIntro_viewingRoom
  ...ViewingRoomWorks_viewingRoom
  ...ViewingRoomPullQuote_viewingRoom
  ...ViewingRoomBody_viewingRoom
  ...ViewingRoomSubsections_viewingRoom
  artworksConnection(first: 2) {
    totalCount
  }
}

fragment ViewingRoomSubsections_viewingRoom on ViewingRoom {
  subsections {
    internalID
    title
    body
    image {
      imageURLs {
        normalized
      }
    }
    caption
  }
}

fragment ViewingRoomWorks_viewingRoom on ViewingRoom {
  artworksConnection(first: 2) {
    totalCount
    edges {
      node {
        internalID
        imageUrl
        artistNames
        title
        date
        saleMessage
        id
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "slug",
    "type": "ID!"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "slug"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "body",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "routes_ViewingRoomStatementRouteQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ViewingRoom",
        "kind": "LinkedField",
        "name": "viewingRoom",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ViewingRoomStatementRoute_viewingRoom"
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
    "name": "routes_ViewingRoomStatementRouteQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ViewingRoom",
        "kind": "LinkedField",
        "name": "viewingRoom",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "introStatement",
            "storageKey": null
          },
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 2
              }
            ],
            "concreteType": "ArtworkConnection",
            "kind": "LinkedField",
            "name": "artworksConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "totalCount",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "ArtworkEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Artwork",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "imageUrl",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "artistNames",
                        "storageKey": null
                      },
                      (v3/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "date",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "saleMessage",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "id",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "artworksConnection(first:2)"
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "pullQuote",
            "storageKey": null
          },
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "ViewingRoomSubsection",
            "kind": "LinkedField",
            "name": "subsections",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "ARImage",
                "kind": "LinkedField",
                "name": "image",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ImageURLs",
                    "kind": "LinkedField",
                    "name": "imageURLs",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "normalized",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "caption",
                "storageKey": null
              }
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
    "name": "routes_ViewingRoomStatementRouteQuery",
    "operationKind": "query",
    "text": "query routes_ViewingRoomStatementRouteQuery(\n  $slug: ID!\n) {\n  viewingRoom(id: $slug) {\n    ...ViewingRoomStatementRoute_viewingRoom\n  }\n}\n\nfragment ViewingRoomBody_viewingRoom on ViewingRoom {\n  body\n}\n\nfragment ViewingRoomIntro_viewingRoom on ViewingRoom {\n  introStatement\n}\n\nfragment ViewingRoomPullQuote_viewingRoom on ViewingRoom {\n  pullQuote\n}\n\nfragment ViewingRoomStatementRoute_viewingRoom on ViewingRoom {\n  ...ViewingRoomIntro_viewingRoom\n  ...ViewingRoomWorks_viewingRoom\n  ...ViewingRoomPullQuote_viewingRoom\n  ...ViewingRoomBody_viewingRoom\n  ...ViewingRoomSubsections_viewingRoom\n  artworksConnection(first: 2) {\n    totalCount\n  }\n}\n\nfragment ViewingRoomSubsections_viewingRoom on ViewingRoom {\n  subsections {\n    internalID\n    title\n    body\n    image {\n      imageURLs {\n        normalized\n      }\n    }\n    caption\n  }\n}\n\nfragment ViewingRoomWorks_viewingRoom on ViewingRoom {\n  artworksConnection(first: 2) {\n    totalCount\n    edges {\n      node {\n        internalID\n        imageUrl\n        artistNames\n        title\n        date\n        saleMessage\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'b2189f86c4fb2c5da7f5c7e37f2b47b8';
export default node;
