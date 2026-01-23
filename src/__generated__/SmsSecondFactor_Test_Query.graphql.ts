/**
 * @generated SignedSource<<883e6cb262d133b2f7b27b83acd0f95d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SmsSecondFactor_Test_Query$variables = Record<PropertyKey, never>;
export type SmsSecondFactor_Test_Query$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"SmsSecondFactor_me">;
  } | null | undefined;
};
export type SmsSecondFactor_Test_Query = {
  response: SmsSecondFactor_Test_Query$data;
  variables: SmsSecondFactor_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v1 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Boolean"
},
v2 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "SmsSecondFactor_Test_Query",
    "selections": [
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
            "name": "SmsSecondFactor_me"
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
    "name": "SmsSecondFactor_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "email",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "hasSecondFactorEnabled",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isEmailConfirmed",
            "storageKey": null
          },
          {
            "alias": "smsSecondFactors",
            "args": [
              {
                "kind": "Literal",
                "name": "kinds",
                "value": [
                  "sms"
                ]
              }
            ],
            "concreteType": null,
            "kind": "LinkedField",
            "name": "secondFactors",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__typename",
                "storageKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "internalID",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "formattedPhoneNumber",
                    "storageKey": null
                  }
                ],
                "type": "SmsSecondFactor",
                "abstractKey": null
              }
            ],
            "storageKey": "secondFactors(kinds:[\"sms\"])"
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "144e2e382ace1a3e4e61907133051e01",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
        },
        "me.email": (v0/*: any*/),
        "me.hasSecondFactorEnabled": (v1/*: any*/),
        "me.id": (v2/*: any*/),
        "me.isEmailConfirmed": (v1/*: any*/),
        "me.smsSecondFactors": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "SecondFactor"
        },
        "me.smsSecondFactors.__typename": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "String"
        },
        "me.smsSecondFactors.formattedPhoneNumber": (v0/*: any*/),
        "me.smsSecondFactors.internalID": (v2/*: any*/)
      }
    },
    "name": "SmsSecondFactor_Test_Query",
    "operationKind": "query",
    "text": "query SmsSecondFactor_Test_Query {\n  me {\n    ...SmsSecondFactor_me\n    id\n  }\n}\n\nfragment SmsSecondFactor_me on Me {\n  email\n  hasSecondFactorEnabled\n  isEmailConfirmed\n  smsSecondFactors: secondFactors(kinds: [sms]) {\n    __typename\n    ... on SmsSecondFactor {\n      __typename\n      internalID\n      formattedPhoneNumber\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "6d42d89bbae259c4dba68b0b72d4603b";

export default node;
