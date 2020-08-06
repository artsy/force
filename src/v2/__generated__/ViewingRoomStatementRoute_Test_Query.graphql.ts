/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ViewingRoomStatementRoute_Test_QueryVariables = {
    slug: string;
};
export type ViewingRoomStatementRoute_Test_QueryResponse = {
    readonly viewingRoom: {
        readonly " $fragmentRefs": FragmentRefs<"ViewingRoomStatementRoute_viewingRoom">;
    } | null;
};
export type ViewingRoomStatementRoute_Test_QueryRawResponse = {
    readonly viewingRoom: ({
        readonly introStatement: string | null;
        readonly artworksConnection: ({
            readonly totalCount: number | null;
            readonly edges: ReadonlyArray<({
                readonly node: ({
                    readonly internalID: string;
                    readonly imageUrl: string | null;
                    readonly artistNames: string | null;
                    readonly title: string | null;
                    readonly date: string | null;
                    readonly saleMessage: string | null;
                    readonly id: string | null;
                }) | null;
            }) | null> | null;
        }) | null;
        readonly pullQuote: string | null;
        readonly body: string | null;
        readonly subsections: ReadonlyArray<{
            readonly internalID: string;
            readonly title: string | null;
            readonly body: string | null;
            readonly image: ({
                readonly imageURLs: ({
                    readonly normalized: string | null;
                }) | null;
            }) | null;
            readonly caption: string | null;
        }>;
    }) | null;
};
export type ViewingRoomStatementRoute_Test_Query = {
    readonly response: ViewingRoomStatementRoute_Test_QueryResponse;
    readonly variables: ViewingRoomStatementRoute_Test_QueryVariables;
    readonly rawResponse: ViewingRoomStatementRoute_Test_QueryRawResponse;
};



/*
query ViewingRoomStatementRoute_Test_Query(
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
    "kind": "LocalArgument",
    "name": "slug",
    "type": "ID!",
    "defaultValue": null
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
  "kind": "ScalarField",
  "alias": null,
  "name": "internalID",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "title",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "body",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "ViewingRoomStatementRoute_Test_Query",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "viewingRoom",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "ViewingRoom",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "ViewingRoomStatementRoute_viewingRoom",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ViewingRoomStatementRoute_Test_Query",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "viewingRoom",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "ViewingRoom",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "introStatement",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "artworksConnection",
            "storageKey": "artworksConnection(first:2)",
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 2
              }
            ],
            "concreteType": "ArtworkConnection",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "totalCount",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "edges",
                "storageKey": null,
                "args": null,
                "concreteType": "ArtworkEdge",
                "plural": true,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "node",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Artwork",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "imageUrl",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "artistNames",
                        "args": null,
                        "storageKey": null
                      },
                      (v3/*: any*/),
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "date",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "saleMessage",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "id",
                        "args": null,
                        "storageKey": null
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "pullQuote",
            "args": null,
            "storageKey": null
          },
          (v4/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "subsections",
            "storageKey": null,
            "args": null,
            "concreteType": "ViewingRoomSubsection",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "image",
                "storageKey": null,
                "args": null,
                "concreteType": "ARImage",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "imageURLs",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "ImageURLs",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "normalized",
                        "args": null,
                        "storageKey": null
                      }
                    ]
                  }
                ]
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "caption",
                "args": null,
                "storageKey": null
              }
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "ViewingRoomStatementRoute_Test_Query",
    "id": null,
    "text": "query ViewingRoomStatementRoute_Test_Query(\n  $slug: ID!\n) {\n  viewingRoom(id: $slug) {\n    ...ViewingRoomStatementRoute_viewingRoom\n  }\n}\n\nfragment ViewingRoomBody_viewingRoom on ViewingRoom {\n  body\n}\n\nfragment ViewingRoomIntro_viewingRoom on ViewingRoom {\n  introStatement\n}\n\nfragment ViewingRoomPullQuote_viewingRoom on ViewingRoom {\n  pullQuote\n}\n\nfragment ViewingRoomStatementRoute_viewingRoom on ViewingRoom {\n  ...ViewingRoomIntro_viewingRoom\n  ...ViewingRoomWorks_viewingRoom\n  ...ViewingRoomPullQuote_viewingRoom\n  ...ViewingRoomBody_viewingRoom\n  ...ViewingRoomSubsections_viewingRoom\n  artworksConnection(first: 2) {\n    totalCount\n  }\n}\n\nfragment ViewingRoomSubsections_viewingRoom on ViewingRoom {\n  subsections {\n    internalID\n    title\n    body\n    image {\n      imageURLs {\n        normalized\n      }\n    }\n    caption\n  }\n}\n\nfragment ViewingRoomWorks_viewingRoom on ViewingRoom {\n  artworksConnection(first: 2) {\n    totalCount\n    edges {\n      node {\n        internalID\n        imageUrl\n        artistNames\n        title\n        date\n        saleMessage\n        id\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'dbc42307812dd0d08bbe05338619ef80';
export default node;
