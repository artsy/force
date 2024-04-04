/**
 * @generated SignedSource<<383b1a96621a0f109466c50331eec245>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PrivateArtworkMetadata_artwork$data = {
  readonly conditionDescription: {
    readonly details: string | null | undefined;
  } | null | undefined;
  readonly exhibitionHistory: string | null | undefined;
  readonly provenance: string | null | undefined;
  readonly " $fragmentType": "PrivateArtworkMetadata_artwork";
};
export type PrivateArtworkMetadata_artwork$key = {
  readonly " $data"?: PrivateArtworkMetadata_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"PrivateArtworkMetadata_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PrivateArtworkMetadata_artwork",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ArtworkInfoRow",
      "kind": "LinkedField",
      "name": "conditionDescription",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "details",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "provenance",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "exhibitionHistory",
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "3f0a81b2f5b81720295dcc1c9c96aa0a";

export default node;
