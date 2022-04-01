/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AuctionDetailsTestQueryVariables = {};
export type AuctionDetailsTestQueryResponse = {
    readonly sale: {
        readonly " $fragmentRefs": FragmentRefs<"AuctionDetails_sale">;
    } | null;
};
export type AuctionDetailsTestQuery = {
    readonly response: AuctionDetailsTestQueryResponse;
    readonly variables: AuctionDetailsTestQueryVariables;
};



/*
query AuctionDetailsTestQuery {
  sale(id: "foo") {
    ...AuctionDetails_sale
    id
  }
}

fragment AuctionDetails_sale on Sale {
  ...RegisterButton_sale
  ...AuctionInfoSidebar_sale
  ...SaleDetailTimer_sale
  internalID
  name
  slug
  liveStartAt
  startAt
  endAt
  description(format: HTML)
  href
  isClosed
  cascadingEndTimeInterval
}

fragment AuctionInfoSidebar_sale on Sale {
  liveStartAt
}

fragment RegisterButton_sale on Sale {
  bidder {
    qualifiedForBidding
    id
  }
  isAuction
  isClosed
  isLiveOpen
  isPreview
  isRegistrationClosed
  liveURLIfOpen
  requireIdentityVerification
  registrationStatus {
    internalID
    id
  }
  slug
  status
}

fragment SaleDetailTimer_sale on Sale {
  endAt
  endedAt
  startAt
}
*/

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
    "name": "AuctionDetailsTestQuery",
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
    "name": "AuctionDetailsTestQuery",
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
          (v2/*: any*/),
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
            "name": "cascadingEndTimeInterval",
            "storageKey": null
          },
          (v1/*: any*/)
        ],
        "storageKey": "sale(id:\"foo\")"
      }
    ]
  },
  "params": {
    "cacheID": "be7843a591e11c501ccb41657a9e6375",
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
        "sale.cascadingEndTimeInterval": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Int"
        },
        "sale.description": (v6/*: any*/),
        "sale.endAt": (v6/*: any*/),
        "sale.endedAt": (v6/*: any*/),
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
        "sale.status": (v6/*: any*/)
      }
    },
    "name": "AuctionDetailsTestQuery",
    "operationKind": "query",
    "text": "query AuctionDetailsTestQuery {\n  sale(id: \"foo\") {\n    ...AuctionDetails_sale\n    id\n  }\n}\n\nfragment AuctionDetails_sale on Sale {\n  ...RegisterButton_sale\n  ...AuctionInfoSidebar_sale\n  ...SaleDetailTimer_sale\n  internalID\n  name\n  slug\n  liveStartAt\n  startAt\n  endAt\n  description(format: HTML)\n  href\n  isClosed\n  cascadingEndTimeInterval\n}\n\nfragment AuctionInfoSidebar_sale on Sale {\n  liveStartAt\n}\n\nfragment RegisterButton_sale on Sale {\n  bidder {\n    qualifiedForBidding\n    id\n  }\n  isAuction\n  isClosed\n  isLiveOpen\n  isPreview\n  isRegistrationClosed\n  liveURLIfOpen\n  requireIdentityVerification\n  registrationStatus {\n    internalID\n    id\n  }\n  slug\n  status\n}\n\nfragment SaleDetailTimer_sale on Sale {\n  endAt\n  endedAt\n  startAt\n}\n"
  }
};
})();
(node as any).hash = 'f0e0d3be04977a46d0fa553af2f660b7';
export default node;
