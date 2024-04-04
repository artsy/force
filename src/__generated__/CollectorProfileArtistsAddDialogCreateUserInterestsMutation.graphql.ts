/**
 * @generated SignedSource<<7625eb852e24fe7e1ddb5d3294a48e37>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UserInterestCategory = "COLLECTED_BEFORE" | "INTERESTED_IN_COLLECTING" | "%future added value";
export type UserInterestInterestType = "ARTIST" | "GENE" | "%future added value";
export type CreateUserInterestsMutationInput = {
  clientMutationId?: string | null | undefined;
  userInterests: ReadonlyArray<UserInterestInput>;
};
export type UserInterestInput = {
  anonymousSessionId?: string | null | undefined;
  body?: string | null | undefined;
  category: UserInterestCategory;
  interestId: string;
  interestType: UserInterestInterestType;
  private?: boolean | null | undefined;
  sessionID?: string | null | undefined;
};
export type CollectorProfileArtistsAddDialogCreateUserInterestsMutation$variables = {
  input: CreateUserInterestsMutationInput;
};
export type CollectorProfileArtistsAddDialogCreateUserInterestsMutation$data = {
  readonly createUserInterests: {
    readonly me: {
      readonly userInterestsConnection: {
        readonly edges: ReadonlyArray<{
          readonly " $fragmentSpreads": FragmentRefs<"CollectorProfileArtistsListArtist_userInterestEdge">;
        } | null | undefined> | null | undefined;
      } | null | undefined;
    };
  } | null | undefined;
};
export type CollectorProfileArtistsAddDialogCreateUserInterestsMutation = {
  response: CollectorProfileArtistsAddDialogCreateUserInterestsMutation$data;
  variables: CollectorProfileArtistsAddDialogCreateUserInterestsMutation$variables;
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
v2 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
  },
  {
    "kind": "Literal",
    "name": "interestType",
    "value": "ARTIST"
  }
],
v3 = {
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
    "name": "CollectorProfileArtistsAddDialogCreateUserInterestsMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateUserInterestsMutationPayload",
        "kind": "LinkedField",
        "name": "createUserInterests",
        "plural": false,
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
                "args": (v2/*: any*/),
                "concreteType": "UserInterestConnection",
                "kind": "LinkedField",
                "name": "userInterestsConnection",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "UserInterestEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "args": null,
                        "kind": "FragmentSpread",
                        "name": "CollectorProfileArtistsListArtist_userInterestEdge"
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "userInterestsConnection(first:10,interestType:\"ARTIST\")"
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
    "name": "CollectorProfileArtistsAddDialogCreateUserInterestsMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateUserInterestsMutationPayload",
        "kind": "LinkedField",
        "name": "createUserInterests",
        "plural": false,
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
                "args": (v2/*: any*/),
                "concreteType": "UserInterestConnection",
                "kind": "LinkedField",
                "name": "userInterestsConnection",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "UserInterestEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "private",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": null,
                        "kind": "LinkedField",
                        "name": "node",
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
                                "name": "href",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "slug",
                                "storageKey": null
                              },
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
                                "name": "initials",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "formattedNationalityAndBirthday",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "ArtistCounts",
                                "kind": "LinkedField",
                                "name": "counts",
                                "plural": false,
                                "selections": [
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "artworks",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "forSaleArtworks",
                                    "storageKey": null
                                  }
                                ],
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "Artwork",
                                "kind": "LinkedField",
                                "name": "coverArtwork",
                                "plural": false,
                                "selections": [
                                  {
                                    "alias": "avatar",
                                    "args": null,
                                    "concreteType": "Image",
                                    "kind": "LinkedField",
                                    "name": "image",
                                    "plural": false,
                                    "selections": [
                                      {
                                        "alias": null,
                                        "args": [
                                          {
                                            "kind": "Literal",
                                            "name": "height",
                                            "value": 45
                                          },
                                          {
                                            "kind": "Literal",
                                            "name": "width",
                                            "value": 45
                                          }
                                        ],
                                        "concreteType": "CroppedImageUrl",
                                        "kind": "LinkedField",
                                        "name": "cropped",
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
                                        "storageKey": "cropped(height:45,width:45)"
                                      }
                                    ],
                                    "storageKey": null
                                  },
                                  (v3/*: any*/)
                                ],
                                "storageKey": null
                              }
                            ],
                            "type": "Artist",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v3/*: any*/)
                            ],
                            "type": "Node",
                            "abstractKey": "__isNode"
                          }
                        ],
                        "storageKey": null
                      },
                      (v3/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "userInterestsConnection(first:10,interestType:\"ARTIST\")"
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
    "cacheID": "acae6199fc9d0bafbbd9f4087ddd8169",
    "id": null,
    "metadata": {},
    "name": "CollectorProfileArtistsAddDialogCreateUserInterestsMutation",
    "operationKind": "mutation",
    "text": "mutation CollectorProfileArtistsAddDialogCreateUserInterestsMutation(\n  $input: CreateUserInterestsMutationInput!\n) {\n  createUserInterests(input: $input) {\n    me {\n      userInterestsConnection(first: 10, interestType: ARTIST) {\n        edges {\n          ...CollectorProfileArtistsListArtist_userInterestEdge\n          id\n        }\n      }\n      id\n    }\n  }\n}\n\nfragment CollectorProfileArtistsListArtist_userInterestEdge on UserInterestEdge {\n  private\n  node {\n    __typename\n    ... on Artist {\n      ...EntityHeaderArtist_artist\n      internalID\n      name\n      counts {\n        artworks\n      }\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n}\n\nfragment EntityHeaderArtist_artist on Artist {\n  internalID\n  href\n  slug\n  name\n  initials\n  formattedNationalityAndBirthday\n  counts {\n    artworks\n    forSaleArtworks\n  }\n  coverArtwork {\n    avatar: image {\n      cropped(width: 45, height: 45) {\n        src\n        srcSet\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "6f9b617a00a8c79b232a2bc2fa88874b";

export default node;
