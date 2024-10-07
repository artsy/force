/**
 * @generated SignedSource<<2f22150a5802f697992645f7c5b3229f>>
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
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "eeeb45c66c57246b87946c622ccff1bc";

export default node;
