/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type consignRoutes_OfferDetailQueryVariables = {
    offerID: string;
};
export type consignRoutes_OfferDetailQueryResponse = {
    readonly offer: {
        readonly " $fragmentRefs": FragmentRefs<"OfferDetailApp_offer">;
    } | null;
};
export type consignRoutes_OfferDetailQuery = {
    readonly response: consignRoutes_OfferDetailQueryResponse;
    readonly variables: consignRoutes_OfferDetailQueryVariables;
};



/*
query consignRoutes_OfferDetailQuery(
  $offerID: ID!
) {
  offer(id: $offerID, gravityPartnerId: "ssshhhhh") {
    ...OfferDetailApp_offer
    id
  }
}

fragment OfferDetailApp_offer on ConsignmentOffer {
  saleName
  submission {
    title
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "offerID",
    "type": "ID!"
  }
],
v1 = [
  {
    "kind": "Literal",
    "name": "gravityPartnerId",
    "value": "ssshhhhh"
  },
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "offerID"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "consignRoutes_OfferDetailQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ConsignmentOffer",
        "kind": "LinkedField",
        "name": "offer",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "OfferDetailApp_offer"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "consignRoutes_OfferDetailQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ConsignmentOffer",
        "kind": "LinkedField",
        "name": "offer",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "saleName",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ConsignmentSubmission",
            "kind": "LinkedField",
            "name": "submission",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "title",
                "storageKey": null
              },
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "consignRoutes_OfferDetailQuery",
    "operationKind": "query",
    "text": "query consignRoutes_OfferDetailQuery(\n  $offerID: ID!\n) {\n  offer(id: $offerID, gravityPartnerId: \"ssshhhhh\") {\n    ...OfferDetailApp_offer\n    id\n  }\n}\n\nfragment OfferDetailApp_offer on ConsignmentOffer {\n  saleName\n  submission {\n    title\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = 'fa0ce41addb3039c5d33a7345e3ab367';
export default node;
