/**
 * @generated SignedSource<<41810ef827c7e6c4b81762375467c27a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type LabelSignalEnum = "CURATORS_PICK" | "INCREASED_INTEREST" | "PARTNER_OFFER" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type PrimaryLabelLine_artwork$data = {
  readonly collectorSignals: {
    readonly primaryLabel: LabelSignalEnum | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "PrimaryLabelLine_artwork";
};
export type PrimaryLabelLine_artwork$key = {
  readonly " $data"?: PrimaryLabelLine_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"PrimaryLabelLine_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PrimaryLabelLine_artwork",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "CollectorSignals",
      "kind": "LinkedField",
      "name": "collectorSignals",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "primaryLabel",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "c5cd8670ae27924ffc259da488c784da";

export default node;
