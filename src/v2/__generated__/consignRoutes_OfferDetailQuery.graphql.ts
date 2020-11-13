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
  offer(id: $offerID, gravityPartnerId: "4d8b92c44eb68a1b2c0004cb") {
    ...OfferDetailApp_offer
    id
  }
}

fragment OfferDetailApp_offer on ConsignmentOffer {
  ...Summary_offer
}

fragment Submission_offer on ConsignmentOffer {
  submission {
    artist {
      name
      id
    }
    title
    year
    assets {
      imageUrls
      id
    }
    primaryImage {
      imageUrls
      id
    }
    id
  }
}

fragment Summary_offer on ConsignmentOffer {
  saleDate
  saleName
  saleLocation
  ...Submission_offer
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
    "value": "4d8b92c44eb68a1b2c0004cb"
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
},
v3 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "imageUrls",
    "storageKey": null
  },
  (v2/*: any*/)
];
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
            "name": "saleDate",
            "storageKey": null
          },
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
            "kind": "ScalarField",
            "name": "saleLocation",
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
                "concreteType": "Artist",
                "kind": "LinkedField",
                "name": "artist",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "name",
                    "storageKey": null
                  },
                  (v2/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "title",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "year",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "ConsignmentSubmissionCategoryAsset",
                "kind": "LinkedField",
                "name": "assets",
                "plural": true,
                "selections": (v3/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "ConsignmentSubmissionCategoryAsset",
                "kind": "LinkedField",
                "name": "primaryImage",
                "plural": false,
                "selections": (v3/*: any*/),
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
    "text": "query consignRoutes_OfferDetailQuery(\n  $offerID: ID!\n) {\n  offer(id: $offerID, gravityPartnerId: \"4d8b92c44eb68a1b2c0004cb\") {\n    ...OfferDetailApp_offer\n    id\n  }\n}\n\nfragment OfferDetailApp_offer on ConsignmentOffer {\n  ...Summary_offer\n}\n\nfragment Submission_offer on ConsignmentOffer {\n  submission {\n    artist {\n      name\n      id\n    }\n    title\n    year\n    assets {\n      imageUrls\n      id\n    }\n    primaryImage {\n      imageUrls\n      id\n    }\n    id\n  }\n}\n\nfragment Summary_offer on ConsignmentOffer {\n  saleDate\n  saleName\n  saleLocation\n  ...Submission_offer\n}\n"
  }
};
})();
(node as any).hash = '31ef1777d09bcbe2d3350ae9ee7ba6ee';
export default node;
