/**
 * @generated SignedSource<<b3d2c22b735cb81629b9bbf20d022109>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type consignRoutes_OfferDetailQuery$variables = {
  offerID: string;
};
export type consignRoutes_OfferDetailQuery$data = {
  readonly offer: {
    readonly " $fragmentSpreads": FragmentRefs<"OfferDetailApp_offer">;
  } | null;
};
export type consignRoutes_OfferDetailQuery = {
  variables: consignRoutes_OfferDetailQuery$variables;
  response: consignRoutes_OfferDetailQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "offerID"
  }
],
v1 = [
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
    "type": "Query",
    "abstractKey": null
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
          (v2/*: any*/),
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
            "name": "saleLocation",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "saleName",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "66a2c500cb03c15b54cffaf955fb36a8",
    "id": null,
    "metadata": {},
    "name": "consignRoutes_OfferDetailQuery",
    "operationKind": "query",
    "text": "query consignRoutes_OfferDetailQuery(\n  $offerID: ID!\n) {\n  offer(id: $offerID) {\n    ...OfferDetailApp_offer\n    id\n  }\n}\n\nfragment OfferDetailApp_offer on ConsignmentOffer {\n  ...ResponseForm_offer\n  ...Summary_offer\n}\n\nfragment OfferSummary_offer on ConsignmentOffer {\n  saleDate\n  saleLocation\n  saleName\n}\n\nfragment ResponseForm_offer on ConsignmentOffer {\n  id\n}\n\nfragment SubmissionSummary_offer on ConsignmentOffer {\n  submission {\n    artist {\n      name\n      id\n    }\n    title\n    year\n    assets {\n      imageUrls\n      id\n    }\n    primaryImage {\n      imageUrls\n      id\n    }\n    id\n  }\n}\n\nfragment Summary_offer on ConsignmentOffer {\n  ...SubmissionSummary_offer\n  ...OfferSummary_offer\n}\n"
  }
};
})();

(node as any).hash = "a0b8e054b0db5301b045a90b94898074";

export default node;
