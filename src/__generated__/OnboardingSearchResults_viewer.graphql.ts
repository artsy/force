/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type OnboardingSearchResults_viewer = {
    readonly matchConnection: {
        readonly edges: ReadonlyArray<{
            readonly node: ({
                readonly __typename: "Artist";
                readonly internalID: string;
                readonly " $fragmentRefs": FragmentRefs<"EntityHeaderArtist_artist">;
            } | {
                readonly __typename: "Profile";
                readonly internalID: string;
                readonly owner: {
                    readonly __typename: "Partner";
                    readonly " $fragmentRefs": FragmentRefs<"EntityHeaderPartner_partner">;
                } | {
                    /*This will never be '%other', but we need some
                    value in case none of the concrete values match.*/
                    readonly __typename: "%other";
                };
                readonly " $fragmentRefs": FragmentRefs<"FollowProfileButton_profile">;
            } | {
                /*This will never be '%other', but we need some
                value in case none of the concrete values match.*/
                readonly __typename: "%other";
            }) | null;
        } | null> | null;
    } | null;
    readonly " $refType": "OnboardingSearchResults_viewer";
};
export type OnboardingSearchResults_viewer$data = OnboardingSearchResults_viewer;
export type OnboardingSearchResults_viewer$key = {
    readonly " $data"?: OnboardingSearchResults_viewer$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"OnboardingSearchResults_viewer">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
};
return {
  "argumentDefinitions": [
    {
      "defaultValue": [],
      "kind": "LocalArgument",
      "name": "entities"
    },
    {
      "defaultValue": "",
      "kind": "LocalArgument",
      "name": "term"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "OnboardingSearchResults_viewer",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Variable",
          "name": "entities",
          "variableName": "entities"
        },
        {
          "kind": "Literal",
          "name": "first",
          "value": 10
        },
        {
          "kind": "Literal",
          "name": "mode",
          "value": "AUTOSUGGEST"
        },
        {
          "kind": "Variable",
          "name": "term",
          "variableName": "term"
        }
      ],
      "concreteType": "MatchConnection",
      "kind": "LinkedField",
      "name": "matchConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "MatchEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": null,
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                (v0/*: any*/),
                {
                  "kind": "InlineFragment",
                  "selections": [
                    (v1/*: any*/),
                    {
                      "args": null,
                      "kind": "FragmentSpread",
                      "name": "EntityHeaderArtist_artist"
                    }
                  ],
                  "type": "Artist",
                  "abstractKey": null
                },
                {
                  "kind": "InlineFragment",
                  "selections": [
                    (v1/*: any*/),
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
                        }
                      ],
                      "storageKey": null
                    },
                    {
                      "args": null,
                      "kind": "FragmentSpread",
                      "name": "FollowProfileButton_profile"
                    }
                  ],
                  "type": "Profile",
                  "abstractKey": null
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
  "type": "Viewer",
  "abstractKey": null
};
})();
(node as any).hash = '7f56c00baf526e9d490ab6e2413c0567';
export default node;
