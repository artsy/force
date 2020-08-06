/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type routes_ViewingRoomWorksRouteQueryVariables = {
    slug: string;
};
export type routes_ViewingRoomWorksRouteQueryResponse = {
    readonly viewingRoom: {
        readonly " $fragmentRefs": FragmentRefs<"ViewingRoomWorksRoute_viewingRoom">;
    } | null;
};
export type routes_ViewingRoomWorksRouteQuery = {
    readonly response: routes_ViewingRoomWorksRouteQueryResponse;
    readonly variables: routes_ViewingRoomWorksRouteQueryVariables;
};



/*
query routes_ViewingRoomWorksRouteQuery(
  $slug: ID!
) {
  viewingRoom(id: $slug) {
    ...ViewingRoomWorksRoute_viewingRoom
  }
}

fragment ViewingRoomArtworkDetails_artwork on Artwork {
  id
  additionalInformation
  artistNames
  title
  date
  href
  saleMessage
}

fragment ViewingRoomWorksRoute_viewingRoom on ViewingRoom {
  artworksConnection {
    edges {
      node {
        internalID
        title
        images {
          internalID
          resized(height: 1100, version: "normalized") {
            url
            width
            height
          }
        }
        ...ViewingRoomArtworkDetails_artwork
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
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "routes_ViewingRoomWorksRouteQuery",
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
            "name": "ViewingRoomWorksRoute_viewingRoom"
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
    "name": "routes_ViewingRoomWorksRouteQuery",
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
            "concreteType": "ArtworkConnection",
            "kind": "LinkedField",
            "name": "artworksConnection",
            "plural": false,
            "selections": [
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
                        "name": "title",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Image",
                        "kind": "LinkedField",
                        "name": "images",
                        "plural": true,
                        "selections": [
                          (v2/*: any*/),
                          {
                            "alias": null,
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "height",
                                "value": 1100
                              },
                              {
                                "kind": "Literal",
                                "name": "version",
                                "value": "normalized"
                              }
                            ],
                            "concreteType": "ResizedImageUrl",
                            "kind": "LinkedField",
                            "name": "resized",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "url",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "width",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "height",
                                "storageKey": null
                              }
                            ],
                            "storageKey": "resized(height:1100,version:\"normalized\")"
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "id",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "additionalInformation",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "artistNames",
                        "storageKey": null
                      },
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
                        "name": "href",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "saleMessage",
                        "storageKey": null
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
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "routes_ViewingRoomWorksRouteQuery",
    "operationKind": "query",
    "text": "query routes_ViewingRoomWorksRouteQuery(\n  $slug: ID!\n) {\n  viewingRoom(id: $slug) {\n    ...ViewingRoomWorksRoute_viewingRoom\n  }\n}\n\nfragment ViewingRoomArtworkDetails_artwork on Artwork {\n  id\n  additionalInformation\n  artistNames\n  title\n  date\n  href\n  saleMessage\n}\n\nfragment ViewingRoomWorksRoute_viewingRoom on ViewingRoom {\n  artworksConnection {\n    edges {\n      node {\n        internalID\n        title\n        images {\n          internalID\n          resized(height: 1100, version: \"normalized\") {\n            url\n            width\n            height\n          }\n        }\n        ...ViewingRoomArtworkDetails_artwork\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'd481cd8401e3968a7f2ef4c823b2a1c4';
export default node;
