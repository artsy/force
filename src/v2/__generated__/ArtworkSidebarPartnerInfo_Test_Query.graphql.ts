/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebarPartnerInfo_Test_QueryVariables = {};
export type ArtworkSidebarPartnerInfo_Test_QueryResponse = {
    readonly artwork: {
        readonly " $fragmentRefs": FragmentRefs<"ArtworkSidebarPartnerInfo_artwork">;
    } | null;
};
export type ArtworkSidebarPartnerInfo_Test_QueryRawResponse = {
    readonly artwork: ({
        readonly partner: ({
            readonly name: string | null;
            readonly href: string | null;
            readonly locations: ReadonlyArray<({
                readonly city: string | null;
                readonly id: string | null;
            }) | null> | null;
            readonly id: string | null;
        }) | null;
        readonly sale: ({
            readonly name: string | null;
            readonly href: string | null;
            readonly id: string | null;
        }) | null;
        readonly id: string | null;
    }) | null;
};
export type ArtworkSidebarPartnerInfo_Test_Query = {
    readonly response: ArtworkSidebarPartnerInfo_Test_QueryResponse;
    readonly variables: ArtworkSidebarPartnerInfo_Test_QueryVariables;
    readonly rawResponse: ArtworkSidebarPartnerInfo_Test_QueryRawResponse;
};



/*
query ArtworkSidebarPartnerInfo_Test_Query {
  artwork(id: "artwork_from_partner_with_locations") {
    ...ArtworkSidebarPartnerInfo_artwork
    id
  }
}

fragment ArtworkSidebarPartnerInfo_artwork on Artwork {
  partner {
    name
    href
    locations {
      city
      id
    }
    id
  }
  sale {
    name
    href
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "artwork_from_partner_with_locations"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
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
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtworkSidebarPartnerInfo_Test_Query",
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
            "name": "ArtworkSidebarPartnerInfo_artwork"
          }
        ],
        "storageKey": "artwork(id:\"artwork_from_partner_with_locations\")"
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ArtworkSidebarPartnerInfo_Test_Query",
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
            "concreteType": "Partner",
            "kind": "LinkedField",
            "name": "partner",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Location",
                "kind": "LinkedField",
                "name": "locations",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "city",
                    "storageKey": null
                  },
                  (v3/*: any*/)
                ],
                "storageKey": null
              },
              (v3/*: any*/)
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
              (v1/*: any*/),
              (v2/*: any*/),
              (v3/*: any*/)
            ],
            "storageKey": null
          },
          (v3/*: any*/)
        ],
        "storageKey": "artwork(id:\"artwork_from_partner_with_locations\")"
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
        "artwork.id": (v4/*: any*/),
        "artwork.partner": {
          "type": "Partner",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artwork.sale": {
          "type": "Sale",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artwork.partner.name": (v5/*: any*/),
        "artwork.partner.href": (v5/*: any*/),
        "artwork.partner.locations": {
          "type": "Location",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "artwork.partner.id": (v4/*: any*/),
        "artwork.sale.name": (v5/*: any*/),
        "artwork.sale.href": (v5/*: any*/),
        "artwork.sale.id": (v4/*: any*/),
        "artwork.partner.locations.city": (v5/*: any*/),
        "artwork.partner.locations.id": (v4/*: any*/)
      }
    },
    "name": "ArtworkSidebarPartnerInfo_Test_Query",
    "operationKind": "query",
    "text": "query ArtworkSidebarPartnerInfo_Test_Query {\n  artwork(id: \"artwork_from_partner_with_locations\") {\n    ...ArtworkSidebarPartnerInfo_artwork\n    id\n  }\n}\n\nfragment ArtworkSidebarPartnerInfo_artwork on Artwork {\n  partner {\n    name\n    href\n    locations {\n      city\n      id\n    }\n    id\n  }\n  sale {\n    name\n    href\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '56bce63add2affb95615b5d17250cf6c';
export default node;
