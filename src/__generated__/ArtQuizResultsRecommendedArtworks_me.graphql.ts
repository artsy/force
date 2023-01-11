/**
 * @generated SignedSource<<bb8169966a62e6f0d79835eea5808b80>>
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
            } | null;
          } | null> | null;
        } | null;
      } | null;
      readonly related: ReadonlyArray<{
        readonly internalID: string;
        readonly " $fragmentSpreads": FragmentRefs<"GridItem_artwork">;
      } | null> | null;
    }>;
  };
  readonly " $fragmentType": "ArtQuizResultsRecommendedArtworks_me";
};
export type ArtQuizResultsRecommendedArtworks_me$key = {
  readonly " $data"?: ArtQuizResultsRecommendedArtworks_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtQuizResultsRecommendedArtworks_me">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
};
return {
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
                  "args": null,
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
                            (v0/*: any*/)
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
            },
            {
              "alias": null,
              "args": [
                {
                  "kind": "Variable",
                  "name": "size",
                  "variableName": "limit"
                }
              ],
              "concreteType": "Artwork",
              "kind": "LinkedField",
              "name": "related",
              "plural": true,
              "selections": [
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "GridItem_artwork"
                },
                (v0/*: any*/)
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

(node as any).hash = "92679aedabc0cbe316acf58870a33784";

export default node;
