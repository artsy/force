/**
 * @generated SignedSource<<82b864aa1e3ee2825a0908570dd6b946>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistStylesAndTechniques_artist$data = {
  readonly mediumGenes: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"ArtistGenesRow_genes">;
  }>;
  readonly movementGenes: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"ArtistGenesRow_genes">;
  }>;
  readonly " $fragmentType": "ArtistStylesAndTechniques_artist";
};
export type ArtistStylesAndTechniques_artist$key = {
  readonly " $data"?: ArtistStylesAndTechniques_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistStylesAndTechniques_artist">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "kind": "Literal",
  "name": "minValue",
  "value": 50
},
v1 = {
  "kind": "Literal",
  "name": "size",
  "value": 3
},
v2 = [
  {
    "args": null,
    "kind": "FragmentSpread",
    "name": "ArtistGenesRow_genes"
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistStylesAndTechniques_artist",
  "selections": [
    {
      "alias": "movementGenes",
      "args": [
        {
          "kind": "Literal",
          "name": "geneFamilyID",
          "value": "styles-and-movements"
        },
        (v0/*: any*/),
        (v1/*: any*/)
      ],
      "concreteType": "Gene",
      "kind": "LinkedField",
      "name": "genes",
      "plural": true,
      "selections": (v2/*: any*/),
      "storageKey": "genes(geneFamilyID:\"styles-and-movements\",minValue:50,size:3)"
    },
    {
      "alias": "mediumGenes",
      "args": [
        {
          "kind": "Literal",
          "name": "geneFamilyID",
          "value": "medium-and-techniques"
        },
        (v0/*: any*/),
        (v1/*: any*/)
      ],
      "concreteType": "Gene",
      "kind": "LinkedField",
      "name": "genes",
      "plural": true,
      "selections": (v2/*: any*/),
      "storageKey": "genes(geneFamilyID:\"medium-and-techniques\",minValue:50,size:3)"
    }
  ],
  "type": "Artist",
  "abstractKey": null
};
})();

(node as any).hash = "d2eb1eccf823c7b1149ff473b71860c5";

export default node;
