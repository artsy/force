/**
 * @generated SignedSource<<2d3c132048a2efb4c9ccf8704c03f414>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type OnboardingOrderedSet_orderedSet$data = {
  readonly orderedItemsConnection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly __typename: "Artist";
        readonly internalID: string;
        readonly " $fragmentSpreads": FragmentRefs<"EntityHeaderArtist_artist">;
      } | {
        readonly __typename: "Profile";
        readonly internalID: string;
        readonly owner: {
          readonly __typename: "Partner";
          readonly " $fragmentSpreads": FragmentRefs<"EntityHeaderPartner_partner">;
        } | {
          // This will never be '%other', but we need some
          // value in case none of the concrete values match.
          readonly __typename: "%other";
        };
        readonly " $fragmentSpreads": FragmentRefs<"FollowProfileButton_profile">;
      } | {
        // This will never be '%other', but we need some
        // value in case none of the concrete values match.
        readonly __typename: "%other";
      } | null;
    } | null> | null;
  };
  readonly " $fragmentType": "OnboardingOrderedSet_orderedSet";
};
export type OnboardingOrderedSet_orderedSet$key = {
  readonly " $data"?: OnboardingOrderedSet_orderedSet$data;
  readonly " $fragmentSpreads": FragmentRefs<"OnboardingOrderedSet_orderedSet">;
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
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "OnboardingOrderedSet_orderedSet",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 50
        }
      ],
      "concreteType": "OrderedSetItemConnection",
      "kind": "LinkedField",
      "name": "orderedItemsConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "OrderedSetItemEdge",
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
                      "args": null,
                      "kind": "FragmentSpread",
                      "name": "FollowProfileButton_profile"
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
                        }
                      ],
                      "storageKey": null
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
      "storageKey": "orderedItemsConnection(first:50)"
    }
  ],
  "type": "OrderedSet",
  "abstractKey": null
};
})();

(node as any).hash = "b27bcdc1d86f123ff879366341640311";

export default node;
