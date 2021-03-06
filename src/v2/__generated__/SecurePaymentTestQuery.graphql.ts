/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SecurePaymentTestQueryVariables = {};
export type SecurePaymentTestQueryResponse = {
    readonly artwork: {
        readonly " $fragmentRefs": FragmentRefs<"SecurePayment_artwork">;
    } | null;
};
export type SecurePaymentTestQuery = {
    readonly response: SecurePaymentTestQueryResponse;
    readonly variables: SecurePaymentTestQueryVariables;
};



/*
query SecurePaymentTestQuery {
  artwork(id: "whatevs") {
    ...SecurePayment_artwork
    id
  }
}

fragment SecurePayment_artwork on Artwork {
  is_acquireable: isAcquireable
  is_offerable: isOfferable
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "whatevs"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "SecurePaymentTestQuery",
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
            "name": "SecurePayment_artwork"
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
    "name": "SecurePaymentTestQuery",
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
            "alias": "is_acquireable",
            "args": null,
            "kind": "ScalarField",
            "name": "isAcquireable",
            "storageKey": null
          },
          {
            "alias": "is_offerable",
            "args": null,
            "kind": "ScalarField",
            "name": "isOfferable",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": "artwork(id:\"whatevs\")"
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "SecurePaymentTestQuery",
    "operationKind": "query",
    "text": "query SecurePaymentTestQuery {\n  artwork(id: \"whatevs\") {\n    ...SecurePayment_artwork\n    id\n  }\n}\n\nfragment SecurePayment_artwork on Artwork {\n  is_acquireable: isAcquireable\n  is_offerable: isOfferable\n}\n"
  }
};
})();
(node as any).hash = '165920d44caabb5774c28db0aa6f8de1';
export default node;
