/**
 * @generated SignedSource<<c863c316837c3cae0c76342b2e0af518>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistApp_artist$data = {
  readonly internalID: string;
  readonly name: string | null | undefined;
  readonly slug: string;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistAbove_artist" | "ArtistHeader_artist" | "ArtistMeta_artist">;
  readonly " $fragmentType": "ArtistApp_artist";
};
export type ArtistApp_artist$key = {
  readonly " $data"?: ArtistApp_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistApp_artist">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": false,
      "kind": "LocalArgument",
      "name": "shouldShowExperiment"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistApp_artist",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtistMeta_artist"
    },
    {
      "condition": "shouldShowExperiment",
      "kind": "Condition",
      "passingValue": true,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ArtistAbove_artist"
        }
      ]
    },
    {
      "condition": "shouldShowExperiment",
      "kind": "Condition",
      "passingValue": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ArtistHeader_artist"
        }
      ]
    },
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
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    }
  ],
  "type": "Artist",
  "abstractKey": null
};

(node as any).hash = "4e101847e647f62606b149e7fd259b62";

export default node;
