/**
 * @generated SignedSource<<1aed26041a13213b32485712e5b6b966>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkApp_artworkResult$data = {
  readonly __typename: string;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkApp_artwork" | "ArtworkErrorApp_artworkError">;
  readonly " $fragmentType": "ArtworkApp_artworkResult";
};
export type ArtworkApp_artworkResult$key = {
  readonly " $data"?: ArtworkApp_artworkResult$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkApp_artworkResult">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "loadSidebar"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkApp_artworkResult",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "__typename",
      "storageKey": null
    },
    {
      "args": [
        {
          "kind": "Variable",
          "name": "loadSidebar",
          "variableName": "loadSidebar"
        }
      ],
      "kind": "FragmentSpread",
      "name": "ArtworkApp_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkErrorApp_artworkError"
    }
  ],
  "type": "ArtworkResult",
  "abstractKey": "__isArtworkResult"
};

(node as any).hash = "fe33fd7414d66bb701069c248014f8b9";

export default node;
