/**
 * @generated SignedSource<<aa54d097a0b8a3664639eadee30b42cc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type GeneFamily_geneFamily$data = {
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
  readonly " $fragmentType": "GeneFamily_geneFamily";
};
export type GeneFamily_geneFamily$key = {
  readonly " $data"?: GeneFamily_geneFamily$data;
  readonly " $fragmentSpreads": FragmentRefs<"GeneFamily_geneFamily">;
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
  "type": "GeneFamily",
  "abstractKey": null
};
})();

(node as any).hash = "6f2458387d1c83552af32f8a341f82c5";

export default node;
