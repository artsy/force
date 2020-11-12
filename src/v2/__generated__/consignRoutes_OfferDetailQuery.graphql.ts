/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type consignRoutes_OfferDetailQueryVariables = {
    submissionID: string;
    offerID: string;
};
export type consignRoutes_OfferDetailQueryResponse = {
    readonly submission: {
        readonly " $fragmentRefs": FragmentRefs<"OfferDetailApp_submission">;
    } | null;
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
  $submissionID: ID!
  $offerID: ID!
) {
  submission(id: $submissionID) {
    ...OfferDetailApp_submission
    id
  }
  offer(id: $offerID, gravityPartnerId: "ssshhhhh") {
    ...OfferDetailApp_offer
    id
  }
}

fragment OfferDetailApp_offer on ConsignmentOffer {
  saleName
}

fragment OfferDetailApp_submission on ConsignmentSubmission {
  title
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "submissionID",
    "type": "ID!"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "offerID",
    "type": "ID!"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "submissionID"
  }
],
v2 = [
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
v3 = {
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
        "concreteType": "ConsignmentSubmission",
        "kind": "LinkedField",
        "name": "submission",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "OfferDetailApp_submission"
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v2/*: any*/),
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
          (v3/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v2/*: any*/),
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
          (v3/*: any*/)
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
    "text": "query consignRoutes_OfferDetailQuery(\n  $submissionID: ID!\n  $offerID: ID!\n) {\n  submission(id: $submissionID) {\n    ...OfferDetailApp_submission\n    id\n  }\n  offer(id: $offerID, gravityPartnerId: \"ssshhhhh\") {\n    ...OfferDetailApp_offer\n    id\n  }\n}\n\nfragment OfferDetailApp_offer on ConsignmentOffer {\n  saleName\n}\n\nfragment OfferDetailApp_submission on ConsignmentSubmission {\n  title\n}\n"
  }
};
})();
(node as any).hash = '8c804336da18e3de954c8a6ae85b34bb';
export default node;
