/**
 * @generated SignedSource<<f75b9118f9f7e47e7bb2cfea48ee62d3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type GeneFamilies_geneFamiliesConnection$data = {
  readonly edges: ReadonlyArray<{
    readonly node: {
      readonly internalID: string;
      readonly " $fragmentSpreads": FragmentRefs<"GeneFamily_geneFamily">;
    } | null | undefined;
  } | null | undefined> | null | undefined;
  readonly " $fragmentType": "GeneFamilies_geneFamiliesConnection";
};
export type GeneFamilies_geneFamiliesConnection$key = {
  readonly " $data"?: GeneFamilies_geneFamiliesConnection$data;
  readonly " $fragmentSpreads": FragmentRefs<"GeneFamilies_geneFamiliesConnection">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "GeneFamilies_geneFamiliesConnection",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "GeneFamilyEdge",
      "kind": "LinkedField",
      "name": "edges",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "GeneFamily",
          "kind": "LinkedField",
          "name": "node",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "internalID",
              "storageKey": null
            },
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "GeneFamily_geneFamily"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "GeneFamilyConnection",
  "abstractKey": null
};

(node as any).hash = "e0ccdba54d71b0f741fda4cafebf4445";

export default node;
