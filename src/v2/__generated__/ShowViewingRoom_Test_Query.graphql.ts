/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ShowViewingRoom_Test_QueryVariables = {};
export type ShowViewingRoom_Test_QueryResponse = {
    readonly show: {
        readonly " $fragmentRefs": FragmentRefs<"ShowViewingRoom_show">;
    } | null;
};
export type ShowViewingRoom_Test_Query = {
    readonly response: ShowViewingRoom_Test_QueryResponse;
    readonly variables: ShowViewingRoom_Test_QueryVariables;
};



/*
query ShowViewingRoom_Test_Query {
  show(id: "example-show-id") {
    ...ShowViewingRoom_show
    id
  }
}

fragment ShowViewingRoom_show on Show {
  partner {
    __typename
    ... on Partner {
      name
    }
    ... on ExternalPartner {
      name
      id
    }
    ... on Node {
      id
    }
  }
  viewingRoomsConnection {
    edges {
      node {
        internalID
        slug
        status
        distanceToOpen(short: true)
        distanceToClose(short: true)
        title
        href
        image {
          imageURLs {
            normalized
          }
        }
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "example-show-id"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "name",
    "storageKey": null
  }
],
v3 = [
  {
    "kind": "Literal",
    "name": "short",
    "value": true
  }
],
v4 = {
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v5 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v6 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": false
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ShowViewingRoom_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Show",
        "kind": "LinkedField",
        "name": "show",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ShowViewingRoom_show"
          }
        ],
        "storageKey": "show(id:\"example-show-id\")"
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ShowViewingRoom_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Show",
        "kind": "LinkedField",
        "name": "show",
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
              (v1/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": (v2/*: any*/),
                "type": "Partner"
              },
              {
                "kind": "InlineFragment",
                "selections": (v2/*: any*/),
                "type": "ExternalPartner"
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ViewingRoomsConnection",
            "kind": "LinkedField",
            "name": "viewingRoomsConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ViewingRoomsEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ViewingRoom",
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
                        "name": "slug",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "status",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": (v3/*: any*/),
                        "kind": "ScalarField",
                        "name": "distanceToOpen",
                        "storageKey": "distanceToOpen(short:true)"
                      },
                      {
                        "alias": null,
                        "args": (v3/*: any*/),
                        "kind": "ScalarField",
                        "name": "distanceToClose",
                        "storageKey": "distanceToClose(short:true)"
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
                        "name": "href",
                        "storageKey": null
                      },
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
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v1/*: any*/)
        ],
        "storageKey": "show(id:\"example-show-id\")"
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "show": {
          "type": "Show",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "show.id": (v4/*: any*/),
        "show.partner": {
          "type": "PartnerTypes",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "show.viewingRoomsConnection": {
          "type": "ViewingRoomsConnection",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "show.viewingRoomsConnection.edges": {
          "type": "ViewingRoomsEdge",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "show.partner.name": (v5/*: any*/),
        "show.partner.id": (v4/*: any*/),
        "show.viewingRoomsConnection.edges.node": {
          "type": "ViewingRoom",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "show.viewingRoomsConnection.edges.node.internalID": {
          "type": "ID",
          "enumValues": null,
          "plural": false,
          "nullable": false
        },
        "show.viewingRoomsConnection.edges.node.slug": (v6/*: any*/),
        "show.viewingRoomsConnection.edges.node.status": (v6/*: any*/),
        "show.viewingRoomsConnection.edges.node.distanceToOpen": (v5/*: any*/),
        "show.viewingRoomsConnection.edges.node.distanceToClose": (v5/*: any*/),
        "show.viewingRoomsConnection.edges.node.title": (v6/*: any*/),
        "show.viewingRoomsConnection.edges.node.href": (v5/*: any*/),
        "show.viewingRoomsConnection.edges.node.image": {
          "type": "ARImage",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "show.viewingRoomsConnection.edges.node.image.imageURLs": {
          "type": "ImageURLs",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "show.viewingRoomsConnection.edges.node.image.imageURLs.normalized": (v5/*: any*/)
      }
    },
    "name": "ShowViewingRoom_Test_Query",
    "operationKind": "query",
    "text": "query ShowViewingRoom_Test_Query {\n  show(id: \"example-show-id\") {\n    ...ShowViewingRoom_show\n    id\n  }\n}\n\nfragment ShowViewingRoom_show on Show {\n  partner {\n    __typename\n    ... on Partner {\n      name\n    }\n    ... on ExternalPartner {\n      name\n      id\n    }\n    ... on Node {\n      id\n    }\n  }\n  viewingRoomsConnection {\n    edges {\n      node {\n        internalID\n        slug\n        status\n        distanceToOpen(short: true)\n        distanceToClose(short: true)\n        title\n        href\n        image {\n          imageURLs {\n            normalized\n          }\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'c2382b913f092b5f01c9ddf0c4399c9c';
export default node;
