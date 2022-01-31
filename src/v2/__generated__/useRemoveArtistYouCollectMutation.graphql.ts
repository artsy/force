/**
 * @generated SignedSource<<cbf8931093d17171245399eb58b1b11f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DeleteUserInterestMutationInput = {
  anonymousSessionId?: string | null;
  clientMutationId?: string | null;
  id: string;
  sessionID?: string | null;
};
export type useRemoveArtistYouCollectMutation$variables = {
  input: DeleteUserInterestMutationInput;
};
export type useRemoveArtistYouCollectMutation$data = {
  readonly deleteUserInterest: {
    readonly clientMutationId: string | null;
    readonly me: {
      readonly " $fragmentSpreads": FragmentRefs<"SettingsEditProfileArtistsYouCollect_me" | "SettingsEditProfileYourGalleryIntro_me">;
    };
  } | null;
};
export type useRemoveArtistYouCollectMutation = {
  variables: useRemoveArtistYouCollectMutation$variables;
  response: useRemoveArtistYouCollectMutation$data;
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
    "name": "useRemoveArtistYouCollectMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "DeleteUserInterestMutationPayload",
        "kind": "LinkedField",
        "name": "deleteUserInterest",
        "plural": false,
        "selections": [
          (v2/*: any*/),
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
                "name": "SettingsEditProfileArtistsYouCollect_me"
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "SettingsEditProfileYourGalleryIntro_me"
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
    "name": "useRemoveArtistYouCollectMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "DeleteUserInterestMutationPayload",
        "kind": "LinkedField",
        "name": "deleteUserInterest",
        "plural": false,
        "selections": [
          (v2/*: any*/),
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
                      (v3/*: any*/),
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
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v3/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "name",
                                "storageKey": null
                              },
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
                              (v4/*: any*/)
                            ],
                            "type": "Node",
                            "abstractKey": "__isNode"
                          }
                        ],
                        "storageKey": null
                      },
                      (v4/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v4/*: any*/)
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
              (v4/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "311470e90a00163bcc8766816885bea5",
    "id": null,
    "metadata": {},
    "name": "useRemoveArtistYouCollectMutation",
    "operationKind": "mutation",
    "text": "mutation useRemoveArtistYouCollectMutation(\n  $input: DeleteUserInterestMutationInput!\n) {\n  deleteUserInterest(input: $input) {\n    clientMutationId\n    me {\n      ...SettingsEditProfileArtistsYouCollect_me\n      ...SettingsEditProfileYourGalleryIntro_me\n      id\n    }\n  }\n}\n\nfragment SettingsEditProfileArtistsYouCollect_me on Me {\n  collectorProfile {\n    userInterests {\n      internalID\n      category\n      interest {\n        __typename\n        ... on Artist {\n          internalID\n          name\n          slug\n        }\n        ... on Node {\n          __isNode: __typename\n          id\n        }\n      }\n      id\n    }\n    id\n  }\n}\n\nfragment SettingsEditProfileYourGalleryIntro_me on Me {\n  inquiryIntroduction\n}\n"
  }
};
})();

(node as any).hash = "b120d7d424d14d89557158a3342b8729";

export default node;
