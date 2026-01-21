/**
 * @generated SignedSource<<ccc69fda1b9eebd9e70301e34a01a67b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AuctionDetailsQuery$variables = Record<PropertyKey, never>;
export type AuctionDetailsQuery$data = {
  readonly sale: {
    readonly " $fragmentSpreads": FragmentRefs<"AuctionDetails_sale">;
  } | null | undefined;
};
export type AuctionDetailsQuery = {
  response: AuctionDetailsQuery$data;
  variables: AuctionDetailsQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "foo"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
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
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Bidder"
},
v4 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v5 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
},
v6 = {
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
    "name": "AuctionDetailsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Sale",
        "kind": "LinkedField",
        "name": "sale",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "AuctionDetails_sale"
          }
        ],
        "storageKey": "sale(id:\"foo\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AuctionDetailsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Sale",
        "kind": "LinkedField",
        "name": "sale",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Bidder",
            "kind": "LinkedField",
            "name": "bidder",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "qualifiedForBidding",
                "storageKey": null
              },
              (v1/*: any*/)
            ],
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
                "alias": "signupImage",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "version",
                    "value": "main"
                  }
                ],
                "kind": "ScalarField",
                "name": "url",
                "storageKey": "url(version:\"main\")"
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
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isLiveOpen",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isPreview",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isRegistrationClosed",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "liveURLIfOpen",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "requireIdentityVerification",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Bidder",
            "kind": "LinkedField",
            "name": "registrationStatus",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v1/*: any*/)
            ],
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
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "liveStartAt",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "hideTotal",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Money",
            "kind": "LinkedField",
            "name": "totalRaised",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "minor",
                "storageKey": null
              },
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
            "name": "endedAt",
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
            "name": "name",
            "storageKey": null
          },
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "format",
                "value": "HTML"
              }
            ],
            "kind": "ScalarField",
            "name": "description",
            "storageKey": "description(format:\"HTML\")"
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
            "name": "cascadingEndTimeIntervalMinutes",
            "storageKey": null
          },
          (v1/*: any*/)
        ],
        "storageKey": "sale(id:\"foo\")"
      }
    ]
  },
  "params": {
    "cacheID": "a76e126790ab5ccc3c1fd60259ab329b",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "sale": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Sale"
        },
        "sale.bidder": (v3/*: any*/),
        "sale.bidder.id": (v4/*: any*/),
        "sale.bidder.qualifiedForBidding": (v5/*: any*/),
        "sale.cascadingEndTimeIntervalMinutes": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Int"
        },
        "sale.coverImage": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "sale.coverImage.aspectRatio": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Float"
        },
        "sale.coverImage.signupImage": (v6/*: any*/),
        "sale.description": (v6/*: any*/),
        "sale.endAt": (v6/*: any*/),
        "sale.endedAt": (v6/*: any*/),
        "sale.hideTotal": (v5/*: any*/),
        "sale.href": (v6/*: any*/),
        "sale.id": (v4/*: any*/),
        "sale.internalID": (v4/*: any*/),
        "sale.isAuction": (v5/*: any*/),
        "sale.isClosed": (v5/*: any*/),
        "sale.isLiveOpen": (v5/*: any*/),
        "sale.isPreview": (v5/*: any*/),
        "sale.isRegistrationClosed": (v5/*: any*/),
        "sale.liveStartAt": (v6/*: any*/),
        "sale.liveURLIfOpen": (v6/*: any*/),
        "sale.name": (v6/*: any*/),
        "sale.registrationStatus": (v3/*: any*/),
        "sale.registrationStatus.id": (v4/*: any*/),
        "sale.registrationStatus.internalID": (v4/*: any*/),
        "sale.requireIdentityVerification": (v5/*: any*/),
        "sale.slug": (v4/*: any*/),
        "sale.startAt": (v6/*: any*/),
        "sale.status": (v6/*: any*/),
        "sale.totalRaised": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Money"
        },
        "sale.totalRaised.display": (v6/*: any*/),
        "sale.totalRaised.minor": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Long"
        }
      }
    },
    "name": "AuctionDetailsQuery",
    "operationKind": "query",
    "text": "query AuctionDetailsQuery {\n  sale(id: \"foo\") {\n    ...AuctionDetails_sale\n    id\n  }\n}\n\nfragment AuctionDetails_sale on Sale {\n  ...RegisterButton_sale\n  ...AuctionInfoSidebar_sale\n  ...SaleDetailTimer_sale\n  internalID\n  name\n  slug\n  liveStartAt\n  startAt\n  endAt\n  description(format: HTML)\n  href\n  isClosed\n  cascadingEndTimeIntervalMinutes\n}\n\nfragment AuctionInfoSidebar_sale on Sale {\n  internalID\n  liveStartAt\n  hideTotal\n  totalRaised {\n    minor\n    display\n  }\n}\n\nfragment RegisterButton_sale on Sale {\n  bidder {\n    qualifiedForBidding\n    id\n  }\n  coverImage {\n    signupImage: url(version: \"main\")\n    aspectRatio\n  }\n  isAuction\n  isClosed\n  isLiveOpen\n  isPreview\n  isRegistrationClosed\n  liveURLIfOpen\n  requireIdentityVerification\n  registrationStatus {\n    internalID\n    id\n  }\n  slug\n  status\n}\n\nfragment SaleDetailTimer_sale on Sale {\n  endAt\n  endedAt\n  startAt\n}\n"
  }
};
})();

(node as any).hash = "130e0111ed222c097eadd5e659e7efe1";

export default node;
