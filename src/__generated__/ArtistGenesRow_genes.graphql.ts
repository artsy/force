/**
 * @generated SignedSource<<967ff63b90cea61eda239d20ec71272c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistGenesRow_genes$data = ReadonlyArray<{
  readonly internalID: string;
  readonly name: string | null | undefined;
  readonly slug: string;
  readonly " $fragmentType": "ArtistGenesRow_genes";
}>;
export type ArtistGenesRow_genes$key = ReadonlyArray<{
  readonly " $data"?: ArtistGenesRow_genes$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistGenesRow_genes">;
}>;

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "ArtistGenesRow_genes",
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
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    }
  ],
  "type": "Gene",
  "abstractKey": null
};

(node as any).hash = "47c6f882893ee3ea525e0ae0c201a45b";

export default node;
