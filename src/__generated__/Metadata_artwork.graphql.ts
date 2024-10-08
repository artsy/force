/**
 * @generated SignedSource<<dbfafd2026f6a5fb517db02fb78dab5f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Metadata_artwork$data = {
  readonly href: string | null | undefined;
  readonly internalID: string;
  readonly sale: {
    readonly isOpen: boolean | null | undefined;
  } | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"Details_artwork">;
  readonly " $fragmentType": "Metadata_artwork";
};
export type Metadata_artwork$key = {
  readonly " $data"?: Metadata_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"Metadata_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": false,
      "kind": "LocalArgument",
      "name": "includeConsignmentSubmission"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "Metadata_artwork",
  "selections": [
    {
      "args": [
        {
          "kind": "Variable",
          "name": "includeConsignmentSubmission",
          "variableName": "includeConsignmentSubmission"
        }
      ],
      "kind": "FragmentSpread",
      "name": "Details_artwork"
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
      "name": "href",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Sale",
      "kind": "LinkedField",
      "name": "sale",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isOpen",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "8c66d9ef146390beeb9462119b77dd98";

export default node;
