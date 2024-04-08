/**
 * @generated SignedSource<<7861a459d50ec2c1961672d305ad2f3c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CommerceOrderDisplayStateEnum = "ABANDONED" | "APPROVED" | "CANCELED" | "FULFILLED" | "IN_TRANSIT" | "PENDING" | "PROCESSING" | "PROCESSING_APPROVAL" | "REFUNDED" | "SUBMITTED" | "%future added value";
export type CommerceOrderModeEnum = "BUY" | "OFFER" | "%future added value";
export type CommerceOrderParticipantEnum = "BUYER" | "SELLER" | "%future added value";
export type CommerceOrderSourceEnum = "artwork_page" | "inquiry" | "partner_offer" | "private_sale" | "%future added value";
export type Shipping2TestQuery$variables = Record<PropertyKey, never>;
export type Shipping2TestQuery$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"Shipping2_me">;
  } | null | undefined;
  readonly order: {
    readonly " $fragmentSpreads": FragmentRefs<"Shipping2_order">;
  } | null | undefined;
};
export type Shipping2TestQuery$rawResponse = {
  readonly me: {
    readonly addressConnection: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly addressLine1: string;
          readonly addressLine2: string | null | undefined;
          readonly addressLine3: string | null | undefined;
          readonly city: string;
          readonly country: string;
          readonly id: string;
          readonly internalID: string;
          readonly isDefault: boolean;
          readonly name: string | null | undefined;
          readonly phoneNumber: string | null | undefined;
          readonly postalCode: string | null | undefined;
          readonly region: string | null | undefined;
        } | null | undefined;
      } | null | undefined> | null | undefined;
      readonly totalCount: number;
    } | null | undefined;
    readonly email: string | null | undefined;
    readonly id: string;
    readonly location: {
      readonly country: string | null | undefined;
      readonly id: string;
    } | null | undefined;
    readonly name: string | null | undefined;
  } | null | undefined;
  readonly order: {
    readonly __typename: "CommerceOfferOrder";
    readonly __isCommerceOrder: "CommerceOfferOrder";
    readonly buyerTotal: string | null | undefined;
    readonly code: string;
    readonly currencyCode: string;
    readonly displayState: CommerceOrderDisplayStateEnum;
    readonly id: string;
    readonly internalID: string;
    readonly itemsTotal: string | null | undefined;
    readonly lastOffer: {
      readonly amount: string | null | undefined;
      readonly amountCents: number;
      readonly buyerTotal: string | null | undefined;
      readonly buyerTotalCents: number | null | undefined;
      readonly fromParticipant: CommerceOrderParticipantEnum | null | undefined;
      readonly id: string;
      readonly internalID: string;
      readonly note: string | null | undefined;
      readonly shippingTotal: string | null | undefined;
      readonly shippingTotalCents: number | null | undefined;
      readonly taxTotal: string | null | undefined;
      readonly taxTotalCents: number | null | undefined;
    } | null | undefined;
    readonly lineItems: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly artwork: {
            readonly artsyShippingInternational: boolean | null | undefined;
            readonly euShippingOrigin: boolean | null | undefined;
            readonly id: string;
            readonly isUnlisted: boolean;
            readonly onlyShipsDomestically: boolean | null | undefined;
            readonly pickupAvailable: boolean | null | undefined;
            readonly processWithArtsyShippingDomestic: boolean | null | undefined;
            readonly shippingCountry: string | null | undefined;
            readonly shippingOrigin: string | null | undefined;
            readonly slug: string;
          } | null | undefined;
          readonly artworkOrEditionSet: {
            readonly __typename: "Artwork";
            readonly __isNode: "Artwork";
            readonly id: string;
            readonly price: string | null | undefined;
          } | {
            readonly __typename: "EditionSet";
            readonly __isNode: "EditionSet";
            readonly id: string;
            readonly price: string | null | undefined;
          } | {
            readonly __typename: string;
            readonly __isNode: string;
            readonly id: string;
          } | null | undefined;
          readonly artworkVersion: {
            readonly artistNames: string | null | undefined;
            readonly date: string | null | undefined;
            readonly id: string;
            readonly image: {
              readonly resized_ArtworkSummaryItem: {
                readonly url: string;
              } | null | undefined;
            } | null | undefined;
            readonly title: string | null | undefined;
          } | null | undefined;
          readonly id: string;
          readonly selectedShippingQuote: {
            readonly id: string;
            readonly typeName: string;
          } | null | undefined;
          readonly shippingQuoteOptions: {
            readonly edges: ReadonlyArray<{
              readonly node: {
                readonly id: string;
                readonly isSelected: boolean;
                readonly price: string | null | undefined;
                readonly priceCents: number;
                readonly typeName: string;
              } | null | undefined;
            } | null | undefined> | null | undefined;
          } | null | undefined;
        } | null | undefined;
      } | null | undefined> | null | undefined;
    } | null | undefined;
    readonly mode: CommerceOrderModeEnum | null | undefined;
    readonly myLastOffer: {
      readonly amount: string | null | undefined;
      readonly amountCents: number;
      readonly buyerTotal: string | null | undefined;
      readonly buyerTotalCents: number | null | undefined;
      readonly fromParticipant: CommerceOrderParticipantEnum | null | undefined;
      readonly id: string;
      readonly internalID: string;
      readonly note: string | null | undefined;
      readonly shippingTotal: string | null | undefined;
      readonly shippingTotalCents: number | null | undefined;
      readonly taxTotal: string | null | undefined;
      readonly taxTotalCents: number | null | undefined;
    } | null | undefined;
    readonly paymentMethodDetails: {
      readonly __typename: "BankAccount";
      readonly id: string;
    } | {
      readonly __typename: "CreditCard";
      readonly id: string;
    } | {
      readonly __typename: "WireTransfer";
      readonly isManualPayment: boolean;
    } | {
      readonly __typename: string;
    } | null | undefined;
    readonly requestedFulfillment: {
      readonly __typename: "CommercePickup";
      readonly phoneNumber: string | null | undefined;
    } | {
      readonly __typename: "CommerceShip";
      readonly addressLine1: string | null | undefined;
      readonly addressLine2: string | null | undefined;
      readonly city: string | null | undefined;
      readonly country: string | null | undefined;
      readonly name: string | null | undefined;
      readonly phoneNumber: string | null | undefined;
      readonly postalCode: string | null | undefined;
      readonly region: string | null | undefined;
    } | {
      readonly __typename: "CommerceShipArta";
      readonly addressLine1: string | null | undefined;
      readonly addressLine2: string | null | undefined;
      readonly city: string | null | undefined;
      readonly country: string | null | undefined;
      readonly name: string | null | undefined;
      readonly phoneNumber: string | null | undefined;
      readonly postalCode: string | null | undefined;
      readonly region: string | null | undefined;
    } | {
      readonly __typename: string;
    } | null | undefined;
    readonly sellerDetails: {
      readonly __typename: "Partner";
      readonly __isNode: "Partner";
      readonly id: string;
      readonly name: string | null | undefined;
    } | {
      readonly __typename: string;
      readonly __isNode: string;
      readonly id: string;
    } | null | undefined;
    readonly shippingTotal: string | null | undefined;
    readonly shippingTotalCents: number | null | undefined;
    readonly source: CommerceOrderSourceEnum;
    readonly taxTotal: string | null | undefined;
    readonly taxTotalCents: number | null | undefined;
  } | {
    readonly __typename: string;
    readonly __isCommerceOrder: string;
    readonly buyerTotal: string | null | undefined;
    readonly code: string;
    readonly currencyCode: string;
    readonly displayState: CommerceOrderDisplayStateEnum;
    readonly id: string;
    readonly internalID: string;
    readonly itemsTotal: string | null | undefined;
    readonly lineItems: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly artwork: {
            readonly artsyShippingInternational: boolean | null | undefined;
            readonly euShippingOrigin: boolean | null | undefined;
            readonly id: string;
            readonly isUnlisted: boolean;
            readonly onlyShipsDomestically: boolean | null | undefined;
            readonly pickupAvailable: boolean | null | undefined;
            readonly processWithArtsyShippingDomestic: boolean | null | undefined;
            readonly shippingCountry: string | null | undefined;
            readonly shippingOrigin: string | null | undefined;
            readonly slug: string;
          } | null | undefined;
          readonly artworkOrEditionSet: {
            readonly __typename: "Artwork";
            readonly __isNode: "Artwork";
            readonly id: string;
            readonly price: string | null | undefined;
          } | {
            readonly __typename: "EditionSet";
            readonly __isNode: "EditionSet";
            readonly id: string;
            readonly price: string | null | undefined;
          } | {
            readonly __typename: string;
            readonly __isNode: string;
            readonly id: string;
          } | null | undefined;
          readonly artworkVersion: {
            readonly artistNames: string | null | undefined;
            readonly date: string | null | undefined;
            readonly id: string;
            readonly image: {
              readonly resized_ArtworkSummaryItem: {
                readonly url: string;
              } | null | undefined;
            } | null | undefined;
            readonly title: string | null | undefined;
          } | null | undefined;
          readonly id: string;
          readonly selectedShippingQuote: {
            readonly id: string;
            readonly typeName: string;
          } | null | undefined;
          readonly shippingQuoteOptions: {
            readonly edges: ReadonlyArray<{
              readonly node: {
                readonly id: string;
                readonly isSelected: boolean;
                readonly price: string | null | undefined;
                readonly priceCents: number;
                readonly typeName: string;
              } | null | undefined;
            } | null | undefined> | null | undefined;
          } | null | undefined;
        } | null | undefined;
      } | null | undefined> | null | undefined;
    } | null | undefined;
    readonly mode: CommerceOrderModeEnum | null | undefined;
    readonly paymentMethodDetails: {
      readonly __typename: "BankAccount";
      readonly id: string;
    } | {
      readonly __typename: "CreditCard";
      readonly id: string;
    } | {
      readonly __typename: "WireTransfer";
      readonly isManualPayment: boolean;
    } | {
      readonly __typename: string;
    } | null | undefined;
    readonly requestedFulfillment: {
      readonly __typename: "CommercePickup";
      readonly phoneNumber: string | null | undefined;
    } | {
      readonly __typename: "CommerceShip";
      readonly addressLine1: string | null | undefined;
      readonly addressLine2: string | null | undefined;
      readonly city: string | null | undefined;
      readonly country: string | null | undefined;
      readonly name: string | null | undefined;
      readonly phoneNumber: string | null | undefined;
      readonly postalCode: string | null | undefined;
      readonly region: string | null | undefined;
    } | {
      readonly __typename: "CommerceShipArta";
      readonly addressLine1: string | null | undefined;
      readonly addressLine2: string | null | undefined;
      readonly city: string | null | undefined;
      readonly country: string | null | undefined;
      readonly name: string | null | undefined;
      readonly phoneNumber: string | null | undefined;
      readonly postalCode: string | null | undefined;
      readonly region: string | null | undefined;
    } | {
      readonly __typename: string;
    } | null | undefined;
    readonly sellerDetails: {
      readonly __typename: "Partner";
      readonly __isNode: "Partner";
      readonly id: string;
      readonly name: string | null | undefined;
    } | {
      readonly __typename: string;
      readonly __isNode: string;
      readonly id: string;
    } | null | undefined;
    readonly shippingTotal: string | null | undefined;
    readonly shippingTotalCents: number | null | undefined;
    readonly source: CommerceOrderSourceEnum;
    readonly taxTotal: string | null | undefined;
    readonly taxTotalCents: number | null | undefined;
  } | null | undefined;
};
export type Shipping2TestQuery = {
  rawResponse: Shipping2TestQuery$rawResponse;
  response: Shipping2TestQuery$data;
  variables: Shipping2TestQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "unused"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
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
  "name": "phoneNumber",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "addressLine1",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "addressLine2",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "city",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "region",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "country",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "postalCode",
  "storageKey": null
},
v11 = [
  (v4/*: any*/),
  (v5/*: any*/),
  (v6/*: any*/),
  (v7/*: any*/),
  (v8/*: any*/),
  (v9/*: any*/),
  (v10/*: any*/),
  (v3/*: any*/)
],
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v13 = [
  {
    "kind": "Literal",
    "name": "precision",
    "value": 2
  }
],
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "typeName",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "price",
  "storageKey": null
},
v16 = [
  (v12/*: any*/)
],
v17 = {
  "kind": "InlineFragment",
  "selections": (v16/*: any*/),
  "type": "Node",
  "abstractKey": "__isNode"
},
v18 = {
  "alias": null,
  "args": (v13/*: any*/),
  "kind": "ScalarField",
  "name": "shippingTotal",
  "storageKey": "shippingTotal(precision:2)"
},
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "shippingTotalCents",
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": (v13/*: any*/),
  "kind": "ScalarField",
  "name": "taxTotal",
  "storageKey": "taxTotal(precision:2)"
},
v21 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "taxTotalCents",
  "storageKey": null
},
v22 = {
  "alias": null,
  "args": (v13/*: any*/),
  "kind": "ScalarField",
  "name": "buyerTotal",
  "storageKey": "buyerTotal(precision:2)"
},
v23 = [
  (v2/*: any*/),
  {
    "alias": null,
    "args": (v13/*: any*/),
    "kind": "ScalarField",
    "name": "amount",
    "storageKey": "amount(precision:2)"
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "amountCents",
    "storageKey": null
  },
  (v18/*: any*/),
  (v19/*: any*/),
  (v20/*: any*/),
  (v21/*: any*/),
  (v22/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "buyerTotalCents",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "fromParticipant",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "note",
    "storageKey": null
  },
  (v12/*: any*/)
],
v24 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v25 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v26 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v27 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Boolean"
},
v28 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
},
v29 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CommerceOffer"
},
v30 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
},
v31 = {
  "enumValues": [
    "BUYER",
    "SELLER"
  ],
  "nullable": true,
  "plural": false,
  "type": "CommerceOrderParticipantEnum"
},
v32 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
},
v33 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CommerceShippingQuote"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "Shipping2TestQuery",
    "selections": [
      {
        "alias": "order",
        "args": (v0/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "commerceOrder",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Shipping2_order"
          }
        ],
        "storageKey": "commerceOrder(id:\"unused\")"
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Shipping2_me"
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
    "name": "Shipping2TestQuery",
    "selections": [
      {
        "alias": "order",
        "args": (v0/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "commerceOrder",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          {
            "kind": "TypeDiscriminator",
            "abstractKey": "__isCommerceOrder"
          },
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "requestedFulfillment",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  (v3/*: any*/)
                ],
                "type": "CommercePickup",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": (v11/*: any*/),
                "type": "CommerceShip",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": (v11/*: any*/),
                "type": "CommerceShipArta",
                "abstractKey": null
              }
            ],
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
                        "concreteType": "CommerceShippingQuoteConnection",
                        "kind": "LinkedField",
                        "name": "shippingQuoteOptions",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "CommerceShippingQuoteEdge",
                            "kind": "LinkedField",
                            "name": "edges",
                            "plural": true,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "CommerceShippingQuote",
                                "kind": "LinkedField",
                                "name": "node",
                                "plural": false,
                                "selections": [
                                  (v12/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "isSelected",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": (v13/*: any*/),
                                    "kind": "ScalarField",
                                    "name": "price",
                                    "storageKey": "price(precision:2)"
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "priceCents",
                                    "storageKey": null
                                  },
                                  (v14/*: any*/)
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
                        "alias": null,
                        "args": null,
                        "concreteType": "Artwork",
                        "kind": "LinkedField",
                        "name": "artwork",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "processWithArtsyShippingDomestic",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "artsyShippingInternational",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "onlyShipsDomestically",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "euShippingOrigin",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "shippingCountry",
                            "storageKey": null
                          },
                          (v12/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "pickupAvailable",
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
                            "name": "shippingOrigin",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isUnlisted",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      (v12/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": null,
                        "kind": "LinkedField",
                        "name": "artworkOrEditionSet",
                        "plural": false,
                        "selections": [
                          (v1/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v15/*: any*/)
                            ],
                            "type": "Artwork",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v15/*: any*/),
                              (v12/*: any*/)
                            ],
                            "type": "EditionSet",
                            "abstractKey": null
                          },
                          (v17/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "ArtworkVersion",
                        "kind": "LinkedField",
                        "name": "artworkVersion",
                        "plural": false,
                        "selections": [
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
                            "concreteType": "Image",
                            "kind": "LinkedField",
                            "name": "image",
                            "plural": false,
                            "selections": [
                              {
                                "alias": "resized_ArtworkSummaryItem",
                                "args": [
                                  {
                                    "kind": "Literal",
                                    "name": "width",
                                    "value": 55
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
                                  }
                                ],
                                "storageKey": "resized(width:55)"
                              }
                            ],
                            "storageKey": null
                          },
                          (v12/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "CommerceShippingQuote",
                        "kind": "LinkedField",
                        "name": "selectedShippingQuote",
                        "plural": false,
                        "selections": [
                          (v14/*: any*/),
                          (v12/*: any*/)
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
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "sellerDetails",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  (v4/*: any*/)
                ],
                "type": "Partner",
                "abstractKey": null
              },
              (v17/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "currencyCode",
            "storageKey": null
          },
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
            "kind": "ScalarField",
            "name": "source",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "code",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "displayState",
            "storageKey": null
          },
          (v18/*: any*/),
          (v19/*: any*/),
          (v20/*: any*/),
          (v21/*: any*/),
          {
            "alias": null,
            "args": (v13/*: any*/),
            "kind": "ScalarField",
            "name": "itemsTotal",
            "storageKey": "itemsTotal(precision:2)"
          },
          (v22/*: any*/),
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
                "selections": (v23/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "CommerceOffer",
                "kind": "LinkedField",
                "name": "myLastOffer",
                "plural": false,
                "selections": (v23/*: any*/),
                "storageKey": null
              }
            ],
            "type": "CommerceOfferOrder",
            "abstractKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "paymentMethodDetails",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": (v16/*: any*/),
                "type": "CreditCard",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": (v16/*: any*/),
                "type": "BankAccount",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isManualPayment",
                    "storageKey": null
                  }
                ],
                "type": "WireTransfer",
                "abstractKey": null
              }
            ],
            "storageKey": null
          },
          (v12/*: any*/)
        ],
        "storageKey": "commerceOrder(id:\"unused\")"
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "email",
            "storageKey": null
          },
          (v12/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "MyLocation",
            "kind": "LinkedField",
            "name": "location",
            "plural": false,
            "selections": [
              (v9/*: any*/),
              (v12/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 30
              }
            ],
            "concreteType": "UserAddressConnection",
            "kind": "LinkedField",
            "name": "addressConnection",
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
                "concreteType": "UserAddressEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "UserAddress",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v12/*: any*/),
                      (v2/*: any*/),
                      (v5/*: any*/),
                      (v6/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "addressLine3",
                        "storageKey": null
                      },
                      (v7/*: any*/),
                      (v9/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isDefault",
                        "storageKey": null
                      },
                      (v4/*: any*/),
                      (v3/*: any*/),
                      (v10/*: any*/),
                      (v8/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "addressConnection(first:30)"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "a544441700a8b3d5ec6cc7a549c6a83a",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
        },
        "me.addressConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "UserAddressConnection"
        },
        "me.addressConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "UserAddressEdge"
        },
        "me.addressConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "UserAddress"
        },
        "me.addressConnection.edges.node.addressLine1": (v24/*: any*/),
        "me.addressConnection.edges.node.addressLine2": (v25/*: any*/),
        "me.addressConnection.edges.node.addressLine3": (v25/*: any*/),
        "me.addressConnection.edges.node.city": (v24/*: any*/),
        "me.addressConnection.edges.node.country": (v24/*: any*/),
        "me.addressConnection.edges.node.id": (v26/*: any*/),
        "me.addressConnection.edges.node.internalID": (v26/*: any*/),
        "me.addressConnection.edges.node.isDefault": (v27/*: any*/),
        "me.addressConnection.edges.node.name": (v25/*: any*/),
        "me.addressConnection.edges.node.phoneNumber": (v25/*: any*/),
        "me.addressConnection.edges.node.postalCode": (v25/*: any*/),
        "me.addressConnection.edges.node.region": (v25/*: any*/),
        "me.addressConnection.totalCount": (v28/*: any*/),
        "me.email": (v25/*: any*/),
        "me.id": (v26/*: any*/),
        "me.location": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "MyLocation"
        },
        "me.location.country": (v25/*: any*/),
        "me.location.id": (v26/*: any*/),
        "me.name": (v25/*: any*/),
        "order": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CommerceOrder"
        },
        "order.__isCommerceOrder": (v24/*: any*/),
        "order.__typename": (v24/*: any*/),
        "order.buyerTotal": (v25/*: any*/),
        "order.code": (v24/*: any*/),
        "order.currencyCode": (v24/*: any*/),
        "order.displayState": {
          "enumValues": [
            "ABANDONED",
            "APPROVED",
            "CANCELED",
            "FULFILLED",
            "IN_TRANSIT",
            "PENDING",
            "PROCESSING",
            "PROCESSING_APPROVAL",
            "REFUNDED",
            "SUBMITTED"
          ],
          "nullable": false,
          "plural": false,
          "type": "CommerceOrderDisplayStateEnum"
        },
        "order.id": (v26/*: any*/),
        "order.internalID": (v26/*: any*/),
        "order.itemsTotal": (v25/*: any*/),
        "order.lastOffer": (v29/*: any*/),
        "order.lastOffer.amount": (v25/*: any*/),
        "order.lastOffer.amountCents": (v28/*: any*/),
        "order.lastOffer.buyerTotal": (v25/*: any*/),
        "order.lastOffer.buyerTotalCents": (v30/*: any*/),
        "order.lastOffer.fromParticipant": (v31/*: any*/),
        "order.lastOffer.id": (v26/*: any*/),
        "order.lastOffer.internalID": (v26/*: any*/),
        "order.lastOffer.note": (v25/*: any*/),
        "order.lastOffer.shippingTotal": (v25/*: any*/),
        "order.lastOffer.shippingTotalCents": (v30/*: any*/),
        "order.lastOffer.taxTotal": (v25/*: any*/),
        "order.lastOffer.taxTotalCents": (v30/*: any*/),
        "order.lineItems": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CommerceLineItemConnection"
        },
        "order.lineItems.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "CommerceLineItemEdge"
        },
        "order.lineItems.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CommerceLineItem"
        },
        "order.lineItems.edges.node.artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "order.lineItems.edges.node.artwork.artsyShippingInternational": (v32/*: any*/),
        "order.lineItems.edges.node.artwork.euShippingOrigin": (v32/*: any*/),
        "order.lineItems.edges.node.artwork.id": (v26/*: any*/),
        "order.lineItems.edges.node.artwork.isUnlisted": (v27/*: any*/),
        "order.lineItems.edges.node.artwork.onlyShipsDomestically": (v32/*: any*/),
        "order.lineItems.edges.node.artwork.pickupAvailable": (v32/*: any*/),
        "order.lineItems.edges.node.artwork.processWithArtsyShippingDomestic": (v32/*: any*/),
        "order.lineItems.edges.node.artwork.shippingCountry": (v25/*: any*/),
        "order.lineItems.edges.node.artwork.shippingOrigin": (v25/*: any*/),
        "order.lineItems.edges.node.artwork.slug": (v26/*: any*/),
        "order.lineItems.edges.node.artworkOrEditionSet": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkOrEditionSetType"
        },
        "order.lineItems.edges.node.artworkOrEditionSet.__isNode": (v24/*: any*/),
        "order.lineItems.edges.node.artworkOrEditionSet.__typename": (v24/*: any*/),
        "order.lineItems.edges.node.artworkOrEditionSet.id": (v26/*: any*/),
        "order.lineItems.edges.node.artworkOrEditionSet.price": (v25/*: any*/),
        "order.lineItems.edges.node.artworkVersion": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkVersion"
        },
        "order.lineItems.edges.node.artworkVersion.artistNames": (v25/*: any*/),
        "order.lineItems.edges.node.artworkVersion.date": (v25/*: any*/),
        "order.lineItems.edges.node.artworkVersion.id": (v26/*: any*/),
        "order.lineItems.edges.node.artworkVersion.image": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "order.lineItems.edges.node.artworkVersion.image.resized_ArtworkSummaryItem": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ResizedImageUrl"
        },
        "order.lineItems.edges.node.artworkVersion.image.resized_ArtworkSummaryItem.url": (v24/*: any*/),
        "order.lineItems.edges.node.artworkVersion.title": (v25/*: any*/),
        "order.lineItems.edges.node.id": (v26/*: any*/),
        "order.lineItems.edges.node.selectedShippingQuote": (v33/*: any*/),
        "order.lineItems.edges.node.selectedShippingQuote.id": (v26/*: any*/),
        "order.lineItems.edges.node.selectedShippingQuote.typeName": (v24/*: any*/),
        "order.lineItems.edges.node.shippingQuoteOptions": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CommerceShippingQuoteConnection"
        },
        "order.lineItems.edges.node.shippingQuoteOptions.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "CommerceShippingQuoteEdge"
        },
        "order.lineItems.edges.node.shippingQuoteOptions.edges.node": (v33/*: any*/),
        "order.lineItems.edges.node.shippingQuoteOptions.edges.node.id": (v26/*: any*/),
        "order.lineItems.edges.node.shippingQuoteOptions.edges.node.isSelected": (v27/*: any*/),
        "order.lineItems.edges.node.shippingQuoteOptions.edges.node.price": (v25/*: any*/),
        "order.lineItems.edges.node.shippingQuoteOptions.edges.node.priceCents": (v28/*: any*/),
        "order.lineItems.edges.node.shippingQuoteOptions.edges.node.typeName": (v24/*: any*/),
        "order.mode": {
          "enumValues": [
            "BUY",
            "OFFER"
          ],
          "nullable": true,
          "plural": false,
          "type": "CommerceOrderModeEnum"
        },
        "order.myLastOffer": (v29/*: any*/),
        "order.myLastOffer.amount": (v25/*: any*/),
        "order.myLastOffer.amountCents": (v28/*: any*/),
        "order.myLastOffer.buyerTotal": (v25/*: any*/),
        "order.myLastOffer.buyerTotalCents": (v30/*: any*/),
        "order.myLastOffer.fromParticipant": (v31/*: any*/),
        "order.myLastOffer.id": (v26/*: any*/),
        "order.myLastOffer.internalID": (v26/*: any*/),
        "order.myLastOffer.note": (v25/*: any*/),
        "order.myLastOffer.shippingTotal": (v25/*: any*/),
        "order.myLastOffer.shippingTotalCents": (v30/*: any*/),
        "order.myLastOffer.taxTotal": (v25/*: any*/),
        "order.myLastOffer.taxTotalCents": (v30/*: any*/),
        "order.paymentMethodDetails": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "PaymentMethodUnion"
        },
        "order.paymentMethodDetails.__typename": (v24/*: any*/),
        "order.paymentMethodDetails.id": (v26/*: any*/),
        "order.paymentMethodDetails.isManualPayment": (v27/*: any*/),
        "order.requestedFulfillment": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CommerceRequestedFulfillmentUnion"
        },
        "order.requestedFulfillment.__typename": (v24/*: any*/),
        "order.requestedFulfillment.addressLine1": (v25/*: any*/),
        "order.requestedFulfillment.addressLine2": (v25/*: any*/),
        "order.requestedFulfillment.city": (v25/*: any*/),
        "order.requestedFulfillment.country": (v25/*: any*/),
        "order.requestedFulfillment.name": (v25/*: any*/),
        "order.requestedFulfillment.phoneNumber": (v25/*: any*/),
        "order.requestedFulfillment.postalCode": (v25/*: any*/),
        "order.requestedFulfillment.region": (v25/*: any*/),
        "order.sellerDetails": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "OrderParty"
        },
        "order.sellerDetails.__isNode": (v24/*: any*/),
        "order.sellerDetails.__typename": (v24/*: any*/),
        "order.sellerDetails.id": (v26/*: any*/),
        "order.sellerDetails.name": (v25/*: any*/),
        "order.shippingTotal": (v25/*: any*/),
        "order.shippingTotalCents": (v30/*: any*/),
        "order.source": {
          "enumValues": [
            "artwork_page",
            "inquiry",
            "partner_offer",
            "private_sale"
          ],
          "nullable": false,
          "plural": false,
          "type": "CommerceOrderSourceEnum"
        },
        "order.taxTotal": (v25/*: any*/),
        "order.taxTotalCents": (v30/*: any*/)
      }
    },
    "name": "Shipping2TestQuery",
    "operationKind": "query",
    "text": "query Shipping2TestQuery {\n  order: commerceOrder(id: \"unused\") {\n    __typename\n    ...Shipping2_order\n    id\n  }\n  me {\n    ...Shipping2_me\n    id\n  }\n}\n\nfragment ArtworkSummaryItem_order on CommerceOrder {\n  __isCommerceOrder: __typename\n  sellerDetails {\n    __typename\n    ... on Partner {\n      name\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n  currencyCode\n  mode\n  source\n  lineItems {\n    edges {\n      node {\n        artworkOrEditionSet {\n          __typename\n          ... on Artwork {\n            price\n          }\n          ... on EditionSet {\n            price\n            id\n          }\n          ... on Node {\n            __isNode: __typename\n            id\n          }\n        }\n        artwork {\n          slug\n          shippingOrigin\n          isUnlisted\n          id\n        }\n        artworkVersion {\n          date\n          artistNames\n          title\n          image {\n            resized_ArtworkSummaryItem: resized(width: 55) {\n              url\n            }\n          }\n          id\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment FulfillmentDetailsForm_me on Me {\n  name\n  email\n  id\n  location {\n    country\n    id\n  }\n  addressConnection(first: 30) {\n    totalCount\n  }\n}\n\nfragment FulfillmentDetailsForm_order on CommerceOrder {\n  __isCommerceOrder: __typename\n  internalID\n  lineItems {\n    edges {\n      node {\n        artwork {\n          pickupAvailable\n          id\n        }\n        id\n      }\n    }\n  }\n  ...ArtworkSummaryItem_order\n  ...TransactionDetailsSummaryItem_order\n  ...OrderStepper_order\n}\n\nfragment OrderStepper_order on CommerceOrder {\n  __isCommerceOrder: __typename\n  mode\n  requestedFulfillment {\n    __typename\n  }\n  paymentMethodDetails {\n    __typename\n    ... on CreditCard {\n      id\n    }\n    ... on BankAccount {\n      id\n    }\n    ... on WireTransfer {\n      isManualPayment\n    }\n  }\n  lineItems {\n    edges {\n      node {\n        artwork {\n          slug\n          id\n        }\n        shippingQuoteOptions {\n          edges {\n            node {\n              isSelected\n              id\n            }\n          }\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment SaveAndContinueButton_order on CommerceOrder {\n  __isCommerceOrder: __typename\n  internalID\n}\n\nfragment Shipping2_me on Me {\n  ...FulfillmentDetailsForm_me\n  ...ShippingContext_me_dXEtb\n}\n\nfragment Shipping2_order on CommerceOrder {\n  __isCommerceOrder: __typename\n  ...ShippingContext_order\n  ...FulfillmentDetailsForm_order\n  ...SaveAndContinueButton_order\n  ...ArtworkSummaryItem_order\n  ...TransactionDetailsSummaryItem_order\n  ...OrderStepper_order\n  mode\n  internalID\n  lineItems {\n    edges {\n      node {\n        ...ShippingQuotes2_commerceLineItem\n        id\n      }\n    }\n  }\n}\n\nfragment ShippingContext_me_dXEtb on Me {\n  addressConnection(first: 30) {\n    edges {\n      node {\n        id\n        internalID\n        addressLine1\n        addressLine2\n        addressLine3\n        city\n        country\n        isDefault\n        name\n        phoneNumber\n        postalCode\n        region\n      }\n    }\n  }\n}\n\nfragment ShippingContext_order on CommerceOrder {\n  __isCommerceOrder: __typename\n  internalID\n  requestedFulfillment {\n    __typename\n    ... on CommercePickup {\n      phoneNumber\n    }\n    ... on CommerceShip {\n      name\n      addressLine1\n      addressLine2\n      city\n      region\n      country\n      postalCode\n      phoneNumber\n    }\n    ... on CommerceShipArta {\n      name\n      addressLine1\n      addressLine2\n      city\n      region\n      country\n      postalCode\n      phoneNumber\n    }\n  }\n  lineItems {\n    edges {\n      node {\n        shippingQuoteOptions {\n          edges {\n            node {\n              id\n              isSelected\n            }\n          }\n        }\n        artwork {\n          processWithArtsyShippingDomestic\n          artsyShippingInternational\n          onlyShipsDomestically\n          euShippingOrigin\n          shippingCountry\n          id\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment ShippingQuotes2_commerceLineItem on CommerceLineItem {\n  shippingQuoteOptions {\n    edges {\n      node {\n        id\n        isSelected\n        price(precision: 2)\n        priceCents\n        typeName\n      }\n    }\n  }\n}\n\nfragment TransactionDetailsSummaryItem_order on CommerceOrder {\n  __isCommerceOrder: __typename\n  __typename\n  requestedFulfillment {\n    __typename\n  }\n  code\n  lineItems {\n    edges {\n      node {\n        artworkOrEditionSet {\n          __typename\n          ... on Artwork {\n            price\n          }\n          ... on EditionSet {\n            price\n            id\n          }\n          ... on Node {\n            __isNode: __typename\n            id\n          }\n        }\n        selectedShippingQuote {\n          typeName\n          id\n        }\n        id\n      }\n    }\n  }\n  mode\n  source\n  displayState\n  shippingTotal(precision: 2)\n  shippingTotalCents\n  taxTotal(precision: 2)\n  taxTotalCents\n  itemsTotal(precision: 2)\n  buyerTotal(precision: 2)\n  currencyCode\n  ... on CommerceOfferOrder {\n    lastOffer {\n      internalID\n      amount(precision: 2)\n      amountCents\n      shippingTotal(precision: 2)\n      shippingTotalCents\n      taxTotal(precision: 2)\n      taxTotalCents\n      buyerTotal(precision: 2)\n      buyerTotalCents\n      fromParticipant\n      note\n      id\n    }\n    myLastOffer {\n      internalID\n      amount(precision: 2)\n      amountCents\n      shippingTotal(precision: 2)\n      shippingTotalCents\n      taxTotal(precision: 2)\n      taxTotalCents\n      buyerTotal(precision: 2)\n      buyerTotalCents\n      fromParticipant\n      note\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "a133155038ad3cbf6aa5caf791cc38bd";

export default node;
