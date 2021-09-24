/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type GeneFamily_geneFamily = {
    readonly id: string;
    readonly slug: string;
    readonly name: string;
    readonly genes: ReadonlyArray<{
        readonly isPublished: boolean | null;
        readonly id: string;
        readonly displayName: string | null;
        readonly name: string | null;
        readonly slug: string;
    } | null> | null;
    readonly " $refType": "GeneFamily_geneFamily";
};
export type GeneFamily_geneFamily$data = GeneFamily_geneFamily;
export type GeneFamily_geneFamily$key = {
    readonly " $data"?: GeneFamily_geneFamily$data;
    readonly " $fragmentRefs": FragmentRefs<"GeneFamily_geneFamily">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "GeneFamily_geneFamily",
  "selections": [
    (v0/*: any*/),
    (v1/*: any*/),
    (v2/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Gene",
      "kind": "LinkedField",
      "name": "genes",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isPublished",
          "storageKey": null
        },
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "displayName",
          "storageKey": null
        },
        (v2/*: any*/),
        (v1/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "GeneFamily"
};
})();
(node as any).hash = '6f2458387d1c83552af32f8a341f82c5';
export default node;
