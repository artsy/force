/**
 * @generated SignedSource<<8332f97032bb8bd5c5a0ee92afe375fc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtQuizResultsRecommendedArtworks_me$data = {
  readonly quiz: {
    readonly savedArtworks: ReadonlyArray<{
      readonly layer: {
        readonly artworksConnection: {
          readonly edges: ReadonlyArray<{
            readonly node: {
              readonly internalID: string;
              readonly " $fragmentSpreads": FragmentRefs<"GridItem_artwork">;
            } | null;
          } | null> | null;
        } | null;
      } | null;
    }>;
  };
  readonly " $fragmentType": "ArtQuizResultsRecommendedArtworks_me";
};
export type ArtQuizResultsRecommendedArtworks_me$key = {
  readonly " $data"?: ArtQuizResultsRecommendedArtworks_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtQuizResultsRecommendedArtworks_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "limit"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtQuizResultsRecommendedArtworks_me",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Quiz",
      "kind": "LinkedField",
      "name": "quiz",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Artwork",
          "kind": "LinkedField",
          "name": "savedArtworks",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": [
                {
                  "kind": "Literal",
                  "name": "id",
                  "value": "main"
                }
              ],
              "concreteType": "ArtworkLayer",
              "kind": "LinkedField",
              "name": "layer",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": [
                    {
                      "kind": "Variable",
                      "name": "first",
                      "variableName": "limit"
                    }
                  ],
                  "concreteType": "ArtworkConnection",
                  "kind": "LinkedField",
                  "name": "artworksConnection",
                  "plural": false,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "concreteType": "ArtworkEdge",
                      "kind": "LinkedField",
                      "name": "edges",
                      "plural": true,
                      "selections": [
                        {
                          "alias": null,
                          "args": null,
                          "concreteType": "Artwork",
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
                              "args": null,
                              "kind": "FragmentSpread",
                              "name": "GridItem_artwork"
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
              "storageKey": "layer(id:\"main\")"
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

(node as any).hash = "815a9dddd6359196c24dd275a23c5225";

export default node;
