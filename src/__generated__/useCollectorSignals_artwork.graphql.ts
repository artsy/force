/**
 * @generated SignedSource<<f79300df575135821151530662afe3f8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useCollectorSignals_artwork$data = {
  readonly internalID: string;
  readonly isAcquireable: boolean | null | undefined;
  readonly " $fragmentType": "useCollectorSignals_artwork";
};
export type useCollectorSignals_artwork$key = {
  readonly " $data"?: useCollectorSignals_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"useCollectorSignals_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "useCollectorSignals_artwork",
  "selections": [
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
      "name": "isAcquireable",
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "201f3154b7a691d6e153154359fd8f7d";

export default node;
