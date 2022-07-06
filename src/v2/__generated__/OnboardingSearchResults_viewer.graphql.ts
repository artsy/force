/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type OnboardingSearchResults_viewer = {
    readonly searchConnection: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly name?: string | null | undefined;
                readonly internalID?: string | undefined;
                readonly " $fragmentRefs": FragmentRefs<"EntityHeaderArtist_artist">;
            } | null;
        } | null> | null;
    } | null;
    readonly " $refType": "OnboardingSearchResults_viewer";
};
export type OnboardingSearchResults_viewer$data = OnboardingSearchResults_viewer;
export type OnboardingSearchResults_viewer$key = {
    readonly " $data"?: OnboardingSearchResults_viewer$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"OnboardingSearchResults_viewer">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": "",
      "kind": "LocalArgument",
      "name": "query"
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
          "kind": "Literal",
          "name": "entities",
          "value": [
            "ARTIST"
          ]
        },
        {
          "kind": "Literal",
          "name": "first",
          "value": 10
        },
        {
          "kind": "Variable",
          "name": "query",
          "variableName": "query"
        }
      ],
      "concreteType": "SearchableConnection",
      "kind": "LinkedField",
      "name": "searchConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "SearchableEdge",
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
      "storageKey": null
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};
(node as any).hash = '57e6e3d2b0b863c1dc8cb78f5b5193be';
export default node;
