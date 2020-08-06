/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SecurePaymentTestQueryVariables = {};
export type SecurePaymentTestQueryResponse = {
    readonly artwork: {
        readonly " $fragmentRefs": FragmentRefs<"SecurePayment_artwork">;
    } | null;
};
export type SecurePaymentTestQueryRawResponse = {
    readonly artwork: ({
        readonly is_acquireable: boolean | null;
        readonly is_offerable: boolean | null;
        readonly id: string | null;
    }) | null;
};
export type SecurePaymentTestQuery = {
    readonly response: SecurePaymentTestQueryResponse;
    readonly variables: SecurePaymentTestQueryVariables;
    readonly rawResponse: SecurePaymentTestQueryRawResponse;
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
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "SecurePaymentTestQuery",
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
            "name": "SecurePayment_artwork",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "SecurePaymentTestQuery",
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
            "alias": "is_acquireable",
            "name": "isAcquireable",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": "is_offerable",
            "name": "isOfferable",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "id",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "SecurePaymentTestQuery",
    "id": null,
    "text": "query SecurePaymentTestQuery {\n  artwork(id: \"whatevs\") {\n    ...SecurePayment_artwork\n    id\n  }\n}\n\nfragment SecurePayment_artwork on Artwork {\n  is_acquireable: isAcquireable\n  is_offerable: isOfferable\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'e4ce9cd4c7b6db43aa9600e859dee9a0';
export default node;
