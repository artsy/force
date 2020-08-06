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
export type VerifiedSellerTestQueryRawResponse = {
    readonly artwork: ({
        readonly is_biddable: boolean | null;
        readonly partner: ({
            readonly isVerifiedSeller: boolean | null;
            readonly name: string | null;
            readonly id: string | null;
        }) | null;
        readonly id: string | null;
    }) | null;
};
export type VerifiedSellerTestQuery = {
    readonly response: VerifiedSellerTestQueryResponse;
    readonly variables: VerifiedSellerTestQueryVariables;
    readonly rawResponse: VerifiedSellerTestQueryRawResponse;
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
    "metadata": {},
    "name": "VerifiedSellerTestQuery",
    "operationKind": "query",
    "text": "query VerifiedSellerTestQuery {\n  artwork(id: \"whatevs\") {\n    ...VerifiedSeller_artwork\n    id\n  }\n}\n\nfragment VerifiedSeller_artwork on Artwork {\n  is_biddable: isBiddable\n  partner {\n    isVerifiedSeller\n    name\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '85ea1b419e11f7fdb8e102bb7a1dbd5f';
export default node;
