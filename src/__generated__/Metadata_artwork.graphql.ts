/**
 * @generated SignedSource<<430dd59d9f6f7791691ee2ea2a99e7d2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
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
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Metadata_artwork",
  "selections": [
    {
      "args": null,
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

(node as any).hash = "6603c972ee317f5c70b673c371fb68a8";

export default node;
