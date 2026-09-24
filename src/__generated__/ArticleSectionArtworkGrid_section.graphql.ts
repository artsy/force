/**
 * @generated SignedSource<<fa5ffa529f2c16077f38fb53bd76a9b1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArticleSectionArtworkGrid_section$data = {
  readonly artworksConnection: {
    readonly artworkEdges: ReadonlyArray<{
      readonly __typename: "ArtworkEdge";
    } | null | undefined> | null | undefined;
    readonly " $fragmentSpreads": FragmentRefs<"ArtworkGrid_artworks">;
  } | null | undefined;
  readonly columns: number;
  readonly " $fragmentType": "ArticleSectionArtworkGrid_section";
};
export type ArticleSectionArtworkGrid_section$key = {
  readonly " $data"?: ArticleSectionArtworkGrid_section$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArticleSectionArtworkGrid_section">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArticleSectionArtworkGrid_section",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "columns",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ArtworkConnection",
      "kind": "LinkedField",
      "name": "artworksConnection",
      "plural": false,
      "selections": [
        {
          "alias": "artworkEdges",
          "args": null,
          "concreteType": "ArtworkEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "__typename",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ArtworkGrid_artworks"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ArticleSectionArtworkGrid",
  "abstractKey": null
};

(node as any).hash = "31698e63e8d6a64bd22512576614190c";

export default node;
