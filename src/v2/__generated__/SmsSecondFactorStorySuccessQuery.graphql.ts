/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SmsSecondFactorStorySuccessQueryVariables = {};
export type SmsSecondFactorStorySuccessQueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"SmsSecondFactor_me">;
    } | null;
};
export type SmsSecondFactorStorySuccessQuery = {
    readonly response: SmsSecondFactorStorySuccessQueryResponse;
    readonly variables: SmsSecondFactorStorySuccessQueryVariables;
};



/*
query SmsSecondFactorStorySuccessQuery {
  me {
    ...SmsSecondFactor_me
    id
  }
}

fragment SmsSecondFactor_me on Me {
  hasSecondFactorEnabled
  smsSecondFactors: secondFactors(kinds: [sms]) {
    __typename
    ... on SmsSecondFactor {
      __typename
      internalID
      formattedPhoneNumber
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__typename",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "SmsSecondFactorStorySuccessQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "me",
        "storageKey": null,
        "args": null,
        "concreteType": "Me",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "SmsSecondFactor_me",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "SmsSecondFactorStorySuccessQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "me",
        "storageKey": null,
        "args": null,
        "concreteType": "Me",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "hasSecondFactorEnabled",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": "smsSecondFactors",
            "name": "secondFactors",
            "storageKey": "secondFactors(kinds:[\"sms\"])",
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
            "plural": true,
            "selections": [
              (v0/*: any*/),
              {
                "kind": "InlineFragment",
                "type": "SmsSecondFactor",
                "selections": [
                  (v0/*: any*/),
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "internalID",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "formattedPhoneNumber",
                    "args": null,
                    "storageKey": null
                  }
                ]
              }
            ]
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
    "name": "SmsSecondFactorStorySuccessQuery",
    "id": null,
    "text": "query SmsSecondFactorStorySuccessQuery {\n  me {\n    ...SmsSecondFactor_me\n    id\n  }\n}\n\nfragment SmsSecondFactor_me on Me {\n  hasSecondFactorEnabled\n  smsSecondFactors: secondFactors(kinds: [sms]) {\n    __typename\n    ... on SmsSecondFactor {\n      __typename\n      internalID\n      formattedPhoneNumber\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '7715cb46a652b03d99e6aef365436e7d';
export default node;
