/**
 * @generated SignedSource<<a240bbe314198c9fc090d50a775a37dc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type GeneFamily_geneFamily$data = {
  readonly genes: ReadonlyArray<{
    readonly displayName: string | null | undefined;
    readonly id: string;
    readonly isPublished: boolean | null | undefined;
    readonly name: string | null | undefined;
    readonly slug: string;
  } | null | undefined> | null | undefined;
  readonly id: string;
  readonly name: string;
  readonly slug: string;
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
