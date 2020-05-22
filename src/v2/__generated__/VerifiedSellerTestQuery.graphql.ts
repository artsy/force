/* tslint:disable */

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
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "VerifiedSellerTestQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artwork",
        "storageKey": "artwork(id:\"whatevs\")",
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "VerifiedSeller_artwork",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "VerifiedSellerTestQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artwork",
        "storageKey": "artwork(id:\"whatevs\")",
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": "is_biddable",
            "name": "isBiddable",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "partner",
            "storageKey": null,
            "args": null,
            "concreteType": "Partner",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "isVerifiedSeller",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "name",
                "args": null,
                "storageKey": null
              },
              (v1/*: any*/)
            ]
          },
          (v1/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "VerifiedSellerTestQuery",
    "id": null,
    "text": "query VerifiedSellerTestQuery {\n  artwork(id: \"whatevs\") {\n    ...VerifiedSeller_artwork\n    id\n  }\n}\n\nfragment VerifiedSeller_artwork on Artwork {\n  is_biddable: isBiddable\n  partner {\n    isVerifiedSeller\n    name\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '85ea1b419e11f7fdb8e102bb7a1dbd5f';
export default node;
