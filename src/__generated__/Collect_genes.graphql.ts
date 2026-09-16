/**
 * @generated SignedSource<<2c7077067365f6d65cba2b64a9eb717a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Collect_genes$data = ReadonlyArray<{
  readonly " $fragmentSpreads": FragmentRefs<"CollectionsHubsNav_genes">;
  readonly " $fragmentType": "Collect_genes";
}>;
export type Collect_genes$key = ReadonlyArray<{
  readonly " $data"?: Collect_genes$data;
  readonly " $fragmentSpreads": FragmentRefs<"Collect_genes">;
}>;

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "Collect_genes",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CollectionsHubsNav_genes"
    }
  ],
  "type": "Gene",
  "abstractKey": null
};

(node as any).hash = "b1bbd1b23b6546ed7b641ff5f074750a";

export default node;
