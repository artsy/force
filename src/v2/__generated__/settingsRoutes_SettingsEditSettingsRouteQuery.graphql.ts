/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type settingsRoutes_SettingsEditSettingsRouteQueryVariables = {};
export type settingsRoutes_SettingsEditSettingsRouteQueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"SettingsEditSettingsRoute_me">;
    } | null;
};
export type settingsRoutes_SettingsEditSettingsRouteQuery = {
    readonly response: settingsRoutes_SettingsEditSettingsRouteQueryResponse;
    readonly variables: settingsRoutes_SettingsEditSettingsRouteQueryVariables;
};



/*
query settingsRoutes_SettingsEditSettingsRouteQuery {
  me {
    ...SettingsEditSettingsRoute_me
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

fragment SettingsEditSettingsEmailPreferences_me on Me {
  emailFrequency
  id
}

fragment SettingsEditSettingsInformation_me on Me {
  email
  name
  paddleNumber
  phone
}

fragment SettingsEditSettingsLinkedAccounts_me on Me {
  authentications {
    provider
    id
  }
}

fragment SettingsEditSettingsPassword_me on Me {
  hasPassword
}

fragment SettingsEditSettingsRoute_me on Me {
  ...SettingsEditSettingsInformation_me
  ...SettingsEditSettingsPassword_me
  ...SettingsEditSettingsTwoFactor_me
  ...SettingsEditSettingsEmailPreferences_me
  ...SettingsEditSettingsLinkedAccounts_me
}

fragment SettingsEditSettingsTwoFactorBackupCodes_me on Me {
  backupSecondFactors: secondFactors(kinds: [backup]) {
    __typename
    ... on BackupSecondFactor {
      __typename
    }
  }
}

fragment SettingsEditSettingsTwoFactor_me on Me {
  hasSecondFactorEnabled
  ...AppSecondFactor_me
  ...SmsSecondFactor_me
  ...SettingsEditSettingsTwoFactorBackupCodes_me
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
  "name": "name",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
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
    "name": "settingsRoutes_SettingsEditSettingsRouteQuery",
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
            "name": "SettingsEditSettingsRoute_me"
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
    "name": "settingsRoutes_SettingsEditSettingsRouteQuery",
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
          (v0/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "paddleNumber",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "phone",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "hasPassword",
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
            "alias": "appSecondFactors",
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
            "kind": "LinkedField",
            "name": "secondFactors",
            "plural": true,
            "selections": [
              (v1/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  (v2/*: any*/),
                  (v0/*: any*/)
                ],
                "type": "AppSecondFactor",
                "abstractKey": null
              }
            ],
            "storageKey": "secondFactors(kinds:[\"app\"])"
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
              (v1/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  (v2/*: any*/),
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
            "alias": "backupSecondFactors",
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
            "kind": "LinkedField",
            "name": "secondFactors",
            "plural": true,
            "selections": [
              (v1/*: any*/)
            ],
            "storageKey": "secondFactors(kinds:[\"backup\"])"
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "emailFrequency",
            "storageKey": null
          },
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "AuthenticationType",
            "kind": "LinkedField",
            "name": "authentications",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "provider",
                "storageKey": null
              },
              (v3/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "617b32768b451ef2303dba1a596941cd",
    "id": null,
    "metadata": {},
    "name": "settingsRoutes_SettingsEditSettingsRouteQuery",
    "operationKind": "query",
    "text": "query settingsRoutes_SettingsEditSettingsRouteQuery {\n  me {\n    ...SettingsEditSettingsRoute_me\n    id\n  }\n}\n\nfragment AppSecondFactor_me on Me {\n  hasSecondFactorEnabled\n  appSecondFactors: secondFactors(kinds: [app]) {\n    __typename\n    ... on AppSecondFactor {\n      __typename\n      internalID\n      name\n    }\n  }\n}\n\nfragment SettingsEditSettingsEmailPreferences_me on Me {\n  emailFrequency\n  id\n}\n\nfragment SettingsEditSettingsInformation_me on Me {\n  email\n  name\n  paddleNumber\n  phone\n}\n\nfragment SettingsEditSettingsLinkedAccounts_me on Me {\n  authentications {\n    provider\n    id\n  }\n}\n\nfragment SettingsEditSettingsPassword_me on Me {\n  hasPassword\n}\n\nfragment SettingsEditSettingsRoute_me on Me {\n  ...SettingsEditSettingsInformation_me\n  ...SettingsEditSettingsPassword_me\n  ...SettingsEditSettingsTwoFactor_me\n  ...SettingsEditSettingsEmailPreferences_me\n  ...SettingsEditSettingsLinkedAccounts_me\n}\n\nfragment SettingsEditSettingsTwoFactorBackupCodes_me on Me {\n  backupSecondFactors: secondFactors(kinds: [backup]) {\n    __typename\n    ... on BackupSecondFactor {\n      __typename\n    }\n  }\n}\n\nfragment SettingsEditSettingsTwoFactor_me on Me {\n  hasSecondFactorEnabled\n  ...AppSecondFactor_me\n  ...SmsSecondFactor_me\n  ...SettingsEditSettingsTwoFactorBackupCodes_me\n}\n\nfragment SmsSecondFactor_me on Me {\n  hasSecondFactorEnabled\n  smsSecondFactors: secondFactors(kinds: [sms]) {\n    __typename\n    ... on SmsSecondFactor {\n      __typename\n      internalID\n      formattedPhoneNumber\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '87f56be623fa0ca771be8d9298fd830e';
export default node;
