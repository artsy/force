/**
 * @generated SignedSource<<7984213b87edcd3c8ce5d66edc9f91a6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type SubmitInquiryRequestMutationInput = {
  clientMutationId?: string | null | undefined;
  contactGallery?: boolean | null | undefined;
  inquireableID: string;
  inquireableType: string;
  message?: string | null | undefined;
  questions?: ReadonlyArray<InquiryQuestionInput | null | undefined> | null | undefined;
};
export type InquiryQuestionInput = {
  details?: string | null | undefined;
  questionID: string;
};
export type useArtworkInquiryRequestMutation$variables = {
  input: SubmitInquiryRequestMutationInput;
};
export type useArtworkInquiryRequestMutation$data = {
  readonly submitInquiryRequestMutation: {
    readonly clientMutationId: string | null | undefined;
    readonly inquiryRequest: {
      readonly inquireable: {
        readonly internalID?: string;
        readonly price?: string | null | undefined;
        readonly slug?: string;
      } | null | undefined;
      readonly internalID: string;
    } | null | undefined;
  } | null | undefined;
};
export type useArtworkInquiryRequestMutation = {
  response: useArtworkInquiryRequestMutation$data;
  variables: useArtworkInquiryRequestMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
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
  "type": "Artwork",
  "abstractKey": null
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
    "type": "Mutation",
    "abstractKey": null
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
                  (v4/*: any*/),
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v5/*: any*/)
                    ],
                    "type": "Node",
                    "abstractKey": "__isNode"
                  }
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
    "cacheID": "8f4fa54bd5a87ba62997eac92b8a6df1",
    "id": null,
    "metadata": {},
    "name": "useArtworkInquiryRequestMutation",
    "operationKind": "mutation",
    "text": "mutation useArtworkInquiryRequestMutation(\n  $input: SubmitInquiryRequestMutationInput!\n) {\n  submitInquiryRequestMutation(input: $input) {\n    clientMutationId\n    inquiryRequest {\n      internalID\n      inquireable {\n        __typename\n        ... on Artwork {\n          internalID\n          slug\n          price\n        }\n        ... on Node {\n          __isNode: __typename\n          id\n        }\n      }\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "0641e0c8acf0cfa0b812e4af801f7fda";

export default node;
