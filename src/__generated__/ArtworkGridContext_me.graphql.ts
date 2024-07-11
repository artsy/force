/**
 * @generated SignedSource<<e520d3902567dfa212bb157e09b3074a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkGridContext_me$data = {
  readonly " $fragmentSpreads": FragmentRefs<"useCollectorSignals_me">;
  readonly " $fragmentType": "ArtworkGridContext_me";
};
export type ArtworkGridContext_me$key = {
  readonly " $data"?: ArtworkGridContext_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkGridContext_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkGridContext_me",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "useCollectorSignals_me"
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "4011d6a2236947ab11d3dcd1c445d4fe";

export default node;
