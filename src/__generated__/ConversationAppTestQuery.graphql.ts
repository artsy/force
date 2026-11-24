/**
 * @generated SignedSource<<f867cda3e3a9c911d94175a792a8e5e3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ConversationAppTestQuery$variables = Record<PropertyKey, never>;
export type ConversationAppTestQuery$data = {
  readonly conversation: {
    readonly " $fragmentSpreads": FragmentRefs<"ConversationApp_conversation">;
  } | null | undefined;
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"ConversationApp_viewer">;
  } | null | undefined;
};
export type ConversationAppTestQuery = {
  response: ConversationAppTestQuery$data;
  variables: ConversationAppTestQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "1234"
  }
],
v1 = {
  "kind": "Literal",
  "name": "first",
  "value": 10
},
v2 = [
  (v1/*: any*/),
  {
    "kind": "Literal",
    "name": "type",
    "value": "USER"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "unreadByCollector",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v8 = [
  (v6/*: any*/),
  (v7/*: any*/)
],
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "date",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isUnlisted",
  "storageKey": null
},
v13 = [
  (v7/*: any*/)
],
v14 = {
  "kind": "InlineFragment",
  "selections": (v13/*: any*/),
  "type": "Node",
  "abstractKey": "__isNode"
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "endCursor",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "hasNextPage",
  "storageKey": null
},
v17 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "width",
  "storageKey": null
},
v21 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "height",
  "storageKey": null
},
v22 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isOfferable",
  "storageKey": null
},
v23 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isOfferableFromInquiry",
  "storageKey": null
},
v24 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "artistNames",
  "storageKey": null
},
v25 = {
  "alias": null,
  "args": null,
  "concreteType": null,
  "kind": "LinkedField",
  "name": "listPrice",
  "plural": false,
  "selections": [
    (v9/*: any*/),
    {
      "kind": "InlineFragment",
      "selections": (v17/*: any*/),
      "type": "Money",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": (v17/*: any*/),
      "type": "PriceRange",
      "abstractKey": null
    }
  ],
  "storageKey": null
},
v26 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isAcquireable",
  "storageKey": null
},
v27 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cm",
  "storageKey": null
},
v28 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "in",
  "storageKey": null
},
v29 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "details",
    "storageKey": null
  }
],
v30 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "state",
  "storageKey": null
},
v31 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "offerAmountChanged",
  "storageKey": null
},
v32 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "stateReason",
  "storageKey": null
},
v33 = {
  "kind": "Literal",
  "name": "sort",
  "value": "DESC"
},
v34 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "contentType",
  "storageKey": null
},
v35 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "fileName",
  "storageKey": null
},
v36 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "downloadURL",
  "storageKey": null
},
v37 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "buyerAction",
  "storageKey": null
},
v38 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
},
v39 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 15
  },
  (v33/*: any*/)
],
v40 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "fromParticipant",
  "storageKey": null
},
v41 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Conversation"
},
v42 = [
  "OFFER_ACCEPTED",
  "OFFER_ACCEPTED_CONFIRM_NEEDED",
  "OFFER_RECEIVED",
  "OFFER_RECEIVED_CONFIRM_NEEDED",
  "PAYMENT_FAILED",
  "PROVISIONAL_OFFER_ACCEPTED"
],
v43 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v44 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v45 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "MessageConnection"
},
v46 = {
  "enumValues": null,
  "nullable": true,
  "plural": true,
  "type": "MessageEdge"
},
v47 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Message"
},
v48 = {
  "enumValues": null,
  "nullable": true,
  "plural": true,
  "type": "Attachment"
},
v49 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v50 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
},
v51 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Boolean"
},
v52 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ID"
},
v53 = {
  "enumValues": null,
  "nullable": true,
  "plural": true,
  "type": "ConversationItem"
},
v54 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ConversationItemType"
},
v55 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Artist"
},
v56 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v57 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ResizedImageUrl"
},
v58 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
},
v59 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ListPrice"
},
v60 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ArtworkInfoRow"
},
v61 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "dimensions"
},
v62 = {
  "enumValues": null,
  "nullable": false,
  "plural": true,
  "type": "String"
},
v63 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "PageInfo"
},
v64 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CommerceOrderConnectionWithTotalCount"
},
v65 = {
  "enumValues": null,
  "nullable": true,
  "plural": true,
  "type": "CommerceOrderEdge"
},
v66 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CommerceOrder"
},
v67 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CommerceOffer"
},
v68 = {
  "enumValues": [
    "ABANDONED",
    "APPROVED",
    "CANCELED",
    "FULFILLED",
    "IN_REVIEW",
    "PENDING",
    "PROCESSING_APPROVAL",
    "REFUNDED",
    "SUBMITTED"
  ],
  "nullable": false,
  "plural": false,
  "type": "CommerceOrderStateEnum"
},
v69 = {
  "enumValues": [
    "BUYER",
    "SELLER"
  ],
  "nullable": true,
  "plural": false,
  "type": "CommerceOrderParticipantEnum"
},
v70 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ConversationResponder"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ConversationAppTestQuery",
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
            "name": "ConversationApp_viewer"
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Conversation",
        "kind": "LinkedField",
        "name": "conversation",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ConversationApp_conversation"
          }
        ],
        "storageKey": "conversation(id:\"1234\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ConversationAppTestQuery",
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
            "args": (v2/*: any*/),
            "concreteType": "ConversationConnection",
            "kind": "LinkedField",
            "name": "conversationsConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "totalUnreadCount",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "ConversationEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  (v3/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Conversation",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v4/*: any*/),
                      (v5/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "ConversationResponder",
                        "kind": "LinkedField",
                        "name": "to",
                        "plural": false,
                        "selections": (v8/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": [
                          {
                            "kind": "Literal",
                            "name": "format",
                            "value": "MMM D"
                          }
                        ],
                        "kind": "ScalarField",
                        "name": "lastMessageAt",
                        "storageKey": "lastMessageAt(format:\"MMM D\")"
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "lastMessage",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isLastMessageToUser",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "ConversationItem",
                        "kind": "LinkedField",
                        "name": "items",
                        "plural": true,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": null,
                            "kind": "LinkedField",
                            "name": "item",
                            "plural": false,
                            "selections": [
                              (v9/*: any*/),
                              {
                                "kind": "InlineFragment",
                                "selections": [
                                  (v7/*: any*/),
                                  (v10/*: any*/),
                                  (v11/*: any*/),
                                  (v12/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "Artist",
                                    "kind": "LinkedField",
                                    "name": "artist",
                                    "plural": false,
                                    "selections": (v8/*: any*/),
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
                                            "name": "version",
                                            "value": [
                                              "small",
                                              "square"
                                            ]
                                          }
                                        ],
                                        "kind": "ScalarField",
                                        "name": "url",
                                        "storageKey": "url(version:[\"small\",\"square\"])"
                                      }
                                    ],
                                    "storageKey": null
                                  }
                                ],
                                "type": "Artwork",
                                "abstractKey": null
                              },
                              (v14/*: any*/)
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      (v7/*: any*/),
                      (v9/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "PageInfo",
                "kind": "LinkedField",
                "name": "pageInfo",
                "plural": false,
                "selections": [
                  (v15/*: any*/),
                  (v16/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": "conversationsConnection(first:10,type:\"USER\")"
          },
          {
            "alias": null,
            "args": (v2/*: any*/),
            "filters": [
              "type"
            ],
            "handle": "connection",
            "key": "ConversationsSidebar_viewer_conversationsConnection",
            "kind": "LinkedHandle",
            "name": "conversationsConnection"
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Conversation",
        "kind": "LinkedField",
        "name": "conversation",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": [
              (v1/*: any*/),
              {
                "kind": "Literal",
                "name": "offerType",
                "value": [
                  "BULK",
                  "PERSONALIZED"
                ]
              }
            ],
            "concreteType": "PartnerOfferToCollectorConnection",
            "kind": "LinkedField",
            "name": "collectorPartnerOffersConnection",
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
                      (v4/*: any*/),
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
                        "name": "isPurchased",
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
                        "selections": (v17/*: any*/),
                        "storageKey": null
                      },
                      (v7/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "collectorPartnerOffersConnection(first:10,offerType:[\"BULK\",\"PERSONALIZED\"])"
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ConversationInitiator",
            "kind": "LinkedField",
            "name": "from",
            "plural": false,
            "selections": [
              (v6/*: any*/),
              (v7/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "email",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ConversationResponder",
            "kind": "LinkedField",
            "name": "to",
            "plural": false,
            "selections": [
              (v6/*: any*/),
              (v7/*: any*/),
              {
                "alias": null,
                "args": [
                  {
                    "kind": "Literal",
                    "name": "length",
                    "value": 2
                  }
                ],
                "kind": "ScalarField",
                "name": "initials",
                "storageKey": "initials(length:2)"
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ConversationItem",
            "kind": "LinkedField",
            "name": "items",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "item",
                "plural": false,
                "selections": [
                  (v9/*: any*/),
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v4/*: any*/),
                      (v7/*: any*/),
                      (v18/*: any*/),
                      (v11/*: any*/),
                      (v10/*: any*/),
                      {
                        "alias": null,
                        "args": [
                          {
                            "kind": "Literal",
                            "name": "shallow",
                            "value": true
                          }
                        ],
                        "concreteType": "Artist",
                        "kind": "LinkedField",
                        "name": "artist",
                        "plural": false,
                        "selections": [
                          (v6/*: any*/),
                          (v7/*: any*/),
                          (v18/*: any*/)
                        ],
                        "storageKey": "artist(shallow:true)"
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Image",
                        "kind": "LinkedField",
                        "name": "image",
                        "plural": false,
                        "selections": [
                          (v19/*: any*/),
                          {
                            "alias": null,
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "width",
                                "value": 1350
                              }
                            ],
                            "concreteType": "ResizedImageUrl",
                            "kind": "LinkedField",
                            "name": "resized",
                            "plural": false,
                            "selections": [
                              (v19/*: any*/),
                              (v20/*: any*/),
                              (v21/*: any*/)
                            ],
                            "storageKey": "resized(width:1350)"
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "aspectRatio",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      (v12/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "href",
                        "storageKey": null
                      },
                      (v22/*: any*/),
                      (v23/*: any*/),
                      (v24/*: any*/),
                      (v25/*: any*/)
                    ],
                    "type": "Artwork",
                    "abstractKey": null
                  },
                  (v14/*: any*/),
                  {
                    "kind": "TypeDiscriminator",
                    "abstractKey": "__isConversationItemType"
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "liveArtwork",
                "plural": false,
                "selections": [
                  (v9/*: any*/),
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v26/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isEdition",
                        "storageKey": null
                      },
                      (v4/*: any*/),
                      (v18/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "EditionSet",
                        "kind": "LinkedField",
                        "name": "editionSets",
                        "plural": true,
                        "selections": [
                          (v4/*: any*/),
                          (v7/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "editionOf",
                            "storageKey": null
                          },
                          (v23/*: any*/),
                          (v22/*: any*/),
                          (v26/*: any*/),
                          (v25/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "dimensions",
                            "kind": "LinkedField",
                            "name": "dimensions",
                            "plural": false,
                            "selections": [
                              (v27/*: any*/),
                              (v28/*: any*/)
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
                        "name": "category",
                        "storageKey": null
                      },
                      (v24/*: any*/),
                      (v11/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "manufacturer",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "medium",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "publisher",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "saleMessage",
                        "storageKey": null
                      },
                      (v10/*: any*/),
                      (v22/*: any*/),
                      (v23/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "AttributionClass",
                        "kind": "LinkedField",
                        "name": "attributionClass",
                        "plural": false,
                        "selections": (v8/*: any*/),
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
                                "value": 40
                              },
                              {
                                "kind": "Literal",
                                "name": "width",
                                "value": 40
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
                                "name": "src",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "srcSet",
                                "storageKey": null
                              },
                              (v20/*: any*/),
                              (v21/*: any*/)
                            ],
                            "storageKey": "resized(height:40,width:40)"
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "ArtworkInfoRow",
                        "kind": "LinkedField",
                        "name": "conditionDescription",
                        "plural": false,
                        "selections": (v29/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "ArtworkInfoRow",
                        "kind": "LinkedField",
                        "name": "certificateOfAuthenticity",
                        "plural": false,
                        "selections": (v29/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "ArtworkInfoRow",
                        "kind": "LinkedField",
                        "name": "framed",
                        "plural": false,
                        "selections": (v29/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "dimensions",
                        "kind": "LinkedField",
                        "name": "dimensions",
                        "plural": false,
                        "selections": [
                          (v28/*: any*/),
                          (v27/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "ArtworkInfoRow",
                        "kind": "LinkedField",
                        "name": "signatureInfo",
                        "plural": false,
                        "selections": (v29/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "published",
                        "storageKey": null
                      }
                    ],
                    "type": "Artwork",
                    "abstractKey": null
                  },
                  (v14/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 1
              },
              {
                "kind": "Literal",
                "name": "states",
                "value": [
                  "APPROVED",
                  "FULFILLED",
                  "SUBMITTED",
                  "PROCESSING_APPROVAL",
                  "REFUNDED",
                  "CANCELED"
                ]
              }
            ],
            "concreteType": "CommerceOrderConnectionWithTotalCount",
            "kind": "LinkedField",
            "name": "orderConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "CommerceOrderEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v9/*: any*/),
                      {
                        "kind": "TypeDiscriminator",
                        "abstractKey": "__isCommerceOrder"
                      },
                      (v7/*: any*/),
                      (v30/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "mode",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "CommerceLineItemConnection",
                        "kind": "LinkedField",
                        "name": "lineItems",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "CommerceLineItemEdge",
                            "kind": "LinkedField",
                            "name": "edges",
                            "plural": true,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "CommerceLineItem",
                                "kind": "LinkedField",
                                "name": "node",
                                "plural": false,
                                "selections": [
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "Artwork",
                                    "kind": "LinkedField",
                                    "name": "artwork",
                                    "plural": false,
                                    "selections": (v13/*: any*/),
                                    "storageKey": null
                                  },
                                  (v7/*: any*/)
                                ],
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "CommerceOffer",
                            "kind": "LinkedField",
                            "name": "lastOffer",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": null,
                                "kind": "LinkedField",
                                "name": "from",
                                "plural": false,
                                "selections": [
                                  (v9/*: any*/)
                                ],
                                "storageKey": null
                              },
                              (v31/*: any*/),
                              (v7/*: any*/),
                              {
                                "alias": null,
                                "args": [
                                  {
                                    "kind": "Literal",
                                    "name": "precision",
                                    "value": 2
                                  }
                                ],
                                "kind": "ScalarField",
                                "name": "amount",
                                "storageKey": "amount(precision:2)"
                              }
                            ],
                            "storageKey": null
                          }
                        ],
                        "type": "CommerceOfferOrder",
                        "abstractKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "code",
                        "storageKey": null
                      },
                      (v32/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "stateExpiresAt",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "stateUpdatedAt",
                        "storageKey": null
                      },
                      {
                        "alias": "formattedStateExpiresAt",
                        "args": [
                          {
                            "kind": "Literal",
                            "name": "format",
                            "value": "MMM D, h:mm A zz"
                          }
                        ],
                        "kind": "ScalarField",
                        "name": "stateExpiresAt",
                        "storageKey": "stateExpiresAt(format:\"MMM D, h:mm A zz\")"
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "orderConnection(first:1,states:[\"APPROVED\",\"FULFILLED\",\"SUBMITTED\",\"PROCESSING_APPROVAL\",\"REFUNDED\",\"CANCELED\"])"
          },
          (v4/*: any*/),
          {
            "alias": "attachmentsConnection",
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 30
              },
              (v33/*: any*/)
            ],
            "concreteType": "MessageConnection",
            "kind": "LinkedField",
            "name": "messagesConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "MessageEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Message",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Attachment",
                        "kind": "LinkedField",
                        "name": "attachments",
                        "plural": true,
                        "selections": [
                          (v7/*: any*/),
                          (v34/*: any*/),
                          (v35/*: any*/),
                          (v36/*: any*/)
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
            ],
            "storageKey": "messagesConnection(first:30,sort:\"DESC\")"
          },
          {
            "alias": "activeCollectorOrders",
            "args": [
              {
                "kind": "Literal",
                "name": "buyerState",
                "value": [
                  "SUBMITTED",
                  "OFFER_RECEIVED",
                  "COUNTEROFFER_SENT",
                  "PAYMENT_FAILED",
                  "PROCESSING_PAYMENT",
                  "PROCESSING_OFFLINE_PAYMENT",
                  "APPROVED",
                  "SHIPPED",
                  "COMPLETED",
                  "REFUNDED"
                ]
              },
              (v1/*: any*/)
            ],
            "concreteType": "MeOrdersConnection",
            "kind": "LinkedField",
            "name": "collectorOrdersConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "MeOrdersEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Order",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v4/*: any*/),
                      (v37/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "buyerStateExpiresAt",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Offer",
                        "kind": "LinkedField",
                        "name": "lastSubmittedOffer",
                        "plural": false,
                        "selections": [
                          (v38/*: any*/),
                          (v7/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Offer",
                        "kind": "LinkedField",
                        "name": "submittedOffers",
                        "plural": true,
                        "selections": [
                          (v4/*: any*/),
                          (v7/*: any*/)
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
            ],
            "storageKey": "collectorOrdersConnection(buyerState:[\"SUBMITTED\",\"OFFER_RECEIVED\",\"COUNTEROFFER_SENT\",\"PAYMENT_FAILED\",\"PROCESSING_PAYMENT\",\"PROCESSING_OFFLINE_PAYMENT\",\"APPROVED\",\"SHIPPED\",\"COMPLETED\",\"REFUNDED\"],first:10)"
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "inquiryID",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "lastMessageID",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "fromLastViewedMessageID",
            "storageKey": null
          },
          (v5/*: any*/),
          {
            "alias": null,
            "args": (v39/*: any*/),
            "concreteType": "MessageConnection",
            "kind": "LinkedField",
            "name": "messagesConnection",
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
                "concreteType": "PageInfo",
                "kind": "LinkedField",
                "name": "pageInfo",
                "plural": false,
                "selections": [
                  (v16/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "hasPreviousPage",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "startCursor",
                    "storageKey": null
                  },
                  (v15/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "MessageEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Message",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v7/*: any*/),
                      (v4/*: any*/),
                      (v38/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isFromUser",
                        "storageKey": null
                      },
                      (v9/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Attachment",
                        "kind": "LinkedField",
                        "name": "attachments",
                        "plural": true,
                        "selections": [
                          (v4/*: any*/),
                          (v34/*: any*/),
                          (v36/*: any*/),
                          (v35/*: any*/),
                          (v7/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "body",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isMessageSentOnPlatform",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Delivery",
                        "kind": "LinkedField",
                        "name": "deliveries",
                        "plural": true,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "openedAt",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "fullTransformedEmail",
                            "storageKey": null
                          },
                          (v7/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isFirstMessage",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "MessageInitiator",
                        "kind": "LinkedField",
                        "name": "from",
                        "plural": false,
                        "selections": [
                          (v6/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "to",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "cc",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  (v3/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": "messagesConnection(first:15,sort:\"DESC\")"
          },
          {
            "alias": null,
            "args": (v39/*: any*/),
            "filters": [
              "sort"
            ],
            "handle": "connection",
            "key": "ConversationMessages_conversation_messagesConnection",
            "kind": "LinkedHandle",
            "name": "messagesConnection"
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "PartnerInquiryRequest",
            "kind": "LinkedField",
            "name": "inquiryRequest",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "formattedFirstMessage",
                "storageKey": null
              },
              (v7/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": "orderEvents",
            "args": [
              (v1/*: any*/),
              {
                "kind": "Literal",
                "name": "participantType",
                "value": "BUYER"
              },
              {
                "kind": "Literal",
                "name": "states",
                "value": [
                  "APPROVED",
                  "FULFILLED",
                  "SUBMITTED",
                  "REFUNDED",
                  "CANCELED",
                  "PROCESSING_APPROVAL"
                ]
              }
            ],
            "concreteType": "CommerceOrderConnectionWithTotalCount",
            "kind": "LinkedField",
            "name": "orderConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "CommerceOrderEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v9/*: any*/),
                      (v4/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "updatedAt",
                        "storageKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v37/*: any*/)
                        ],
                        "type": "CommerceOfferOrder",
                        "abstractKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": null,
                        "kind": "LinkedField",
                        "name": "orderHistory",
                        "plural": true,
                        "selections": [
                          {
                            "kind": "TypeDiscriminator",
                            "abstractKey": "__isCommerceOrderEventUnion"
                          },
                          (v9/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v38/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "orderUpdateState",
                                "storageKey": null
                              },
                              (v30/*: any*/),
                              (v32/*: any*/)
                            ],
                            "type": "CommerceOrderStateChangedEvent",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v38/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "CommerceOffer",
                                "kind": "LinkedField",
                                "name": "offer",
                                "plural": false,
                                "selections": [
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "amount",
                                    "storageKey": null
                                  },
                                  (v40/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "definesTotal",
                                    "storageKey": null
                                  },
                                  (v31/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "CommerceOffer",
                                    "kind": "LinkedField",
                                    "name": "respondsTo",
                                    "plural": false,
                                    "selections": [
                                      (v40/*: any*/),
                                      (v7/*: any*/)
                                    ],
                                    "storageKey": null
                                  },
                                  (v7/*: any*/)
                                ],
                                "storageKey": null
                              }
                            ],
                            "type": "CommerceOfferSubmittedEvent",
                            "abstractKey": null
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
            ],
            "storageKey": "orderConnection(first:10,participantType:\"BUYER\",states:[\"APPROVED\",\"FULFILLED\",\"SUBMITTED\",\"REFUNDED\",\"CANCELED\",\"PROCESSING_APPROVAL\"])"
          },
          (v7/*: any*/)
        ],
        "storageKey": "conversation(id:\"1234\")"
      }
    ]
  },
  "params": {
    "cacheID": "b24986df5ffc752336fad2d8f2488cb6",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "conversation": (v41/*: any*/),
        "conversation.activeCollectorOrders": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "MeOrdersConnection"
        },
        "conversation.activeCollectorOrders.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "MeOrdersEdge"
        },
        "conversation.activeCollectorOrders.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Order"
        },
        "conversation.activeCollectorOrders.edges.node.buyerAction": {
          "enumValues": (v42/*: any*/),
          "nullable": true,
          "plural": false,
          "type": "OrderBuyerActionEnum"
        },
        "conversation.activeCollectorOrders.edges.node.buyerStateExpiresAt": (v43/*: any*/),
        "conversation.activeCollectorOrders.edges.node.id": (v44/*: any*/),
        "conversation.activeCollectorOrders.edges.node.internalID": (v44/*: any*/),
        "conversation.activeCollectorOrders.edges.node.lastSubmittedOffer": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Offer"
        },
        "conversation.activeCollectorOrders.edges.node.lastSubmittedOffer.createdAt": (v43/*: any*/),
        "conversation.activeCollectorOrders.edges.node.lastSubmittedOffer.id": (v44/*: any*/),
        "conversation.activeCollectorOrders.edges.node.submittedOffers": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "Offer"
        },
        "conversation.activeCollectorOrders.edges.node.submittedOffers.id": (v44/*: any*/),
        "conversation.activeCollectorOrders.edges.node.submittedOffers.internalID": (v44/*: any*/),
        "conversation.attachmentsConnection": (v45/*: any*/),
        "conversation.attachmentsConnection.edges": (v46/*: any*/),
        "conversation.attachmentsConnection.edges.node": (v47/*: any*/),
        "conversation.attachmentsConnection.edges.node.attachments": (v48/*: any*/),
        "conversation.attachmentsConnection.edges.node.attachments.contentType": (v49/*: any*/),
        "conversation.attachmentsConnection.edges.node.attachments.downloadURL": (v49/*: any*/),
        "conversation.attachmentsConnection.edges.node.attachments.fileName": (v49/*: any*/),
        "conversation.attachmentsConnection.edges.node.attachments.id": (v44/*: any*/),
        "conversation.attachmentsConnection.edges.node.id": (v44/*: any*/),
        "conversation.collectorPartnerOffersConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "PartnerOfferToCollectorConnection"
        },
        "conversation.collectorPartnerOffersConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "PartnerOfferToCollectorEdge"
        },
        "conversation.collectorPartnerOffersConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "PartnerOfferToCollector"
        },
        "conversation.collectorPartnerOffersConnection.edges.node.artworkId": (v43/*: any*/),
        "conversation.collectorPartnerOffersConnection.edges.node.endAt": (v43/*: any*/),
        "conversation.collectorPartnerOffersConnection.edges.node.id": (v44/*: any*/),
        "conversation.collectorPartnerOffersConnection.edges.node.internalID": (v44/*: any*/),
        "conversation.collectorPartnerOffersConnection.edges.node.isAvailable": (v50/*: any*/),
        "conversation.collectorPartnerOffersConnection.edges.node.isPurchased": (v51/*: any*/),
        "conversation.collectorPartnerOffersConnection.edges.node.note": (v43/*: any*/),
        "conversation.collectorPartnerOffersConnection.edges.node.priceWithDiscount": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Money"
        },
        "conversation.collectorPartnerOffersConnection.edges.node.priceWithDiscount.display": (v43/*: any*/),
        "conversation.from": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ConversationInitiator"
        },
        "conversation.from.email": (v49/*: any*/),
        "conversation.from.id": (v44/*: any*/),
        "conversation.from.name": (v49/*: any*/),
        "conversation.fromLastViewedMessageID": (v43/*: any*/),
        "conversation.id": (v44/*: any*/),
        "conversation.inquiryID": (v43/*: any*/),
        "conversation.inquiryRequest": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "PartnerInquiryRequest"
        },
        "conversation.inquiryRequest.formattedFirstMessage": (v43/*: any*/),
        "conversation.inquiryRequest.id": (v44/*: any*/),
        "conversation.internalID": (v52/*: any*/),
        "conversation.items": (v53/*: any*/),
        "conversation.items.item": (v54/*: any*/),
        "conversation.items.item.__isConversationItemType": (v49/*: any*/),
        "conversation.items.item.__isNode": (v49/*: any*/),
        "conversation.items.item.__typename": (v49/*: any*/),
        "conversation.items.item.artist": (v55/*: any*/),
        "conversation.items.item.artist.id": (v44/*: any*/),
        "conversation.items.item.artist.name": (v43/*: any*/),
        "conversation.items.item.artist.slug": (v44/*: any*/),
        "conversation.items.item.artistNames": (v43/*: any*/),
        "conversation.items.item.date": (v43/*: any*/),
        "conversation.items.item.href": (v43/*: any*/),
        "conversation.items.item.id": (v44/*: any*/),
        "conversation.items.item.image": (v56/*: any*/),
        "conversation.items.item.image.aspectRatio": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Float"
        },
        "conversation.items.item.image.resized": (v57/*: any*/),
        "conversation.items.item.image.resized.height": (v58/*: any*/),
        "conversation.items.item.image.resized.url": (v49/*: any*/),
        "conversation.items.item.image.resized.width": (v58/*: any*/),
        "conversation.items.item.image.url": (v43/*: any*/),
        "conversation.items.item.internalID": (v44/*: any*/),
        "conversation.items.item.isOfferable": (v50/*: any*/),
        "conversation.items.item.isOfferableFromInquiry": (v50/*: any*/),
        "conversation.items.item.isUnlisted": (v51/*: any*/),
        "conversation.items.item.listPrice": (v59/*: any*/),
        "conversation.items.item.listPrice.__typename": (v49/*: any*/),
        "conversation.items.item.listPrice.display": (v43/*: any*/),
        "conversation.items.item.slug": (v44/*: any*/),
        "conversation.items.item.title": (v43/*: any*/),
        "conversation.items.liveArtwork": (v54/*: any*/),
        "conversation.items.liveArtwork.__isNode": (v49/*: any*/),
        "conversation.items.liveArtwork.__typename": (v49/*: any*/),
        "conversation.items.liveArtwork.artistNames": (v43/*: any*/),
        "conversation.items.liveArtwork.attributionClass": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AttributionClass"
        },
        "conversation.items.liveArtwork.attributionClass.id": (v44/*: any*/),
        "conversation.items.liveArtwork.attributionClass.name": (v43/*: any*/),
        "conversation.items.liveArtwork.category": (v43/*: any*/),
        "conversation.items.liveArtwork.certificateOfAuthenticity": (v60/*: any*/),
        "conversation.items.liveArtwork.certificateOfAuthenticity.details": (v43/*: any*/),
        "conversation.items.liveArtwork.conditionDescription": (v60/*: any*/),
        "conversation.items.liveArtwork.conditionDescription.details": (v43/*: any*/),
        "conversation.items.liveArtwork.date": (v43/*: any*/),
        "conversation.items.liveArtwork.dimensions": (v61/*: any*/),
        "conversation.items.liveArtwork.dimensions.cm": (v43/*: any*/),
        "conversation.items.liveArtwork.dimensions.in": (v43/*: any*/),
        "conversation.items.liveArtwork.editionSets": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "EditionSet"
        },
        "conversation.items.liveArtwork.editionSets.dimensions": (v61/*: any*/),
        "conversation.items.liveArtwork.editionSets.dimensions.cm": (v43/*: any*/),
        "conversation.items.liveArtwork.editionSets.dimensions.in": (v43/*: any*/),
        "conversation.items.liveArtwork.editionSets.editionOf": (v43/*: any*/),
        "conversation.items.liveArtwork.editionSets.id": (v44/*: any*/),
        "conversation.items.liveArtwork.editionSets.internalID": (v44/*: any*/),
        "conversation.items.liveArtwork.editionSets.isAcquireable": (v50/*: any*/),
        "conversation.items.liveArtwork.editionSets.isOfferable": (v50/*: any*/),
        "conversation.items.liveArtwork.editionSets.isOfferableFromInquiry": (v50/*: any*/),
        "conversation.items.liveArtwork.editionSets.listPrice": (v59/*: any*/),
        "conversation.items.liveArtwork.editionSets.listPrice.__typename": (v49/*: any*/),
        "conversation.items.liveArtwork.editionSets.listPrice.display": (v43/*: any*/),
        "conversation.items.liveArtwork.framed": (v60/*: any*/),
        "conversation.items.liveArtwork.framed.details": (v43/*: any*/),
        "conversation.items.liveArtwork.id": (v44/*: any*/),
        "conversation.items.liveArtwork.image": (v56/*: any*/),
        "conversation.items.liveArtwork.image.resized": (v57/*: any*/),
        "conversation.items.liveArtwork.image.resized.height": (v58/*: any*/),
        "conversation.items.liveArtwork.image.resized.src": (v49/*: any*/),
        "conversation.items.liveArtwork.image.resized.srcSet": (v49/*: any*/),
        "conversation.items.liveArtwork.image.resized.width": (v58/*: any*/),
        "conversation.items.liveArtwork.internalID": (v44/*: any*/),
        "conversation.items.liveArtwork.isAcquireable": (v50/*: any*/),
        "conversation.items.liveArtwork.isEdition": (v50/*: any*/),
        "conversation.items.liveArtwork.isOfferable": (v50/*: any*/),
        "conversation.items.liveArtwork.isOfferableFromInquiry": (v50/*: any*/),
        "conversation.items.liveArtwork.manufacturer": (v43/*: any*/),
        "conversation.items.liveArtwork.medium": (v43/*: any*/),
        "conversation.items.liveArtwork.published": (v51/*: any*/),
        "conversation.items.liveArtwork.publisher": (v43/*: any*/),
        "conversation.items.liveArtwork.saleMessage": (v43/*: any*/),
        "conversation.items.liveArtwork.signatureInfo": (v60/*: any*/),
        "conversation.items.liveArtwork.signatureInfo.details": (v43/*: any*/),
        "conversation.items.liveArtwork.slug": (v44/*: any*/),
        "conversation.items.liveArtwork.title": (v43/*: any*/),
        "conversation.lastMessageID": (v43/*: any*/),
        "conversation.messagesConnection": (v45/*: any*/),
        "conversation.messagesConnection.edges": (v46/*: any*/),
        "conversation.messagesConnection.edges.cursor": (v49/*: any*/),
        "conversation.messagesConnection.edges.node": (v47/*: any*/),
        "conversation.messagesConnection.edges.node.__typename": (v49/*: any*/),
        "conversation.messagesConnection.edges.node.attachments": (v48/*: any*/),
        "conversation.messagesConnection.edges.node.attachments.contentType": (v49/*: any*/),
        "conversation.messagesConnection.edges.node.attachments.downloadURL": (v49/*: any*/),
        "conversation.messagesConnection.edges.node.attachments.fileName": (v49/*: any*/),
        "conversation.messagesConnection.edges.node.attachments.id": (v44/*: any*/),
        "conversation.messagesConnection.edges.node.attachments.internalID": (v44/*: any*/),
        "conversation.messagesConnection.edges.node.body": (v43/*: any*/),
        "conversation.messagesConnection.edges.node.cc": (v62/*: any*/),
        "conversation.messagesConnection.edges.node.createdAt": (v43/*: any*/),
        "conversation.messagesConnection.edges.node.deliveries": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Delivery"
        },
        "conversation.messagesConnection.edges.node.deliveries.fullTransformedEmail": (v49/*: any*/),
        "conversation.messagesConnection.edges.node.deliveries.id": (v44/*: any*/),
        "conversation.messagesConnection.edges.node.deliveries.openedAt": (v43/*: any*/),
        "conversation.messagesConnection.edges.node.from": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "MessageInitiator"
        },
        "conversation.messagesConnection.edges.node.from.name": (v43/*: any*/),
        "conversation.messagesConnection.edges.node.id": (v44/*: any*/),
        "conversation.messagesConnection.edges.node.internalID": (v44/*: any*/),
        "conversation.messagesConnection.edges.node.isFirstMessage": (v50/*: any*/),
        "conversation.messagesConnection.edges.node.isFromUser": (v50/*: any*/),
        "conversation.messagesConnection.edges.node.isMessageSentOnPlatform": (v50/*: any*/),
        "conversation.messagesConnection.edges.node.to": (v62/*: any*/),
        "conversation.messagesConnection.pageInfo": (v63/*: any*/),
        "conversation.messagesConnection.pageInfo.endCursor": (v43/*: any*/),
        "conversation.messagesConnection.pageInfo.hasNextPage": (v51/*: any*/),
        "conversation.messagesConnection.pageInfo.hasPreviousPage": (v51/*: any*/),
        "conversation.messagesConnection.pageInfo.startCursor": (v43/*: any*/),
        "conversation.messagesConnection.totalCount": (v58/*: any*/),
        "conversation.orderConnection": (v64/*: any*/),
        "conversation.orderConnection.edges": (v65/*: any*/),
        "conversation.orderConnection.edges.node": (v66/*: any*/),
        "conversation.orderConnection.edges.node.__isCommerceOrder": (v49/*: any*/),
        "conversation.orderConnection.edges.node.__typename": (v49/*: any*/),
        "conversation.orderConnection.edges.node.code": (v49/*: any*/),
        "conversation.orderConnection.edges.node.formattedStateExpiresAt": (v43/*: any*/),
        "conversation.orderConnection.edges.node.id": (v44/*: any*/),
        "conversation.orderConnection.edges.node.lastOffer": (v67/*: any*/),
        "conversation.orderConnection.edges.node.lastOffer.amount": (v43/*: any*/),
        "conversation.orderConnection.edges.node.lastOffer.from": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "CommerceOrderPartyUnion"
        },
        "conversation.orderConnection.edges.node.lastOffer.from.__typename": (v49/*: any*/),
        "conversation.orderConnection.edges.node.lastOffer.id": (v44/*: any*/),
        "conversation.orderConnection.edges.node.lastOffer.offerAmountChanged": (v51/*: any*/),
        "conversation.orderConnection.edges.node.lineItems": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CommerceLineItemConnection"
        },
        "conversation.orderConnection.edges.node.lineItems.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "CommerceLineItemEdge"
        },
        "conversation.orderConnection.edges.node.lineItems.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CommerceLineItem"
        },
        "conversation.orderConnection.edges.node.lineItems.edges.node.artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "conversation.orderConnection.edges.node.lineItems.edges.node.artwork.id": (v44/*: any*/),
        "conversation.orderConnection.edges.node.lineItems.edges.node.id": (v44/*: any*/),
        "conversation.orderConnection.edges.node.mode": {
          "enumValues": [
            "BUY",
            "OFFER"
          ],
          "nullable": true,
          "plural": false,
          "type": "CommerceOrderModeEnum"
        },
        "conversation.orderConnection.edges.node.state": (v68/*: any*/),
        "conversation.orderConnection.edges.node.stateExpiresAt": (v43/*: any*/),
        "conversation.orderConnection.edges.node.stateReason": (v43/*: any*/),
        "conversation.orderConnection.edges.node.stateUpdatedAt": (v43/*: any*/),
        "conversation.orderEvents": (v64/*: any*/),
        "conversation.orderEvents.edges": (v65/*: any*/),
        "conversation.orderEvents.edges.node": (v66/*: any*/),
        "conversation.orderEvents.edges.node.__typename": (v49/*: any*/),
        "conversation.orderEvents.edges.node.buyerAction": {
          "enumValues": (v42/*: any*/),
          "nullable": true,
          "plural": false,
          "type": "CommerceBuyerOfferActionEnum"
        },
        "conversation.orderEvents.edges.node.id": (v44/*: any*/),
        "conversation.orderEvents.edges.node.internalID": (v44/*: any*/),
        "conversation.orderEvents.edges.node.orderHistory": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "CommerceOrderEventUnion"
        },
        "conversation.orderEvents.edges.node.orderHistory.__isCommerceOrderEventUnion": (v49/*: any*/),
        "conversation.orderEvents.edges.node.orderHistory.__typename": (v49/*: any*/),
        "conversation.orderEvents.edges.node.orderHistory.createdAt": (v49/*: any*/),
        "conversation.orderEvents.edges.node.orderHistory.offer": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "CommerceOffer"
        },
        "conversation.orderEvents.edges.node.orderHistory.offer.amount": (v43/*: any*/),
        "conversation.orderEvents.edges.node.orderHistory.offer.definesTotal": (v51/*: any*/),
        "conversation.orderEvents.edges.node.orderHistory.offer.fromParticipant": (v69/*: any*/),
        "conversation.orderEvents.edges.node.orderHistory.offer.id": (v44/*: any*/),
        "conversation.orderEvents.edges.node.orderHistory.offer.offerAmountChanged": (v51/*: any*/),
        "conversation.orderEvents.edges.node.orderHistory.offer.respondsTo": (v67/*: any*/),
        "conversation.orderEvents.edges.node.orderHistory.offer.respondsTo.fromParticipant": (v69/*: any*/),
        "conversation.orderEvents.edges.node.orderHistory.offer.respondsTo.id": (v44/*: any*/),
        "conversation.orderEvents.edges.node.orderHistory.orderUpdateState": (v43/*: any*/),
        "conversation.orderEvents.edges.node.orderHistory.state": (v68/*: any*/),
        "conversation.orderEvents.edges.node.orderHistory.stateReason": (v43/*: any*/),
        "conversation.orderEvents.edges.node.updatedAt": (v49/*: any*/),
        "conversation.to": (v70/*: any*/),
        "conversation.to.id": (v44/*: any*/),
        "conversation.to.initials": (v43/*: any*/),
        "conversation.to.name": (v49/*: any*/),
        "conversation.unreadByCollector": (v50/*: any*/),
        "viewer": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Viewer"
        },
        "viewer.conversationsConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ConversationConnection"
        },
        "viewer.conversationsConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "ConversationEdge"
        },
        "viewer.conversationsConnection.edges.cursor": (v49/*: any*/),
        "viewer.conversationsConnection.edges.node": (v41/*: any*/),
        "viewer.conversationsConnection.edges.node.__typename": (v49/*: any*/),
        "viewer.conversationsConnection.edges.node.id": (v44/*: any*/),
        "viewer.conversationsConnection.edges.node.internalID": (v52/*: any*/),
        "viewer.conversationsConnection.edges.node.isLastMessageToUser": (v50/*: any*/),
        "viewer.conversationsConnection.edges.node.items": (v53/*: any*/),
        "viewer.conversationsConnection.edges.node.items.item": (v54/*: any*/),
        "viewer.conversationsConnection.edges.node.items.item.__isNode": (v49/*: any*/),
        "viewer.conversationsConnection.edges.node.items.item.__typename": (v49/*: any*/),
        "viewer.conversationsConnection.edges.node.items.item.artist": (v55/*: any*/),
        "viewer.conversationsConnection.edges.node.items.item.artist.id": (v44/*: any*/),
        "viewer.conversationsConnection.edges.node.items.item.artist.name": (v43/*: any*/),
        "viewer.conversationsConnection.edges.node.items.item.date": (v43/*: any*/),
        "viewer.conversationsConnection.edges.node.items.item.id": (v44/*: any*/),
        "viewer.conversationsConnection.edges.node.items.item.image": (v56/*: any*/),
        "viewer.conversationsConnection.edges.node.items.item.image.url": (v43/*: any*/),
        "viewer.conversationsConnection.edges.node.items.item.isUnlisted": (v51/*: any*/),
        "viewer.conversationsConnection.edges.node.items.item.title": (v43/*: any*/),
        "viewer.conversationsConnection.edges.node.lastMessage": (v43/*: any*/),
        "viewer.conversationsConnection.edges.node.lastMessageAt": (v43/*: any*/),
        "viewer.conversationsConnection.edges.node.to": (v70/*: any*/),
        "viewer.conversationsConnection.edges.node.to.id": (v44/*: any*/),
        "viewer.conversationsConnection.edges.node.to.name": (v49/*: any*/),
        "viewer.conversationsConnection.edges.node.unreadByCollector": (v50/*: any*/),
        "viewer.conversationsConnection.pageInfo": (v63/*: any*/),
        "viewer.conversationsConnection.pageInfo.endCursor": (v43/*: any*/),
        "viewer.conversationsConnection.pageInfo.hasNextPage": (v51/*: any*/),
        "viewer.conversationsConnection.totalUnreadCount": (v58/*: any*/)
      }
    },
    "name": "ConversationAppTestQuery",
    "operationKind": "query",
    "text": "query ConversationAppTestQuery {\n  viewer {\n    ...ConversationApp_viewer\n  }\n  conversation(id: \"1234\") {\n    ...ConversationApp_conversation\n    id\n  }\n}\n\nfragment ConversationApp_conversation on Conversation {\n  ...ConversationsContext_conversation\n  ...ConversationHeader_conversation\n  ...ConversationDetails_conversation\n  ...ConversationReply_conversation\n  ...ConversationMessages_conversation\n}\n\nfragment ConversationApp_viewer on Viewer {\n  ...ConversationsSidebar_viewer_4i7Unr\n}\n\nfragment ConversationArtwork_conversation on Conversation {\n  items {\n    item {\n      __typename\n      ... on Artwork {\n        id\n        slug\n        date\n        title\n        isUnlisted\n        artist(shallow: true) {\n          name\n          slug\n          id\n        }\n        image {\n          url\n        }\n      }\n      ... on Node {\n        __isNode: __typename\n        id\n      }\n    }\n  }\n}\n\nfragment ConversationAttachments_conversation on Conversation {\n  attachmentsConnection: messagesConnection(first: 30, sort: DESC) {\n    edges {\n      node {\n        attachments {\n          id\n          contentType\n          fileName\n          downloadURL\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment ConversationCTA_conversation on Conversation {\n  ...useConversationPurchaseButtonData_conversation\n  ...ConversationReviewOfferCTA_conversation\n  internalID\n  items {\n    liveArtwork {\n      __typename\n      ... on Artwork {\n        ...ConversationConfirmModal_artwork\n        __typename\n        internalID\n        isOfferableFromInquiry\n        isAcquireable\n        isOfferable\n        published\n      }\n      ... on Node {\n        __isNode: __typename\n        id\n      }\n    }\n    item {\n      __typename\n      ... on Artwork {\n        internalID\n      }\n      ... on Node {\n        __isNode: __typename\n        id\n      }\n    }\n  }\n  activeCollectorOrders: collectorOrdersConnection(first: 10, buyerState: [SUBMITTED, OFFER_RECEIVED, COUNTEROFFER_SENT, PAYMENT_FAILED, PROCESSING_PAYMENT, PROCESSING_OFFLINE_PAYMENT, APPROVED, SHIPPED, COMPLETED, REFUNDED]) {\n    edges {\n      node {\n        internalID\n        buyerAction\n        id\n      }\n    }\n  }\n}\n\nfragment ConversationConfirmModal_artwork on Artwork {\n  category\n  artistNames\n  date\n  internalID\n  isEdition\n  manufacturer\n  medium\n  publisher\n  saleMessage\n  title\n  isOfferable\n  isAcquireable\n  isOfferableFromInquiry\n  attributionClass {\n    name\n    id\n  }\n  image {\n    resized(width: 40, height: 40) {\n      src\n      srcSet\n      width\n      height\n    }\n  }\n  conditionDescription {\n    details\n  }\n  certificateOfAuthenticity {\n    details\n  }\n  framed {\n    details\n  }\n  dimensions {\n    in\n    cm\n  }\n  signatureInfo {\n    details\n  }\n  editionSets {\n    internalID\n    editionOf\n    isOfferableFromInquiry\n    isOfferable\n    isAcquireable\n    listPrice {\n      __typename\n      ... on Money {\n        display\n      }\n      ... on PriceRange {\n        display\n      }\n    }\n    dimensions {\n      cm\n      in\n    }\n    id\n  }\n}\n\nfragment ConversationDetails_conversation on Conversation {\n  internalID\n  orderConnection(first: 1, states: [APPROVED, FULFILLED, SUBMITTED, PROCESSING_APPROVAL, REFUNDED, CANCELED]) {\n    edges {\n      node {\n        __typename\n        ...ConversationOrderInformation_order\n        id\n      }\n    }\n  }\n  ...ConversationArtwork_conversation\n  ...ConversationAttachments_conversation\n}\n\nfragment ConversationHeader_conversation on Conversation {\n  from {\n    name\n    id\n  }\n  to {\n    name\n    id\n  }\n  items {\n    item {\n      __typename\n      ... on Artwork {\n        internalID\n        id\n        slug\n        date\n        title\n        artist(shallow: true) {\n          name\n          id\n        }\n        image {\n          url\n        }\n      }\n      ... on Node {\n        __isNode: __typename\n        id\n      }\n    }\n  }\n  orderConnection(first: 1, states: [APPROVED, FULFILLED, SUBMITTED, PROCESSING_APPROVAL, REFUNDED, CANCELED]) {\n    edges {\n      node {\n        __typename\n        ...ReviewOrderButton_order\n        id\n      }\n    }\n  }\n}\n\nfragment ConversationMessageArtwork_item on ConversationItemType {\n  __isConversationItemType: __typename\n  __typename\n  ... on Artwork {\n    internalID\n    id\n    date\n    title\n    artistNames\n    href\n    isOfferableFromInquiry\n    image {\n      resized(width: 1350) {\n        url\n        width\n        height\n      }\n      aspectRatio\n    }\n    listPrice {\n      __typename\n      ... on Money {\n        display\n      }\n      ... on PriceRange {\n        display\n      }\n    }\n  }\n}\n\nfragment ConversationMessage_message on Message {\n  __typename\n  id\n  internalID\n  attachments {\n    internalID\n    contentType\n    downloadURL\n    fileName\n    id\n  }\n  body\n  createdAt\n  isMessageSentOnPlatform\n  deliveries {\n    openedAt\n    fullTransformedEmail\n    id\n  }\n  isFromUser\n  isFirstMessage\n  from {\n    name\n  }\n  to\n  cc\n}\n\nfragment ConversationMessages_conversation on Conversation {\n  internalID\n  fromLastViewedMessageID\n  unreadByCollector\n  to {\n    name\n    initials(length: 2)\n    id\n  }\n  messagesConnection(first: 15, sort: DESC) {\n    totalCount\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n    edges {\n      node {\n        id\n        internalID\n        createdAt\n        isFromUser\n        ...ConversationMessage_message\n        __typename\n      }\n      cursor\n    }\n  }\n  inquiryRequest {\n    formattedFirstMessage\n    id\n  }\n  ...ConversationPartnerOfferUpdate_conversation\n  items {\n    item {\n      __typename\n      ... on Artwork {\n        id\n        isOfferable\n        isOfferableFromInquiry\n        internalID\n      }\n      ...ConversationMessageArtwork_item\n      ... on Node {\n        __isNode: __typename\n        id\n      }\n    }\n  }\n  orderEvents: orderConnection(first: 10, states: [APPROVED, FULFILLED, SUBMITTED, REFUNDED, CANCELED, PROCESSING_APPROVAL], participantType: BUYER) {\n    edges {\n      node {\n        __typename\n        internalID\n        updatedAt\n        ... on CommerceOfferOrder {\n          buyerAction\n        }\n        orderHistory {\n          ...ConversationOrderUpdate_event\n          __typename\n          ... on CommerceOrderStateChangedEvent {\n            createdAt\n            orderUpdateState\n            state\n            stateReason\n          }\n          ... on CommerceOfferSubmittedEvent {\n            createdAt\n            offer {\n              amount\n              fromParticipant\n              definesTotal\n              offerAmountChanged\n              respondsTo {\n                fromParticipant\n                id\n              }\n              id\n            }\n          }\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment ConversationOrderInformation_order on CommerceOrder {\n  __isCommerceOrder: __typename\n  code\n  state\n  ...ConversationOrderState_state\n  ...ReviewOrderButton_order\n  ... on CommerceOfferOrder {\n    lastOffer {\n      amount(precision: 2)\n      id\n    }\n  }\n}\n\nfragment ConversationOrderState_state on CommerceOrder {\n  __isCommerceOrder: __typename\n  state\n  mode\n  stateReason\n  ... on CommerceOfferOrder {\n    lastOffer {\n      from {\n        __typename\n      }\n      offerAmountChanged\n      id\n    }\n  }\n  ...ConversationStatusWithCounter_order\n}\n\nfragment ConversationOrderUpdate_event on CommerceOrderEventUnion {\n  __isCommerceOrderEventUnion: __typename\n  __typename\n  ... on CommerceOrderStateChangedEvent {\n    createdAt\n    orderUpdateState\n    state\n    stateReason\n  }\n  ... on CommerceOfferSubmittedEvent {\n    createdAt\n    offer {\n      amount\n      fromParticipant\n      definesTotal\n      offerAmountChanged\n      respondsTo {\n        fromParticipant\n        id\n      }\n      id\n    }\n  }\n}\n\nfragment ConversationPartnerOfferCTA_conversation on Conversation {\n  internalID\n  items {\n    item {\n      __typename\n      ... on Artwork {\n        internalID\n        href\n      }\n      ... on Node {\n        __isNode: __typename\n        id\n      }\n    }\n  }\n  activeCollectorOrders: collectorOrdersConnection(first: 10, buyerState: [SUBMITTED, OFFER_RECEIVED, COUNTEROFFER_SENT, PAYMENT_FAILED, PROCESSING_PAYMENT, PROCESSING_OFFLINE_PAYMENT, APPROVED, SHIPPED, COMPLETED, REFUNDED]) {\n    edges {\n      node {\n        internalID\n        id\n      }\n    }\n  }\n}\n\nfragment ConversationPartnerOfferUpdate_conversation on Conversation {\n  items {\n    item {\n      __typename\n      ... on Artwork {\n        internalID\n      }\n      ... on Node {\n        __isNode: __typename\n        id\n      }\n    }\n  }\n}\n\nfragment ConversationReply_conversation on Conversation {\n  ...ConversationCTA_conversation\n  ...ConversationPartnerOfferCTA_conversation\n  from {\n    email\n    id\n  }\n  internalID\n  inquiryID\n  lastMessageID\n}\n\nfragment ConversationReviewOfferCTA_conversation on Conversation {\n  internalID\n  activeCollectorOrders: collectorOrdersConnection(first: 10, buyerState: [SUBMITTED, OFFER_RECEIVED, COUNTEROFFER_SENT, PAYMENT_FAILED, PROCESSING_PAYMENT, PROCESSING_OFFLINE_PAYMENT, APPROVED, SHIPPED, COMPLETED, REFUNDED]) {\n    edges {\n      node {\n        internalID\n        buyerAction\n        buyerStateExpiresAt\n        lastSubmittedOffer {\n          createdAt\n          id\n        }\n        submittedOffers {\n          internalID\n          id\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment ConversationStatusWithCounter_order on CommerceOrder {\n  __isCommerceOrder: __typename\n  stateExpiresAt\n  stateUpdatedAt\n  formattedStateExpiresAt: stateExpiresAt(format: \"MMM D, h:mm A zz\")\n}\n\nfragment ConversationsContext_conversation on Conversation {\n  collectorPartnerOffersConnection(first: 10, offerType: [BULK, PERSONALIZED]) {\n    edges {\n      node {\n        artworkId\n        endAt\n        internalID\n        isAvailable\n        isPurchased\n        note\n        priceWithDiscount {\n          display\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment ConversationsSidebarItem_conversation on Conversation {\n  internalID\n  unreadByCollector\n  to {\n    name\n    id\n  }\n  lastMessageAt(format: \"MMM D\")\n  lastMessage\n  isLastMessageToUser\n  items {\n    item {\n      __typename\n      ... on Artwork {\n        id\n        title\n        date\n        isUnlisted\n        artist {\n          name\n          id\n        }\n        image {\n          url(version: [\"small\", \"square\"])\n        }\n      }\n      ... on Node {\n        __isNode: __typename\n        id\n      }\n    }\n  }\n}\n\nfragment ConversationsSidebar_viewer_4i7Unr on Viewer {\n  conversationsConnection(first: 10, type: USER) {\n    totalUnreadCount\n    edges {\n      cursor\n      node {\n        internalID\n        ...ConversationsSidebarItem_conversation\n        id\n        __typename\n      }\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment ReviewOrderButton_order on CommerceOrder {\n  __isCommerceOrder: __typename\n  id\n  state\n  mode\n  lineItems {\n    edges {\n      node {\n        artwork {\n          id\n        }\n        id\n      }\n    }\n  }\n  ... on CommerceOfferOrder {\n    lastOffer {\n      from {\n        __typename\n      }\n      offerAmountChanged\n      id\n    }\n  }\n}\n\nfragment useConversationPurchaseButtonData_conversation on Conversation {\n  internalID\n  items {\n    liveArtwork {\n      __typename\n      ... on Artwork {\n        __typename\n        isAcquireable\n        isEdition\n        internalID\n        slug\n        editionSets {\n          internalID\n          id\n        }\n      }\n      ... on Node {\n        __isNode: __typename\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "0990e4ea73f79a5d5be393ad568ea34a";

export default node;
