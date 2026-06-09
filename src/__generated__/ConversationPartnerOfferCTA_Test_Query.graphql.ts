/**
 * @generated SignedSource<<16ac7c80a2534fc9d73658e76bb6ade3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ConversationPartnerOfferCTA_Test_Query$variables = Record<PropertyKey, never>;
export type ConversationPartnerOfferCTA_Test_Query$data = {
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"ConversationsContext_viewer">;
  } | null | undefined;
};
export type ConversationPartnerOfferCTA_Test_Query = {
  response: ConversationPartnerOfferCTA_Test_Query$data;
  variables: ConversationPartnerOfferCTA_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v2 = {
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
    "name": "ConversationPartnerOfferCTA_Test_Query",
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
            "name": "ConversationsContext_viewer"
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
    "name": "ConversationPartnerOfferCTA_Test_Query",
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
            "args": null,
            "concreteType": "Me",
            "kind": "LinkedField",
            "name": "me",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": [
                  {
                    "kind": "Literal",
                    "name": "first",
                    "value": 100
                  },
                  {
                    "kind": "Literal",
                    "name": "offerType",
                    "value": [
                      "PERSONALIZED"
                    ]
                  }
                ],
                "concreteType": "PartnerOfferToCollectorConnection",
                "kind": "LinkedField",
                "name": "partnerOffersConnection",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PartnerOfferToCollectorEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "PartnerOfferToCollector",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "artworkId",
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
                            "name": "internalID",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isAvailable",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "note",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Money",
                            "kind": "LinkedField",
                            "name": "priceWithDiscount",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "display",
                                "storageKey": null
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
                ],
                "storageKey": "partnerOffersConnection(first:100,offerType:[\"PERSONALIZED\"])"
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
    "cacheID": "9a8bbf9e365185395faf97442933aceb",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "viewer": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Viewer"
        },
        "viewer.me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
        },
        "viewer.me.id": (v1/*: any*/),
        "viewer.me.partnerOffersConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "PartnerOfferToCollectorConnection"
        },
        "viewer.me.partnerOffersConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "PartnerOfferToCollectorEdge"
        },
        "viewer.me.partnerOffersConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "PartnerOfferToCollector"
        },
        "viewer.me.partnerOffersConnection.edges.node.artworkId": (v2/*: any*/),
        "viewer.me.partnerOffersConnection.edges.node.endAt": (v2/*: any*/),
        "viewer.me.partnerOffersConnection.edges.node.id": (v1/*: any*/),
        "viewer.me.partnerOffersConnection.edges.node.internalID": (v1/*: any*/),
        "viewer.me.partnerOffersConnection.edges.node.isAvailable": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Boolean"
        },
        "viewer.me.partnerOffersConnection.edges.node.note": (v2/*: any*/),
        "viewer.me.partnerOffersConnection.edges.node.priceWithDiscount": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Money"
        },
        "viewer.me.partnerOffersConnection.edges.node.priceWithDiscount.display": (v2/*: any*/)
      }
    },
    "name": "ConversationPartnerOfferCTA_Test_Query",
    "operationKind": "query",
    "text": "query ConversationPartnerOfferCTA_Test_Query {\n  viewer {\n    ...ConversationsContext_viewer\n  }\n}\n\nfragment ConversationsContext_viewer on Viewer {\n  me {\n    partnerOffersConnection(first: 100, offerType: [PERSONALIZED]) {\n      edges {\n        node {\n          artworkId\n          endAt\n          internalID\n          isAvailable\n          note\n          priceWithDiscount {\n            display\n          }\n          id\n        }\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "3c537233110bb6e0fe34ef94870dad2d";

export default node;
