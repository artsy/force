/**
 * @generated SignedSource<<2a7e805c525d533134ddbf2ec25da397>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type LabelSignalEnum = "CURATORS_PICK" | "INCREASED_INTEREST" | "PARTNER_OFFER" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type LegacyPrimaryLabelLine_artwork$data = {
  readonly collectorSignals: {
    readonly primaryLabel: LabelSignalEnum | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "LegacyPrimaryLabelLine_artwork";
};
export type LegacyPrimaryLabelLine_artwork$key = {
  readonly " $data"?: LegacyPrimaryLabelLine_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"LegacyPrimaryLabelLine_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "LegacyPrimaryLabelLine_artwork",
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

(node as any).hash = "3d570064cf24a6c2c0dd5bbe48504ab2";

export default node;
