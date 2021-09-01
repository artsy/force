/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type GeneFamilies_geneFamiliesConnection = {
    readonly edges: ReadonlyArray<{
        readonly node: {
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
  "type": "GeneFamilyConnection"
};
(node as any).hash = '9d5bcc19e33508cae3ba90522dacdabc';
export default node;
