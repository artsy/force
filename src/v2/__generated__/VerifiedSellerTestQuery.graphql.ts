/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type VerifiedSellerTestQueryVariables = {};
export type VerifiedSellerTestQueryResponse = {
    readonly artwork: {
        readonly " $fragmentRefs": FragmentRefs<"VerifiedSeller_artwork">;
    } | null;
};
export type VerifiedSellerTestQuery = {
    readonly response: VerifiedSellerTestQueryResponse;
    readonly variables: VerifiedSellerTestQueryVariables;
};



/*
query VerifiedSellerTestQuery {
  artwork(id: "whatevs") {
    ...VerifiedSeller_artwork
    id
  }
}

fragment VerifiedSeller_artwork on Artwork {
  isBiddable
  partner {
    isVerifiedSeller
    name
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "whatevs"
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
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v3 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "VerifiedSellerTestQuery",
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
            "name": "VerifiedSeller_artwork"
          }
        ],
        "storageKey": "artwork(id:\"whatevs\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "VerifiedSellerTestQuery",
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
            "name": "isBiddable",
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
                "name": "isVerifiedSeller",
                "storageKey": null
              },
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
        "storageKey": "artwork(id:\"whatevs\")"
      }
    ]
  },
  "params": {
    "cacheID": "7d3ee9621a69e884cdfcbf88966a0a67",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "artwork.id": (v2/*: any*/),
        "artwork.isBiddable": (v3/*: any*/),
        "artwork.partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "artwork.partner.id": (v2/*: any*/),
        "artwork.partner.isVerifiedSeller": (v3/*: any*/),
        "artwork.partner.name": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "String"
        }
      }
    },
    "name": "VerifiedSellerTestQuery",
    "operationKind": "query",
    "text": "query VerifiedSellerTestQuery {\n  artwork(id: \"whatevs\") {\n    ...VerifiedSeller_artwork\n    id\n  }\n}\n\nfragment VerifiedSeller_artwork on Artwork {\n  isBiddable\n  partner {\n    isVerifiedSeller\n    name\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '99c1a37fc65e8b0255636404f65ab2a9';
export default node;
