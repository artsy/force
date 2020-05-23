/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type TwoFactorAuthenticationRefetchQueryVariables = {};
export type TwoFactorAuthenticationRefetchQueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"TwoFactorAuthentication_me">;
    } | null;
};
export type TwoFactorAuthenticationRefetchQuery = {
    readonly response: TwoFactorAuthenticationRefetchQueryResponse;
    readonly variables: TwoFactorAuthenticationRefetchQueryVariables;
};



/*
query TwoFactorAuthenticationRefetchQuery {
  me {
    ...TwoFactorAuthentication_me
    id
  }
}

fragment AppSecondFactor_me on Me {
  hasSecondFactorEnabled
  appSecondFactors: secondFactors(kinds: [app]) {
    __typename
    ... on AppSecondFactor {
      __typename
      internalID
      name
    }
  }
}

fragment BackupSecondFactor_me on Me {
  backupSecondFactors: secondFactors(kinds: [backup]) {
    __typename
    ... on BackupSecondFactor {
      __typename
    }
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

fragment TwoFactorAuthentication_me on Me {
  hasSecondFactorEnabled
  ...AppSecondFactor_me
  ...SmsSecondFactor_me
  ...BackupSecondFactor_me
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__typename",
  "args": null,
  "storageKey": null
},
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "internalID",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "TwoFactorAuthenticationRefetchQuery",
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
            "name": "TwoFactorAuthentication_me",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "TwoFactorAuthenticationRefetchQuery",
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
            "alias": "appSecondFactors",
            "name": "secondFactors",
            "storageKey": "secondFactors(kinds:[\"app\"])",
            "args": [
              {
                "kind": "Literal",
                "name": "kinds",
                "value": [
                  "app"
                ]
              }
            ],
            "concreteType": null,
            "plural": true,
            "selections": [
              (v0/*: any*/),
              {
                "kind": "InlineFragment",
                "type": "AppSecondFactor",
                "selections": [
                  (v0/*: any*/),
                  (v1/*: any*/),
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "name",
                    "args": null,
                    "storageKey": null
                  }
                ]
              }
            ]
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
                  (v1/*: any*/),
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
            "kind": "LinkedField",
            "alias": "backupSecondFactors",
            "name": "secondFactors",
            "storageKey": "secondFactors(kinds:[\"backup\"])",
            "args": [
              {
                "kind": "Literal",
                "name": "kinds",
                "value": [
                  "backup"
                ]
              }
            ],
            "concreteType": null,
            "plural": true,
            "selections": [
              (v0/*: any*/),
              {
                "kind": "InlineFragment",
                "type": "BackupSecondFactor",
                "selections": [
                  (v0/*: any*/)
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
    "name": "TwoFactorAuthenticationRefetchQuery",
    "id": null,
    "text": "query TwoFactorAuthenticationRefetchQuery {\n  me {\n    ...TwoFactorAuthentication_me\n    id\n  }\n}\n\nfragment AppSecondFactor_me on Me {\n  hasSecondFactorEnabled\n  appSecondFactors: secondFactors(kinds: [app]) {\n    __typename\n    ... on AppSecondFactor {\n      __typename\n      internalID\n      name\n    }\n  }\n}\n\nfragment BackupSecondFactor_me on Me {\n  backupSecondFactors: secondFactors(kinds: [backup]) {\n    __typename\n    ... on BackupSecondFactor {\n      __typename\n    }\n  }\n}\n\nfragment SmsSecondFactor_me on Me {\n  hasSecondFactorEnabled\n  smsSecondFactors: secondFactors(kinds: [sms]) {\n    __typename\n    ... on SmsSecondFactor {\n      __typename\n      internalID\n      formattedPhoneNumber\n    }\n  }\n}\n\nfragment TwoFactorAuthentication_me on Me {\n  hasSecondFactorEnabled\n  ...AppSecondFactor_me\n  ...SmsSecondFactor_me\n  ...BackupSecondFactor_me\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'b4bc1c478f26b9cef75a7e29d38d40d8';
export default node;
