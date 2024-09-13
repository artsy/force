/**
 * @generated SignedSource<<fe54b03657efe402fff0854bb00f63cb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebarDetails_artwork$data = {
  readonly dimensions: {
    readonly cm: string | null | undefined;
    readonly in: string | null | undefined;
  } | null | undefined;
  readonly editionOf: string | null | undefined;
  readonly editionSets: ReadonlyArray<{
    readonly internalID: string;
  } | null | undefined> | null | undefined;
  readonly framed: {
    readonly details: string | null | undefined;
  } | null | undefined;
  readonly isEdition: boolean | null | undefined;
  readonly isUnlisted: boolean;
  readonly medium: string | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkSidebarAuthenticityCertificate_artwork" | "ArtworkSidebarClassification_artwork" | "ArtworkSidebarShowingNow_artwork">;
  readonly " $fragmentType": "ArtworkSidebarDetails_artwork";
};
export type ArtworkSidebarDetails_artwork$key = {
  readonly " $data"?: ArtworkSidebarDetails_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkSidebarDetails_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkSidebarDetails_artwork",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isUnlisted",
      "storageKey": null
    },
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
      "name": "ArtworkSidebarClassification_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkSidebarAuthenticityCertificate_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkSidebarShowingNow_artwork"
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "46975dc474a3a8c4b27d259b424e9516";

export default node;
