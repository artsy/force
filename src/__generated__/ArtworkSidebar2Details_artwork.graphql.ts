/**
 * @generated SignedSource<<34593d84c021e2ee7cf35ab05e0da155>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebar2Details_artwork$data = {
  readonly dimensions: {
    readonly cm: string | null;
    readonly in: string | null;
  } | null;
  readonly editionOf: string | null;
  readonly editionSets: ReadonlyArray<{
    readonly internalID: string;
  } | null> | null;
  readonly framed: {
    readonly details: string | null;
  } | null;
  readonly isEdition: boolean | null;
  readonly medium: string | null;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkSidebar2AuthenticityCertificate_artwork" | "ArtworkSidebar2Classification_artwork">;
  readonly " $fragmentType": "ArtworkSidebar2Details_artwork";
};
export type ArtworkSidebar2Details_artwork$key = {
  readonly " $data"?: ArtworkSidebar2Details_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkSidebar2Details_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkSidebar2Details_artwork",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "medium",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "dimensions",
      "kind": "LinkedField",
      "name": "dimensions",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "in",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "cm",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ArtworkInfoRow",
      "kind": "LinkedField",
      "name": "framed",
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
      "name": "editionOf",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isEdition",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "EditionSet",
      "kind": "LinkedField",
      "name": "editionSets",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "internalID",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkSidebar2Classification_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkSidebar2AuthenticityCertificate_artwork"
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "007fa3897625a2199a99c968e691c659";

export default node;
