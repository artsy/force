/**
 * @generated SignedSource<<6825244433cf495dcced4b8b599ac81c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PhoneNumberRoute_Test_Query$variables = Record<PropertyKey, never>;
export type PhoneNumberRoute_Test_Query$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"PhoneNumberRoute_me">;
  } | null | undefined;
  readonly submission: {
    readonly " $fragmentSpreads": FragmentRefs<"PhoneNumberRoute_submission" | "SubmissionRoute_submission">;
  } | null | undefined;
};
export type PhoneNumberRoute_Test_Query$rawResponse = {
  readonly me: {
    readonly id: string;
    readonly internalID: string;
    readonly phoneNumber: {
      readonly display: string | null | undefined;
      readonly regionCode: string | null | undefined;
    } | null | undefined;
  } | null | undefined;
  readonly submission: {
    readonly externalId: string;
    readonly id: string;
    readonly internalID: string | null | undefined;
    readonly userPhoneNumber: {
      readonly display: string | null | undefined;
      readonly regionCode: string | null | undefined;
    } | null | undefined;
  } | null | undefined;
};
export type PhoneNumberRoute_Test_Query = {
  rawResponse: PhoneNumberRoute_Test_Query$rawResponse;
  response: PhoneNumberRoute_Test_Query$data;
  variables: PhoneNumberRoute_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "submission-id"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "regionCode",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v3 = {
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
    "name": "PhoneNumberRoute_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "ConsignmentSubmission",
        "kind": "LinkedField",
        "name": "submission",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "PhoneNumberRoute_submission"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "SubmissionRoute_submission"
          }
        ],
        "storageKey": "submission(id:\"submission-id\")"
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "PhoneNumberRoute_me"
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
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "PhoneNumberRoute_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "ConsignmentSubmission",
        "kind": "LinkedField",
        "name": "submission",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "PhoneNumberType",
            "kind": "LinkedField",
            "name": "userPhoneNumber",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "display",
                "storageKey": null
              },
              (v1/*: any*/)
            ],
            "storageKey": null
          },
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "externalId",
            "storageKey": null
          },
          (v3/*: any*/)
        ],
        "storageKey": "submission(id:\"submission-id\")"
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "PhoneNumberType",
            "kind": "LinkedField",
            "name": "phoneNumber",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              {
                "alias": null,
                "args": [
                  {
                    "kind": "Literal",
                    "name": "format",
                    "value": "NATIONAL"
                  }
                ],
                "kind": "ScalarField",
                "name": "display",
                "storageKey": "display(format:\"NATIONAL\")"
              }
            ],
            "storageKey": null
          },
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "b1f17baf13e9b2cfb3049e4856af0573",
    "id": null,
    "metadata": {},
    "name": "PhoneNumberRoute_Test_Query",
    "operationKind": "query",
    "text": "query PhoneNumberRoute_Test_Query {\n  submission(id: \"submission-id\") {\n    ...PhoneNumberRoute_submission\n    ...SubmissionRoute_submission\n    id\n  }\n  me {\n    ...PhoneNumberRoute_me\n    id\n  }\n}\n\nfragment PhoneNumberRoute_me on Me {\n  internalID\n  phoneNumber {\n    regionCode\n    display(format: NATIONAL)\n  }\n}\n\nfragment PhoneNumberRoute_submission on ConsignmentSubmission {\n  userPhoneNumber {\n    display\n    regionCode\n  }\n}\n\nfragment SubmissionRoute_submission on ConsignmentSubmission {\n  internalID\n  externalId\n}\n"
  }
};
})();

(node as any).hash = "b81e350fd6a86a552c644afc6f0b0995";

export default node;
