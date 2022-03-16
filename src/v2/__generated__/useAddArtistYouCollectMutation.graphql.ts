/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UserInterestCategory = "COLLECTED_BEFORE" | "INTERESTED_IN_COLLECTING" | "%future added value";
export type UserInterestInterestType = "ARTIST" | "GENE" | "%future added value";
export type CreateUserInterestMutationInput = {
    anonymousSessionId?: string | null;
    body?: string | null;
    category: UserInterestCategory;
    clientMutationId?: string | null;
    interestId: string;
    interestType: UserInterestInterestType;
    sessionID?: string | null;
};
export type useAddArtistYouCollectMutationVariables = {
    input: CreateUserInterestMutationInput;
};
export type useAddArtistYouCollectMutationResponse = {
    readonly createUserInterest: {
        readonly clientMutationId: string | null;
        readonly me: {
            readonly " $fragmentRefs": FragmentRefs<"SettingsEditProfileArtistsYouCollect_me">;
        };
    } | null;
};
export type useAddArtistYouCollectMutation = {
    readonly response: useAddArtistYouCollectMutationResponse;
    readonly variables: useAddArtistYouCollectMutationVariables;
};



/*
mutation useAddArtistYouCollectMutation(
  $input: CreateUserInterestMutationInput!
) {
  createUserInterest(input: $input) {
    clientMutationId
    me {
      ...SettingsEditProfileArtistsYouCollect_me
      id
    }
  }
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
          __isNode: __typename
          id
        }
      }
      id
    }
    id
  }
}
*/

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
    "name": "useAddArtistYouCollectMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateUserInterestMutationPayload",
        "kind": "LinkedField",
        "name": "createUserInterest",
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
    "name": "useAddArtistYouCollectMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateUserInterestMutationPayload",
        "kind": "LinkedField",
        "name": "createUserInterest",
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
    "cacheID": "d866250a124bafb576506b20e0f44567",
    "id": null,
    "metadata": {},
    "name": "useAddArtistYouCollectMutation",
    "operationKind": "mutation",
    "text": "mutation useAddArtistYouCollectMutation(\n  $input: CreateUserInterestMutationInput!\n) {\n  createUserInterest(input: $input) {\n    clientMutationId\n    me {\n      ...SettingsEditProfileArtistsYouCollect_me\n      id\n    }\n  }\n}\n\nfragment SettingsEditProfileArtistsYouCollect_me on Me {\n  collectorProfile {\n    userInterests {\n      internalID\n      category\n      interest {\n        __typename\n        ... on Artist {\n          internalID\n          name\n          slug\n        }\n        ... on Node {\n          __isNode: __typename\n          id\n        }\n      }\n      id\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '8e55820b57715b8aa924a1784e37008d';
export default node;
