/**
 * @generated SignedSource<<5b75b601ffeb2cda62dc16614be977d7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type VerifiedSeller_artwork$data = {
  readonly is_biddable: boolean | null | undefined;
  readonly partner: {
    readonly isVerifiedSeller: boolean | null | undefined;
    readonly name: string | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "VerifiedSeller_artwork";
};
export type VerifiedSeller_artwork$key = {
  readonly " $data"?: VerifiedSeller_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"VerifiedSeller_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "VerifiedSeller_artwork",
  "selections": [
    {
      "alias": "is_biddable",
      "args": null,
      "kind": "ScalarField",
      "name": "isBiddable",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Partner",
      "kind": "LinkedField",
      "name": "partner",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isVerifiedSeller",
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
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "2efbba0f7a6a9470dc169125c7b5fdc9";

export default node;
