/**
 * @generated SignedSource<<06d63dff2a9577cc233bb083e5b401e3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkConsignmentSubmissionState = "APPROVED" | "CLOSED" | "DRAFT" | "HOLD" | "PUBLISHED" | "REJECTED" | "RESUBMITTED" | "SUBMITTED" | "%future added value";
export type LabelSignalEnum = "CURATORS_PICK" | "INCREASED_INTEREST" | "PARTNER_OFFER" | "%future added value";
export type Details_Test_Query$variables = {
  includeConsignmentSubmission: boolean;
};
export type Details_Test_Query$data = {
  readonly artwork: {
    readonly " $fragmentSpreads": FragmentRefs<"Details_artwork">;
  } | null | undefined;
};
export type Details_Test_Query$rawResponse = {
  readonly artwork: {
    readonly artist: {
      readonly id: string;
      readonly targetSupply: {
        readonly isP1: boolean | null | undefined;
      };
    } | null | undefined;
    readonly artists: ReadonlyArray<{
      readonly href: string | null | undefined;
      readonly id: string;
      readonly name: string | null | undefined;
    } | null | undefined> | null | undefined;
    readonly attributionClass: {
      readonly id: string;
      readonly name: string | null | undefined;
    } | null | undefined;
    readonly collectingInstitution: string | null | undefined;
    readonly collectorSignals: {
      readonly auction: {
        readonly bidCount: number;
        readonly liveBiddingStarted: boolean;
        readonly lotClosesAt: string | null | undefined;
        readonly onlineBiddingExtended: boolean;
        readonly registrationEndsAt: string | null | undefined;
      } | null | undefined;
      readonly partnerOffer: {
        readonly endAt: string | null | undefined;
        readonly id: string;
        readonly priceWithDiscount: {
          readonly display: string | null | undefined;
        } | null | undefined;
      } | null | undefined;
      readonly primaryLabel: LabelSignalEnum | null | undefined;
    } | null | undefined;
    readonly consignmentSubmission: {
      readonly actionLabel: string | null | undefined;
      readonly internalID: string | null | undefined;
      readonly state: ArtworkConsignmentSubmissionState;
      readonly stateLabel: string | null | undefined;
      readonly stateLabelColor: string | null | undefined;
    } | null | undefined;
    readonly culturalMaker: string | null | undefined;
    readonly date: string | null | undefined;
    readonly href: string | null | undefined;
    readonly id: string;
    readonly internalID: string;
    readonly isListed: boolean;
    readonly marketPriceInsights: {
      readonly demandRank: number | null | undefined;
    } | null | undefined;
    readonly mediumType: {
      readonly filterGene: {
        readonly id: string;
        readonly name: string | null | undefined;
      } | null | undefined;
    } | null | undefined;
    readonly partner: {
      readonly href: string | null | undefined;
      readonly id: string;
      readonly name: string | null | undefined;
    } | null | undefined;
    readonly sale: {
      readonly cascadingEndTimeIntervalMinutes: number | null | undefined;
      readonly endAt: string | null | undefined;
      readonly extendedBiddingIntervalMinutes: number | null | undefined;
      readonly id: string;
      readonly isAuction: boolean | null | undefined;
      readonly isClosed: boolean | null | undefined;
      readonly startAt: string | null | undefined;
    } | null | undefined;
    readonly saleArtwork: {
      readonly counts: {
        readonly bidderPositions: any | null | undefined;
      } | null | undefined;
      readonly endAt: string | null | undefined;
      readonly extendedBiddingEndAt: string | null | undefined;
      readonly formattedEndDateTime: string | null | undefined;
      readonly highestBid: {
        readonly display: string | null | undefined;
      } | null | undefined;
      readonly id: string;
      readonly lotID: string | null | undefined;
      readonly lotLabel: string | null | undefined;
      readonly openingBid: {
        readonly display: string | null | undefined;
      } | null | undefined;
    } | null | undefined;
    readonly saleMessage: string | null | undefined;
    readonly title: string | null | undefined;
  } | null | undefined;
};
export type Details_Test_Query = {
  rawResponse: Details_Test_Query$rawResponse;
  response: Details_Test_Query$data;
  variables: Details_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "includeConsignmentSubmission"
  }
],
v1 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "gerhard-richter-bagdad-ii-flow-p10-1"
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
  "name": "href",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "endAt",
  "storageKey": null
},
v5 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v7 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v9 = [
  (v8/*: any*/),
  (v6/*: any*/)
],
v10 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v11 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
},
v12 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v13 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Boolean"
},
v14 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "Details_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "args": [
              {
                "kind": "Literal",
                "name": "ignorePrimaryLabelSignals",
                "value": []
              },
              {
                "kind": "Variable",
                "name": "includeConsignmentSubmission",
                "variableName": "includeConsignmentSubmission"
              }
            ],
            "kind": "FragmentSpread",
            "name": "Details_artwork"
          }
        ],
        "storageKey": "artwork(id:\"gerhard-richter-bagdad-ii-flow-p10-1\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "Details_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
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
            "concreteType": "CollectorSignals",
            "kind": "LinkedField",
            "name": "collectorSignals",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": [
                  {
                    "kind": "Literal",
                    "name": "ignore",
                    "value": []
                  }
                ],
                "kind": "ScalarField",
                "name": "primaryLabel",
                "storageKey": "primaryLabel(ignore:[])"
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "AuctionCollectorSignals",
                "kind": "LinkedField",
                "name": "auction",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "bidCount",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "lotClosesAt",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "liveBiddingStarted",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "registrationEndsAt",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "onlineBiddingExtended",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "PartnerOfferToCollector",
                "kind": "LinkedField",
                "name": "partnerOffer",
                "plural": false,
                "selections": [
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Money",
                    "kind": "LinkedField",
                    "name": "priceWithDiscount",
                    "plural": false,
                    "selections": (v5/*: any*/),
                    "storageKey": null
                  },
                  (v6/*: any*/)
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
            "name": "saleMessage",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "culturalMaker",
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v7/*: any*/),
            "concreteType": "Artist",
            "kind": "LinkedField",
            "name": "artist",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ArtistTargetSupply",
                "kind": "LinkedField",
                "name": "targetSupply",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isP1",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v6/*: any*/)
            ],
            "storageKey": "artist(shallow:true)"
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtworkPriceInsights",
            "kind": "LinkedField",
            "name": "marketPriceInsights",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "demandRank",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v7/*: any*/),
            "concreteType": "Artist",
            "kind": "LinkedField",
            "name": "artists",
            "plural": true,
            "selections": [
              (v6/*: any*/),
              (v3/*: any*/),
              (v8/*: any*/)
            ],
            "storageKey": "artists(shallow:true)"
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "collectingInstitution",
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v7/*: any*/),
            "concreteType": "Partner",
            "kind": "LinkedField",
            "name": "partner",
            "plural": false,
            "selections": [
              (v8/*: any*/),
              (v3/*: any*/),
              (v6/*: any*/)
            ],
            "storageKey": "partner(shallow:true)"
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Sale",
            "kind": "LinkedField",
            "name": "sale",
            "plural": false,
            "selections": [
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "cascadingEndTimeIntervalMinutes",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "extendedBiddingIntervalMinutes",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "startAt",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isAuction",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isClosed",
                "storageKey": null
              },
              (v6/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "SaleArtwork",
            "kind": "LinkedField",
            "name": "saleArtwork",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "lotID",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "lotLabel",
                "storageKey": null
              },
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "extendedBiddingEndAt",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "formattedEndDateTime",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "SaleArtworkCounts",
                "kind": "LinkedField",
                "name": "counts",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "bidderPositions",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "SaleArtworkHighestBid",
                "kind": "LinkedField",
                "name": "highestBid",
                "plural": false,
                "selections": (v5/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "SaleArtworkOpeningBid",
                "kind": "LinkedField",
                "name": "openingBid",
                "plural": false,
                "selections": (v5/*: any*/),
                "storageKey": null
              },
              (v6/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "AttributionClass",
            "kind": "LinkedField",
            "name": "attributionClass",
            "plural": false,
            "selections": (v9/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtworkMedium",
            "kind": "LinkedField",
            "name": "mediumType",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Gene",
                "kind": "LinkedField",
                "name": "filterGene",
                "plural": false,
                "selections": (v9/*: any*/),
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v6/*: any*/),
          {
            "condition": "includeConsignmentSubmission",
            "kind": "Condition",
            "passingValue": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ArtworkConsignmentSubmission",
                "kind": "LinkedField",
                "name": "consignmentSubmission",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "state",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "stateLabel",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "actionLabel",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "stateLabelColor",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isListed",
                "storageKey": null
              }
            ]
          }
        ],
        "storageKey": "artwork(id:\"gerhard-richter-bagdad-ii-flow-p10-1\")"
      }
    ]
  },
  "params": {
    "cacheID": "bdf4bd7b2b7a76af321c9826450a33f4",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "artwork.artist": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artist"
        },
        "artwork.artist.id": (v10/*: any*/),
        "artwork.artist.targetSupply": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ArtistTargetSupply"
        },
        "artwork.artist.targetSupply.isP1": (v11/*: any*/),
        "artwork.artists": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Artist"
        },
        "artwork.artists.href": (v12/*: any*/),
        "artwork.artists.id": (v10/*: any*/),
        "artwork.artists.name": (v12/*: any*/),
        "artwork.attributionClass": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AttributionClass"
        },
        "artwork.attributionClass.id": (v10/*: any*/),
        "artwork.attributionClass.name": (v12/*: any*/),
        "artwork.collectingInstitution": (v12/*: any*/),
        "artwork.collectorSignals": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CollectorSignals"
        },
        "artwork.collectorSignals.auction": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AuctionCollectorSignals"
        },
        "artwork.collectorSignals.auction.bidCount": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Int"
        },
        "artwork.collectorSignals.auction.liveBiddingStarted": (v13/*: any*/),
        "artwork.collectorSignals.auction.lotClosesAt": (v12/*: any*/),
        "artwork.collectorSignals.auction.onlineBiddingExtended": (v13/*: any*/),
        "artwork.collectorSignals.auction.registrationEndsAt": (v12/*: any*/),
        "artwork.collectorSignals.partnerOffer": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "PartnerOfferToCollector"
        },
        "artwork.collectorSignals.partnerOffer.endAt": (v12/*: any*/),
        "artwork.collectorSignals.partnerOffer.id": (v10/*: any*/),
        "artwork.collectorSignals.partnerOffer.priceWithDiscount": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Money"
        },
        "artwork.collectorSignals.partnerOffer.priceWithDiscount.display": (v12/*: any*/),
        "artwork.collectorSignals.primaryLabel": {
          "enumValues": [
            "CURATORS_PICK",
            "INCREASED_INTEREST",
            "PARTNER_OFFER"
          ],
          "nullable": true,
          "plural": false,
          "type": "LabelSignalEnum"
        },
        "artwork.consignmentSubmission": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkConsignmentSubmission"
        },
        "artwork.consignmentSubmission.actionLabel": (v12/*: any*/),
        "artwork.consignmentSubmission.internalID": (v12/*: any*/),
        "artwork.consignmentSubmission.state": {
          "enumValues": [
            "APPROVED",
            "CLOSED",
            "DRAFT",
            "HOLD",
            "PUBLISHED",
            "REJECTED",
            "RESUBMITTED",
            "SUBMITTED"
          ],
          "nullable": false,
          "plural": false,
          "type": "ArtworkConsignmentSubmissionState"
        },
        "artwork.consignmentSubmission.stateLabel": (v12/*: any*/),
        "artwork.consignmentSubmission.stateLabelColor": (v12/*: any*/),
        "artwork.culturalMaker": (v12/*: any*/),
        "artwork.date": (v12/*: any*/),
        "artwork.href": (v12/*: any*/),
        "artwork.id": (v10/*: any*/),
        "artwork.internalID": (v10/*: any*/),
        "artwork.isListed": (v13/*: any*/),
        "artwork.marketPriceInsights": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkPriceInsights"
        },
        "artwork.marketPriceInsights.demandRank": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Float"
        },
        "artwork.mediumType": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkMedium"
        },
        "artwork.mediumType.filterGene": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Gene"
        },
        "artwork.mediumType.filterGene.id": (v10/*: any*/),
        "artwork.mediumType.filterGene.name": (v12/*: any*/),
        "artwork.partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "artwork.partner.href": (v12/*: any*/),
        "artwork.partner.id": (v10/*: any*/),
        "artwork.partner.name": (v12/*: any*/),
        "artwork.sale": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Sale"
        },
        "artwork.sale.cascadingEndTimeIntervalMinutes": (v14/*: any*/),
        "artwork.sale.endAt": (v12/*: any*/),
        "artwork.sale.extendedBiddingIntervalMinutes": (v14/*: any*/),
        "artwork.sale.id": (v10/*: any*/),
        "artwork.sale.isAuction": (v11/*: any*/),
        "artwork.sale.isClosed": (v11/*: any*/),
        "artwork.sale.startAt": (v12/*: any*/),
        "artwork.saleArtwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtwork"
        },
        "artwork.saleArtwork.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkCounts"
        },
        "artwork.saleArtwork.counts.bidderPositions": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FormattedNumber"
        },
        "artwork.saleArtwork.endAt": (v12/*: any*/),
        "artwork.saleArtwork.extendedBiddingEndAt": (v12/*: any*/),
        "artwork.saleArtwork.formattedEndDateTime": (v12/*: any*/),
        "artwork.saleArtwork.highestBid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkHighestBid"
        },
        "artwork.saleArtwork.highestBid.display": (v12/*: any*/),
        "artwork.saleArtwork.id": (v10/*: any*/),
        "artwork.saleArtwork.lotID": (v12/*: any*/),
        "artwork.saleArtwork.lotLabel": (v12/*: any*/),
        "artwork.saleArtwork.openingBid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkOpeningBid"
        },
        "artwork.saleArtwork.openingBid.display": (v12/*: any*/),
        "artwork.saleMessage": (v12/*: any*/),
        "artwork.title": (v12/*: any*/)
      }
    },
    "name": "Details_Test_Query",
    "operationKind": "query",
    "text": "query Details_Test_Query(\n  $includeConsignmentSubmission: Boolean!\n) {\n  artwork(id: \"gerhard-richter-bagdad-ii-flow-p10-1\") {\n    ...Details_artwork_4xkhwS\n    id\n  }\n}\n\nfragment BidTimerLine_artwork on Artwork {\n  saleArtwork {\n    lotID\n    id\n  }\n  collectorSignals {\n    auction {\n      lotClosesAt\n      registrationEndsAt\n      onlineBiddingExtended\n    }\n  }\n}\n\nfragment ConsignmentSubmissionStatus_artwork on Artwork {\n  internalID\n  isListed\n  consignmentSubmission {\n    internalID\n    state\n    stateLabel\n    actionLabel\n    stateLabelColor\n  }\n}\n\nfragment Details_artwork_4xkhwS on Artwork {\n  internalID\n  href\n  title\n  date\n  collectorSignals {\n    primaryLabel(ignore: [])\n    auction {\n      bidCount\n      lotClosesAt\n      liveBiddingStarted\n      registrationEndsAt\n      onlineBiddingExtended\n    }\n    partnerOffer {\n      endAt\n      priceWithDiscount {\n        display\n      }\n      id\n    }\n  }\n  saleMessage\n  culturalMaker\n  artist(shallow: true) {\n    targetSupply {\n      isP1\n    }\n    id\n  }\n  marketPriceInsights {\n    demandRank\n  }\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n  collectingInstitution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    endAt\n    cascadingEndTimeIntervalMinutes\n    extendedBiddingIntervalMinutes\n    startAt\n    isAuction\n    isClosed\n    id\n  }\n  saleArtwork {\n    lotID\n    lotLabel\n    endAt\n    extendedBiddingEndAt\n    formattedEndDateTime\n    counts {\n      bidderPositions\n    }\n    highestBid {\n      display\n    }\n    openingBid {\n      display\n    }\n    id\n  }\n  consignmentSubmission @include(if: $includeConsignmentSubmission) {\n    internalID\n  }\n  ...ConsignmentSubmissionStatus_artwork @include(if: $includeConsignmentSubmission)\n  ...BidTimerLine_artwork\n  ...HoverDetails_artwork\n}\n\nfragment HoverDetails_artwork on Artwork {\n  internalID\n  attributionClass {\n    name\n    id\n  }\n  mediumType {\n    filterGene {\n      name\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "1bdc896d6eda233572bf7e309e786aa9";

export default node;
