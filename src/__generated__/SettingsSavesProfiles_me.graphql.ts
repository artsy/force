/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SettingsSavesProfiles_me = {
    readonly followsAndSaves: {
        readonly profilesConnection: {
            readonly totalCount: number | null;
            readonly edges: ReadonlyArray<{
                readonly node: {
                    readonly internalID: string;
                    readonly profile: {
                        readonly name: string | null;
                        readonly href: string | null;
                        readonly avatar: {
                            readonly cropped: {
                                readonly src: string;
                                readonly srcSet: string;
                            } | null;
                        } | null;
                        readonly owner: {
                            readonly __typename: "Partner";
                            readonly " $fragmentRefs": FragmentRefs<"EntityHeaderPartner_partner">;
                        } | {
                            readonly __typename: "Fair";
                            readonly " $fragmentRefs": FragmentRefs<"EntityHeaderFair_fair">;
                        } | {
                            readonly __typename: "FairOrganizer";
                            readonly " $fragmentRefs": FragmentRefs<"EntityHeaderFairOrganizer_fairOrganizer">;
                        } | {
                            /*This will never be '%other', but we need some
                            value in case none of the concrete values match.*/
                            readonly __typename: "%other";
                        };
                    };
                } | null;
            } | null> | null;
        } | null;
    } | null;
    readonly " $refType": "SettingsSavesProfiles_me";
};
export type SettingsSavesProfiles_me$data = SettingsSavesProfiles_me;
export type SettingsSavesProfiles_me$key = {
    readonly " $data"?: SettingsSavesProfiles_me$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"SettingsSavesProfiles_me">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
};
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "after"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": null,
        "cursor": "after",
        "direction": "forward",
        "path": [
          "followsAndSaves",
          "profilesConnection"
        ]
      }
    ]
  },
  "name": "SettingsSavesProfiles_me",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "FollowsAndSaves",
      "kind": "LinkedField",
      "name": "followsAndSaves",
      "plural": false,
      "selections": [
        {
          "alias": "profilesConnection",
          "args": null,
          "concreteType": "FollowedProfileConnection",
          "kind": "LinkedField",
          "name": "__SettingsSavesProfiles_profilesConnection_connection",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "totalCount",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "FollowedProfileEdge",
              "kind": "LinkedField",
              "name": "edges",
              "plural": true,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "FollowedProfile",
                  "kind": "LinkedField",
                  "name": "node",
                  "plural": false,
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
                      "concreteType": "Profile",
                      "kind": "LinkedField",
                      "name": "profile",
                      "plural": false,
                      "selections": [
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
                          "name": "href",
                          "storageKey": null
                        },
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
                        {
                          "alias": null,
                          "args": null,
                          "concreteType": null,
                          "kind": "LinkedField",
                          "name": "owner",
                          "plural": false,
                          "selections": [
                            (v0/*: any*/),
                            {
                              "kind": "InlineFragment",
                              "selections": [
                                {
                                  "args": null,
                                  "kind": "FragmentSpread",
                                  "name": "EntityHeaderPartner_partner"
                                }
                              ],
                              "type": "Partner",
                              "abstractKey": null
                            },
                            {
                              "kind": "InlineFragment",
                              "selections": [
                                {
                                  "args": null,
                                  "kind": "FragmentSpread",
                                  "name": "EntityHeaderFair_fair"
                                }
                              ],
                              "type": "Fair",
                              "abstractKey": null
                            },
                            {
                              "kind": "InlineFragment",
                              "selections": [
                                {
                                  "args": null,
                                  "kind": "FragmentSpread",
                                  "name": "EntityHeaderFairOrganizer_fairOrganizer"
                                }
                              ],
                              "type": "FairOrganizer",
                              "abstractKey": null
                            }
                          ],
                          "storageKey": null
                        }
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
                  "name": "cursor",
                  "storageKey": null
                }
              ],
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "PageInfo",
              "kind": "LinkedField",
              "name": "pageInfo",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "endCursor",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "hasNextPage",
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
  "type": "Me",
  "abstractKey": null
};
})();
(node as any).hash = 'fb6a2df7011e9429e147931780a967eb';
export default node;
