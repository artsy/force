/**
 * @generated SignedSource<<2c0246d1e63f77b021a23856cf1a9668>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkRecommendationsArtworksGrid_me$data = {
  readonly artworkRecommendations: {
    readonly pageInfo: {
      readonly endCursor: string | null | undefined;
      readonly hasNextPage: boolean;
    };
    readonly totalCount: number | null | undefined;
    readonly " $fragmentSpreads": FragmentRefs<"ArtworkGrid_artworks">;
  } | null | undefined;
  readonly " $fragmentType": "ArtworkRecommendationsArtworksGrid_me";
};
export type ArtworkRecommendationsArtworksGrid_me$key = {
  readonly " $data"?: ArtworkRecommendationsArtworksGrid_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkRecommendationsArtworksGrid_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "first"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkRecommendationsArtworksGrid_me",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Variable",
          "name": "first",
          "variableName": "first"
        }
      ],
      "concreteType": "ArtworkConnection",
      "kind": "LinkedField",
      "name": "artworkRecommendations",
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
          "args": null,
          "kind": "FragmentSpread",
          "name": "ArtworkGrid_artworks"
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
              "name": "hasNextPage",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "endCursor",
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

(node as any).hash = "d7db5bd62d855765ebf69ea0b73e74d9";

export default node;
