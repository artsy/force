/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebarExtraLinks_Test_QueryVariables = {};
export type ArtworkSidebarExtraLinks_Test_QueryResponse = {
    readonly artwork: {
        readonly " $fragmentRefs": FragmentRefs<"ArtworkSidebarExtraLinks_artwork">;
    } | null;
};
export type ArtworkSidebarExtraLinks_Test_QueryRawResponse = {
    readonly artwork: ({
        readonly internalID: string;
        readonly is_in_auction: boolean | null;
        readonly is_for_sale: boolean | null;
        readonly is_acquireable: boolean | null;
        readonly is_inquireable: boolean | null;
        readonly artists: ReadonlyArray<({
            readonly is_consignable: boolean | null;
            readonly id: string | null;
        }) | null> | null;
        readonly sale: ({
            readonly is_closed: boolean | null;
            readonly isBenefit: boolean | null;
            readonly partner: ({
                readonly name: string | null;
                readonly id: string | null;
            }) | null;
            readonly id: string | null;
        }) | null;
        readonly id: string | null;
    }) | null;
};
export type ArtworkSidebarExtraLinks_Test_Query = {
    readonly response: ArtworkSidebarExtraLinks_Test_QueryResponse;
    readonly variables: ArtworkSidebarExtraLinks_Test_QueryVariables;
    readonly rawResponse: ArtworkSidebarExtraLinks_Test_QueryRawResponse;
};



/*
query ArtworkSidebarExtraLinks_Test_Query {
  artwork(id: "josef-albers-homage-to-the-square-85") {
    ...ArtworkSidebarExtraLinks_artwork
    id
  }
}

fragment ArtworkSidebarExtraLinks_artwork on Artwork {
  internalID
  is_in_auction: isInAuction
  is_for_sale: isForSale
  is_acquireable: isAcquireable
  is_inquireable: isInquireable
  artists {
    is_consignable: isConsignable
    id
  }
  sale {
    is_closed: isClosed
    isBenefit
    partner {
      name
      id
    }
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "josef-albers-homage-to-the-square-85"
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
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v3 = {
  "type": "Boolean",
  "enumValues": null,
  "plural": false,
  "nullable": true
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtworkSidebarExtraLinks_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ArtworkSidebarExtraLinks_artwork"
          }
        ],
        "storageKey": "artwork(id:\"josef-albers-homage-to-the-square-85\")"
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ArtworkSidebarExtraLinks_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
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
            "alias": "is_in_auction",
            "args": null,
            "kind": "ScalarField",
            "name": "isInAuction",
            "storageKey": null
          },
          {
            "alias": "is_for_sale",
            "args": null,
            "kind": "ScalarField",
            "name": "isForSale",
            "storageKey": null
          },
          {
            "alias": "is_acquireable",
            "args": null,
            "kind": "ScalarField",
            "name": "isAcquireable",
            "storageKey": null
          },
          {
            "alias": "is_inquireable",
            "args": null,
            "kind": "ScalarField",
            "name": "isInquireable",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Artist",
            "kind": "LinkedField",
            "name": "artists",
            "plural": true,
            "selections": [
              {
                "alias": "is_consignable",
                "args": null,
                "kind": "ScalarField",
                "name": "isConsignable",
                "storageKey": null
              },
              (v1/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Sale",
            "kind": "LinkedField",
            "name": "sale",
            "plural": false,
            "selections": [
              {
                "alias": "is_closed",
                "args": null,
                "kind": "ScalarField",
                "name": "isClosed",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isBenefit",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Partner",
                "kind": "LinkedField",
                "name": "partner",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "name",
                    "storageKey": null
                  },
                  (v1/*: any*/)
                ],
                "storageKey": null
              },
              (v1/*: any*/)
            ],
            "storageKey": null
          },
          (v1/*: any*/)
        ],
        "storageKey": "artwork(id:\"josef-albers-homage-to-the-square-85\")"
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artwork": {
          "type": "Artwork",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artwork.id": (v2/*: any*/),
        "artwork.internalID": {
          "type": "ID",
          "enumValues": null,
          "plural": false,
          "nullable": false
        },
        "artwork.is_in_auction": (v3/*: any*/),
        "artwork.is_for_sale": (v3/*: any*/),
        "artwork.is_acquireable": (v3/*: any*/),
        "artwork.is_inquireable": (v3/*: any*/),
        "artwork.artists": {
          "type": "Artist",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "artwork.sale": {
          "type": "Sale",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artwork.artists.is_consignable": (v3/*: any*/),
        "artwork.artists.id": (v2/*: any*/),
        "artwork.sale.is_closed": (v3/*: any*/),
        "artwork.sale.isBenefit": (v3/*: any*/),
        "artwork.sale.partner": {
          "type": "Partner",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artwork.sale.id": (v2/*: any*/),
        "artwork.sale.partner.name": {
          "type": "String",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artwork.sale.partner.id": (v2/*: any*/)
      }
    },
    "name": "ArtworkSidebarExtraLinks_Test_Query",
    "operationKind": "query",
    "text": "query ArtworkSidebarExtraLinks_Test_Query {\n  artwork(id: \"josef-albers-homage-to-the-square-85\") {\n    ...ArtworkSidebarExtraLinks_artwork\n    id\n  }\n}\n\nfragment ArtworkSidebarExtraLinks_artwork on Artwork {\n  internalID\n  is_in_auction: isInAuction\n  is_for_sale: isForSale\n  is_acquireable: isAcquireable\n  is_inquireable: isInquireable\n  artists {\n    is_consignable: isConsignable\n    id\n  }\n  sale {\n    is_closed: isClosed\n    isBenefit\n    partner {\n      name\n      id\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = 'fc746ceaf76e3b8a6e448430d14a7c8a';
export default node;
