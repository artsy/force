/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type settingsRoutes_SettingsEditProfileRouteQueryVariables = {};
export type settingsRoutes_SettingsEditProfileRouteQueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"SettingsEditProfileRoute_me">;
    } | null;
};
export type settingsRoutes_SettingsEditProfileRouteQuery = {
    readonly response: settingsRoutes_SettingsEditProfileRouteQueryResponse;
    readonly variables: settingsRoutes_SettingsEditProfileRouteQueryVariables;
};



/*
query settingsRoutes_SettingsEditProfileRouteQuery {
  me {
    ...SettingsEditProfileRoute_me
    id
  }
}

fragment SettingsEditProfileAboutYou_me on Me {
  location {
    display
    id
  }
  profession
  shareFollows
}

fragment SettingsEditProfileArtistsYouCollect_me on Me {
  collectorProfile {
    userInterests {
      internalID
      category
      interest {
        __typename
        ... on Artist {
          internalID
          name
          slug
        }
        ... on Node {
          id
        }
      }
      id
    }
    id
  }
}

fragment SettingsEditProfileRoute_me on Me {
  ...UserInformation_me
  ...SettingsEditProfileAboutYou_me
  ...SettingsEditProfileArtistsYouCollect_me
  ...SettingsEditProfileYourGalleryIntro_me
}

fragment SettingsEditProfileYourGalleryIntro_me on Me {
  inquiryIntroduction
}

fragment UserInformation_me on Me {
  email
  name
  paddleNumber
  phone
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
  "name": "id",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "settingsRoutes_SettingsEditProfileRouteQuery",
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
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "settingsRoutes_SettingsEditProfileRouteQuery",
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
              (v1/*: any*/)
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
                  (v2/*: any*/),
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
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "__typename",
                        "storageKey": null
                      },
                      (v1/*: any*/),
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v2/*: any*/),
                          (v0/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "slug",
                            "storageKey": null
                          }
                        ],
                        "type": "Artist"
                      }
                    ],
                    "storageKey": null
                  },
                  (v1/*: any*/)
                ],
                "storageKey": null
              },
              (v1/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "inquiryIntroduction",
            "storageKey": null
          },
          (v1/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "settingsRoutes_SettingsEditProfileRouteQuery",
    "operationKind": "query",
    "text": "query settingsRoutes_SettingsEditProfileRouteQuery {\n  me {\n    ...SettingsEditProfileRoute_me\n    id\n  }\n}\n\nfragment SettingsEditProfileAboutYou_me on Me {\n  location {\n    display\n    id\n  }\n  profession\n  shareFollows\n}\n\nfragment SettingsEditProfileArtistsYouCollect_me on Me {\n  collectorProfile {\n    userInterests {\n      internalID\n      category\n      interest {\n        __typename\n        ... on Artist {\n          internalID\n          name\n          slug\n        }\n        ... on Node {\n          id\n        }\n      }\n      id\n    }\n    id\n  }\n}\n\nfragment SettingsEditProfileRoute_me on Me {\n  ...UserInformation_me\n  ...SettingsEditProfileAboutYou_me\n  ...SettingsEditProfileArtistsYouCollect_me\n  ...SettingsEditProfileYourGalleryIntro_me\n}\n\nfragment SettingsEditProfileYourGalleryIntro_me on Me {\n  inquiryIntroduction\n}\n\nfragment UserInformation_me on Me {\n  email\n  name\n  paddleNumber\n  phone\n}\n"
  }
};
})();
(node as any).hash = 'fccb8f8aa271809e4c65c8d30166e79d';
export default node;
