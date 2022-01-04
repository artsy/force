/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type SubmitInquiryRequestMutationInput = {
    clientMutationId?: string | null;
    contactGallery?: boolean | null;
    inquireableID: string;
    inquireableType: string;
    message?: string | null;
    questions?: Array<InquiryQuestionInput | null> | null;
};
export type InquiryQuestionInput = {
    details?: string | null;
    questionID: string;
};
export type useArtworkInquiryRequestMutationVariables = {
    input: SubmitInquiryRequestMutationInput;
};
export type useArtworkInquiryRequestMutationResponse = {
    readonly submitInquiryRequestMutation: {
        readonly clientMutationId: string | null;
        readonly inquiryRequest: {
            readonly internalID: string;
            readonly inquireable: {
                readonly internalID?: string;
                readonly slug?: string;
                readonly price?: string | null;
            } | null;
        } | null;
    } | null;
};
export type useArtworkInquiryRequestMutation = {
    readonly response: useArtworkInquiryRequestMutationResponse;
    readonly variables: useArtworkInquiryRequestMutationVariables;
};



/*
mutation useArtworkInquiryRequestMutation(
  $input: SubmitInquiryRequestMutationInput!
) {
  submitInquiryRequestMutation(input: $input) {
    clientMutationId
    inquiryRequest {
      internalID
      inquireable {
        __typename
        ... on Artwork {
          internalID
          slug
          price
        }
        ... on Node {
          id
        }
      }
      id
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input",
    "type": "SubmitInquiryRequestMutationInput!"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "clientMutationId",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v4 = {
  "kind": "InlineFragment",
  "selections": [
    (v3/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "price",
      "storageKey": null
    }
  ],
  "type": "Artwork"
},
v5 = {
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
    "name": "useArtworkInquiryRequestMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "SubmitInquiryRequestMutationPayload",
        "kind": "LinkedField",
        "name": "submitInquiryRequestMutation",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "InquiryRequest",
            "kind": "LinkedField",
            "name": "inquiryRequest",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "inquireable",
                "plural": false,
                "selections": [
                  (v4/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useArtworkInquiryRequestMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "SubmitInquiryRequestMutationPayload",
        "kind": "LinkedField",
        "name": "submitInquiryRequestMutation",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "InquiryRequest",
            "kind": "LinkedField",
            "name": "inquiryRequest",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "inquireable",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "__typename",
                    "storageKey": null
                  },
                  (v5/*: any*/),
                  (v4/*: any*/)
                ],
                "storageKey": null
              },
              (v5/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "useArtworkInquiryRequestMutation",
    "operationKind": "mutation",
    "text": "mutation useArtworkInquiryRequestMutation(\n  $input: SubmitInquiryRequestMutationInput!\n) {\n  submitInquiryRequestMutation(input: $input) {\n    clientMutationId\n    inquiryRequest {\n      internalID\n      inquireable {\n        __typename\n        ... on Artwork {\n          internalID\n          slug\n          price\n        }\n        ... on Node {\n          id\n        }\n      }\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '0641e0c8acf0cfa0b812e4af801f7fda';
export default node;
