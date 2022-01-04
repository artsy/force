/* tslint:disable */
/* eslint-disable */

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
  is_biddable: isBiddable
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
    "type": "Query"
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
            "alias": "is_biddable",
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
        "artwork.is_biddable": (v3/*: any*/),
        "artwork.partner": {
          "type": "Partner",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artwork.partner.isVerifiedSeller": (v3/*: any*/),
        "artwork.partner.name": {
          "type": "String",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artwork.partner.id": (v2/*: any*/)
      }
    },
    "name": "VerifiedSellerTestQuery",
    "operationKind": "query",
    "text": "query VerifiedSellerTestQuery {\n  artwork(id: \"whatevs\") {\n    ...VerifiedSeller_artwork\n    id\n  }\n}\n\nfragment VerifiedSeller_artwork on Artwork {\n  is_biddable: isBiddable\n  partner {\n    isVerifiedSeller\n    name\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '99c1a37fc65e8b0255636404f65ab2a9';
export default node;
