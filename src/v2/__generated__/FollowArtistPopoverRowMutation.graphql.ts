/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type FollowArtistInput = {
    artistID: string;
    clientMutationId?: string | null;
    unfollow?: boolean | null;
};
export type FollowArtistPopoverRowMutationVariables = {
    input: FollowArtistInput;
    excludeArtistIds: Array<string | null>;
};
export type FollowArtistPopoverRowMutationResponse = {
    readonly followArtist: {
        readonly artist: {
            readonly id: string;
            readonly related: {
                readonly suggestedConnection: {
                    readonly edges: ReadonlyArray<{
                        readonly node: {
                            readonly id: string;
                            readonly internalID: string;
                            readonly name: string | null;
                            readonly formattedNationalityAndBirthday: string | null;
                            readonly image: {
                                readonly cropped: {
                                    readonly url: string;
                                } | null;
                            } | null;
                        } | null;
                    } | null> | null;
                } | null;
            } | null;
        } | null;
    } | null;
};
export type FollowArtistPopoverRowMutation = {
    readonly response: FollowArtistPopoverRowMutationResponse;
    readonly variables: FollowArtistPopoverRowMutationVariables;
};



/*
mutation FollowArtistPopoverRowMutation(
  $input: FollowArtistInput!
  $excludeArtistIds: [String]!
) {
  followArtist(input: $input) {
    artist {
      id
      related {
        suggestedConnection(first: 1, excludeFollowedArtists: true, excludeArtistIDs: $excludeArtistIds) {
          edges {
            node {
              id
              internalID
              name
              formattedNationalityAndBirthday
              image {
                cropped(width: 45, height: 45) {
                  url
                }
              }
            }
          }
        }
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input",
    "type": "FollowArtistInput!"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "excludeArtistIds",
    "type": "[String]!"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "FollowArtistPayload",
    "kind": "LinkedField",
    "name": "followArtist",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtistRelatedData",
            "kind": "LinkedField",
            "name": "related",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": [
                  {
                    "kind": "Variable",
                    "name": "excludeArtistIDs",
                    "variableName": "excludeArtistIds"
                  },
                  {
                    "kind": "Literal",
                    "name": "excludeFollowedArtists",
                    "value": true
                  },
                  {
                    "kind": "Literal",
                    "name": "first",
                    "value": 1
                  }
                ],
                "concreteType": "ArtistConnection",
                "kind": "LinkedField",
                "name": "suggestedConnection",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ArtistEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Artist",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v1/*: any*/),
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
                            "name": "name",
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
                                    "name": "url",
                                    "storageKey": null
                                  }
                                ],
                                "storageKey": "cropped(height:45,width:45)"
                              }
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "FollowArtistPopoverRowMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "FollowArtistPopoverRowMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "FollowArtistPopoverRowMutation",
    "operationKind": "mutation",
    "text": "mutation FollowArtistPopoverRowMutation(\n  $input: FollowArtistInput!\n  $excludeArtistIds: [String]!\n) {\n  followArtist(input: $input) {\n    artist {\n      id\n      related {\n        suggestedConnection(first: 1, excludeFollowedArtists: true, excludeArtistIDs: $excludeArtistIds) {\n          edges {\n            node {\n              id\n              internalID\n              name\n              formattedNationalityAndBirthday\n              image {\n                cropped(width: 45, height: 45) {\n                  url\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'e9b1a00dcc8137dfec48c9c65d2eb70b';
export default node;
