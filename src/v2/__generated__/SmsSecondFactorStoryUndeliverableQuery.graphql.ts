/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SmsSecondFactorStoryUndeliverableQueryVariables = {};
export type SmsSecondFactorStoryUndeliverableQueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"SmsSecondFactor_me">;
    } | null;
};
export type SmsSecondFactorStoryUndeliverableQuery = {
    readonly response: SmsSecondFactorStoryUndeliverableQueryResponse;
    readonly variables: SmsSecondFactorStoryUndeliverableQueryVariables;
};



/*
query SmsSecondFactorStoryUndeliverableQuery {
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
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "SmsSecondFactorStoryUndeliverableQuery",
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
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "SmsSecondFactorStoryUndeliverableQuery",
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
            "name": "hasSecondFactorEnabled",
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
              (v0/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  (v0/*: any*/),
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
                "type": "SmsSecondFactor"
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
    "id": null,
    "metadata": {},
    "name": "SmsSecondFactorStoryUndeliverableQuery",
    "operationKind": "query",
    "text": "query SmsSecondFactorStoryUndeliverableQuery {\n  me {\n    ...SmsSecondFactor_me\n    id\n  }\n}\n\nfragment SmsSecondFactor_me on Me {\n  hasSecondFactorEnabled\n  smsSecondFactors: secondFactors(kinds: [sms]) {\n    __typename\n    ... on SmsSecondFactor {\n      __typename\n      internalID\n      formattedPhoneNumber\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '23cc23e59e6ac92345978694bab0e2f0';
export default node;
