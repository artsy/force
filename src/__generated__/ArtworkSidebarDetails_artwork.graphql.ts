/**
 * @generated SignedSource<<a8c7f686aee0b8d9088be0e51046c836>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
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
  readonly framedDimensions: {
    readonly cm: string | null | undefined;
    readonly in: string | null | undefined;
  } | null | undefined;
  readonly isEdition: boolean | null | undefined;
  readonly isUnlisted: boolean;
  readonly medium: string | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkSidebarAuthenticityCertificate_artwork" | "ArtworkSidebarClassification_artwork" | "ArtworkSidebarCollectorSignal_artwork">;
  readonly " $fragmentType": "ArtworkSidebarDetails_artwork";
};
export type ArtworkSidebarDetails_artwork$key = {
  readonly " $data"?: ArtworkSidebarDetails_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkSidebarDetails_artwork">;
};

const node: ReaderFragment = (function(){
var v0 = [
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
];
return {
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
      "selections": (v0/*: any*/),
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
      "concreteType": "dimensions",
      "kind": "LinkedField",
      "name": "framedDimensions",
      "plural": false,
      "selections": (v0/*: any*/),
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
      "name": "ArtworkSidebarCollectorSignal_artwork"
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
})();

(node as any).hash = "ec96741cfd3ebb65793dea09f4f2789b";

export default node;
