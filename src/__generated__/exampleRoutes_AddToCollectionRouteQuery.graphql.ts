/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type exampleRoutes_AddToCollectionRouteQueryVariables = {};
export type exampleRoutes_AddToCollectionRouteQueryResponse = {
    readonly viewer: {
        readonly " $fragmentRefs": FragmentRefs<"AddToCollectionRoute_viewer">;
    } | null;
};
export type exampleRoutes_AddToCollectionRouteQuery = {
    readonly response: exampleRoutes_AddToCollectionRouteQueryResponse;
    readonly variables: exampleRoutes_AddToCollectionRouteQueryVariables;
};



/*
query exampleRoutes_AddToCollectionRouteQuery {
  viewer {
    ...AddToCollectionRoute_viewer
  }
}

fragment AddToCollectionRoute_viewer on Viewer {
  artworksConnection(first: 50, marketable: true, medium: "painting") {
    edges {
      node {
        internalID
        artistNames
        title
        date
        image {
          cropped(width: 200, height: 200) {
            width
            height
            src
            srcSet
          }
        }
        id
      }
    }
    id
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
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "exampleRoutes_AddToCollectionRouteQuery",
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
            "name": "AddToCollectionRoute_viewer"
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
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "exampleRoutes_AddToCollectionRouteQuery",
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
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 50
              },
              {
                "kind": "Literal",
                "name": "marketable",
                "value": true
              },
              {
                "kind": "Literal",
                "name": "medium",
                "value": "painting"
              }
            ],
            "concreteType": "FilterArtworksConnection",
            "kind": "LinkedField",
            "name": "artworksConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "FilterArtworksEdge",
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
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "internalID",
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
                        "name": "title",
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
                        "concreteType": "Image",
                        "kind": "LinkedField",
                        "name": "image",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "height",
                                "value": 200
                              },
                              {
                                "kind": "Literal",
                                "name": "width",
                                "value": 200
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
                                "name": "width",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "height",
                                "storageKey": null
                              },
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
                            "storageKey": "cropped(height:200,width:200)"
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
              },
              (v0/*: any*/)
            ],
            "storageKey": "artworksConnection(first:50,marketable:true,medium:\"painting\")"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "83f36b1fcea66becf9ef30962be8a3d1",
    "id": null,
    "metadata": {},
    "name": "exampleRoutes_AddToCollectionRouteQuery",
    "operationKind": "query",
    "text": "query exampleRoutes_AddToCollectionRouteQuery {\n  viewer {\n    ...AddToCollectionRoute_viewer\n  }\n}\n\nfragment AddToCollectionRoute_viewer on Viewer {\n  artworksConnection(first: 50, marketable: true, medium: \"painting\") {\n    edges {\n      node {\n        internalID\n        artistNames\n        title\n        date\n        image {\n          cropped(width: 200, height: 200) {\n            width\n            height\n            src\n            srcSet\n          }\n        }\n        id\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = 'a648de1e3469b3ccbc1ae4d9fbcd20d3';
export default node;
