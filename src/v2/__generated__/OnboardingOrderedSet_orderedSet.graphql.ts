/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type OnboardingOrderedSet_orderedSet = {
    readonly orderedItemsConnection: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly name?: string | null | undefined;
                readonly internalID?: string | undefined;
                readonly " $fragmentRefs": FragmentRefs<"EntityHeaderArtist_artist">;
            } | null;
        } | null> | null;
    };
    readonly " $refType": "OnboardingOrderedSet_orderedSet";
};
export type OnboardingOrderedSet_orderedSet$data = OnboardingOrderedSet_orderedSet;
export type OnboardingOrderedSet_orderedSet$key = {
    readonly " $data"?: OnboardingOrderedSet_orderedSet$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"OnboardingOrderedSet_orderedSet">;
};



const node: ReaderFragment = {
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
                {
                  "kind": "InlineFragment",
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
                      "name": "internalID",
                      "storageKey": null
                    },
                    {
                      "args": null,
                      "kind": "FragmentSpread",
                      "name": "EntityHeaderArtist_artist"
                    }
                  ],
                  "type": "Artist",
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
(node as any).hash = '744ce891870f559e1680069f33b7bd76';
export default node;
