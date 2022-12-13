/**
 * @generated SignedSource<<08ba64d3375c14e3a6d48d489134ccbf>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type settingsRoutes_EditProfileRouteQuery$variables = {};
export type settingsRoutes_EditProfileRouteQuery$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"SettingsEditProfileRoute_me">;
  } | null;
};
export type settingsRoutes_EditProfileRouteQuery = {
  response: settingsRoutes_EditProfileRouteQuery$data;
  variables: settingsRoutes_EditProfileRouteQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "settingsRoutes_EditProfileRouteQuery",
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
            "name": "SettingsEditProfileRoute_me"
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
    "name": "settingsRoutes_EditProfileRouteQuery",
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
            "concreteType": "MyLocation",
            "kind": "LinkedField",
            "name": "location",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "display",
                "storageKey": null
              },
              (v0/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "city",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "state",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "country",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "profession",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "shareFollows",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "priceRange",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "priceRangeMin",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "priceRangeMax",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "CollectorProfileType",
            "kind": "LinkedField",
            "name": "collectorProfile",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "UserInterest",
                "kind": "LinkedField",
                "name": "userInterests",
                "plural": true,
                "selections": [
                  (v1/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "category",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "interest",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v1/*: any*/),
                          (v3/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "slug",
                            "storageKey": null
                          }
                        ],
                        "type": "Artist",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v0/*: any*/)
                        ],
                        "type": "Node",
                        "abstractKey": "__isNode"
                      }
                    ],
                    "storageKey": null
                  },
                  (v0/*: any*/)
                ],
                "storageKey": null
              },
              (v0/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "email",
            "storageKey": null
          },
          (v3/*: any*/),
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
              (v2/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  (v1/*: any*/),
                  (v3/*: any*/)
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
              (v2/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  (v1/*: any*/),
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
              (v2/*: any*/)
            ],
            "storageKey": "secondFactors(kinds:[\"backup\"])"
          },
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
              (v0/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Image",
            "kind": "LinkedField",
            "name": "icon",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": [
                  {
                    "kind": "Literal",
                    "name": "height",
                    "value": 200
                  },
                  {
                    "kind": "Literal",
                    "name": "version",
                    "value": "large_square"
                  },
                  {
                    "kind": "Literal",
                    "name": "width",
                    "value": 200
                  }
                ],
                "concreteType": "ResizedImageUrl",
                "kind": "LinkedField",
                "name": "resized",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "src",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "srcSet",
                    "storageKey": null
                  }
                ],
                "storageKey": "resized(height:200,version:\"large_square\",width:200)"
              },
              {
                "alias": null,
                "args": [
                  {
                    "kind": "Literal",
                    "name": "version",
                    "value": "thumbnail"
                  }
                ],
                "kind": "ScalarField",
                "name": "url",
                "storageKey": "url(version:\"thumbnail\")"
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "otherRelevantPositions",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "bio",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "emailConfirmed",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "identityVerified",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "canRequestEmailConfirmation",
            "storageKey": null
          },
          (v0/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "8696d966ba7a6485bdfae6e9eec72239",
    "id": null,
    "metadata": {},
    "name": "settingsRoutes_EditProfileRouteQuery",
    "operationKind": "query",
    "text": "query settingsRoutes_EditProfileRouteQuery {\n  me {\n    ...SettingsEditProfileRoute_me\n    id\n  }\n}\n\nfragment AppSecondFactor_me on Me {\n  hasSecondFactorEnabled\n  appSecondFactors: secondFactors(kinds: [app]) {\n    __typename\n    ... on AppSecondFactor {\n      __typename\n      internalID\n      name\n    }\n  }\n}\n\nfragment CollectorProfileHeaderAvatar_me on Me {\n  icon {\n    resized(height: 200, width: 200, version: \"large_square\") {\n      src\n      srcSet\n    }\n  }\n}\n\nfragment SettingsEditProfileAboutYou_me on Me {\n  location {\n    display\n    id\n  }\n  profession\n  shareFollows\n  priceRange\n  priceRangeMin\n  priceRangeMax\n}\n\nfragment SettingsEditProfileArtistsYouCollect_me on Me {\n  collectorProfile {\n    userInterests {\n      internalID\n      category\n      interest {\n        __typename\n        ... on Artist {\n          internalID\n          name\n          slug\n        }\n        ... on Node {\n          __isNode: __typename\n          id\n        }\n      }\n      id\n    }\n    id\n  }\n}\n\nfragment SettingsEditProfileFields_me on Me {\n  ...CollectorProfileHeaderAvatar_me\n  name\n  profession\n  otherRelevantPositions\n  bio\n  icon {\n    url(version: \"thumbnail\")\n  }\n  location {\n    display\n    city\n    state\n    country\n    id\n  }\n  email\n  emailConfirmed\n  identityVerified\n  canRequestEmailConfirmation\n}\n\nfragment SettingsEditProfileRoute_me on Me {\n  ...SettingsEditProfileAboutYou_me\n  ...SettingsEditProfileArtistsYouCollect_me\n  ...SettingsEditSettingsInformation_me\n  ...SettingsEditSettingsPassword_me\n  ...SettingsEditSettingsTwoFactor_me\n  ...SettingsEditSettingsLinkedAccounts_me\n  ...SettingsEditProfileFields_me\n}\n\nfragment SettingsEditSettingsInformation_me on Me {\n  email\n  name\n  paddleNumber\n  phone\n  priceRange\n  priceRangeMin\n  priceRangeMax\n}\n\nfragment SettingsEditSettingsLinkedAccounts_me on Me {\n  authentications {\n    provider\n    id\n  }\n}\n\nfragment SettingsEditSettingsPassword_me on Me {\n  hasPassword\n}\n\nfragment SettingsEditSettingsTwoFactorBackupCodes_me on Me {\n  backupSecondFactors: secondFactors(kinds: [backup]) {\n    __typename\n    ... on BackupSecondFactor {\n      __typename\n    }\n  }\n}\n\nfragment SettingsEditSettingsTwoFactor_me on Me {\n  hasSecondFactorEnabled\n  ...AppSecondFactor_me\n  ...SmsSecondFactor_me\n  ...SettingsEditSettingsTwoFactorBackupCodes_me\n}\n\nfragment SmsSecondFactor_me on Me {\n  email\n  hasSecondFactorEnabled\n  smsSecondFactors: secondFactors(kinds: [sms]) {\n    __typename\n    ... on SmsSecondFactor {\n      __typename\n      internalID\n      formattedPhoneNumber\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "2af6af652354dd9f68b4325960bff2df";

export default node;
