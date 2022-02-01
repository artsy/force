/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ShowCard_Test_QueryVariables = {};
export type ShowCard_Test_QueryResponse = {
    readonly partner: {
        readonly showsConnection: {
            readonly edges: ReadonlyArray<{
                readonly node: {
                    readonly internalID: string;
                    readonly " $fragmentRefs": FragmentRefs<"ShowCard_show">;
                } | null;
            } | null> | null;
        } | null;
    } | null;
};
export type ShowCard_Test_Query = {
    readonly response: ShowCard_Test_QueryResponse;
    readonly variables: ShowCard_Test_QueryVariables;
};



/*
query ShowCard_Test_Query {
  partner(id: "white-cube") @principalField {
    showsConnection(first: 10) {
      edges {
        node {
          internalID
          ...ShowCard_show
          id
        }
      }
    }
    id
  }
}

fragment ShowCard_show on Show {
  href
  name
  isFairBooth
  exhibitionPeriod
  coverImage {
    medium: cropped(width: 320, height: 240) {
      width
      height
      src
      srcSet
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "white-cube"
  }
],
v1 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
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
  "name": "id",
  "storageKey": null
},
v4 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v5 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
},
v6 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v7 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ShowCard_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Partner",
        "kind": "LinkedField",
        "name": "partner",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v1/*: any*/),
            "concreteType": "ShowConnection",
            "kind": "LinkedField",
            "name": "showsConnection",
            "plural": false,
            "selections": [
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
                      (v2/*: any*/),
                      {
                        "args": null,
                        "kind": "FragmentSpread",
                        "name": "ShowCard_show"
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "showsConnection(first:10)"
          }
        ],
        "storageKey": "partner(id:\"white-cube\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ShowCard_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Partner",
        "kind": "LinkedField",
        "name": "partner",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v1/*: any*/),
            "concreteType": "ShowConnection",
            "kind": "LinkedField",
            "name": "showsConnection",
            "plural": false,
            "selections": [
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
                        "name": "name",
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
                        "concreteType": "Image",
                        "kind": "LinkedField",
                        "name": "coverImage",
                        "plural": false,
                        "selections": [
                          {
                            "alias": "medium",
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "height",
                                "value": 240
                              },
                              {
                                "kind": "Literal",
                                "name": "width",
                                "value": 320
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
                            "storageKey": "cropped(height:240,width:320)"
                          }
                        ],
                        "storageKey": null
                      },
                      (v3/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "showsConnection(first:10)"
          },
          (v3/*: any*/)
        ],
        "storageKey": "partner(id:\"white-cube\")"
      }
    ]
  },
  "params": {
    "cacheID": "cfbf16f687700dbd63041d8d4200b406",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "partner.id": (v4/*: any*/),
        "partner.showsConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ShowConnection"
        },
        "partner.showsConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "ShowEdge"
        },
        "partner.showsConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Show"
        },
        "partner.showsConnection.edges.node.coverImage": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "partner.showsConnection.edges.node.coverImage.medium": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CroppedImageUrl"
        },
        "partner.showsConnection.edges.node.coverImage.medium.height": (v5/*: any*/),
        "partner.showsConnection.edges.node.coverImage.medium.src": (v6/*: any*/),
        "partner.showsConnection.edges.node.coverImage.medium.srcSet": (v6/*: any*/),
        "partner.showsConnection.edges.node.coverImage.medium.width": (v5/*: any*/),
        "partner.showsConnection.edges.node.exhibitionPeriod": (v7/*: any*/),
        "partner.showsConnection.edges.node.href": (v7/*: any*/),
        "partner.showsConnection.edges.node.id": (v4/*: any*/),
        "partner.showsConnection.edges.node.internalID": (v4/*: any*/),
        "partner.showsConnection.edges.node.isFairBooth": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Boolean"
        },
        "partner.showsConnection.edges.node.name": (v7/*: any*/)
      }
    },
    "name": "ShowCard_Test_Query",
    "operationKind": "query",
    "text": "query ShowCard_Test_Query {\n  partner(id: \"white-cube\") @principalField {\n    showsConnection(first: 10) {\n      edges {\n        node {\n          internalID\n          ...ShowCard_show\n          id\n        }\n      }\n    }\n    id\n  }\n}\n\nfragment ShowCard_show on Show {\n  href\n  name\n  isFairBooth\n  exhibitionPeriod\n  coverImage {\n    medium: cropped(width: 320, height: 240) {\n      width\n      height\n      src\n      srcSet\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '2f166c8eb0f5bd81cc29e37ea9efd2da';
export default node;
