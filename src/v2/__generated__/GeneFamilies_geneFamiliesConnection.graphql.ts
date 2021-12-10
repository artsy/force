/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type GeneFamilies_geneFamiliesConnection = {
    readonly edges: ReadonlyArray<{
        readonly node: {
            readonly internalID: string;
            readonly " $fragmentRefs": FragmentRefs<"GeneFamily_geneFamily">;
        } | null;
    } | null> | null;
    readonly " $refType": "GeneFamilies_geneFamiliesConnection";
};
export type GeneFamilies_geneFamiliesConnection$data = GeneFamilies_geneFamiliesConnection;
export type GeneFamilies_geneFamiliesConnection$key = {
    readonly " $data"?: GeneFamilies_geneFamiliesConnection$data;
    readonly " $fragmentRefs": FragmentRefs<"GeneFamilies_geneFamiliesConnection">;
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
(node as any).hash = 'e0ccdba54d71b0f741fda4cafebf4445';
export default node;
