/**
 * @generated SignedSource<<a60b06df5a1eb54fc28e3c40cada4c94>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistAbout_artist$data = {
  readonly mediumGenes: ReadonlyArray<{
    readonly name: string | null | undefined;
    readonly slug: string;
  }>;
  readonly movementGenes: ReadonlyArray<{
    readonly name: string | null | undefined;
    readonly slug: string;
  }>;
  readonly name: string | null | undefined;
  readonly " $fragmentType": "ArtistAbout_artist";
};
export type ArtistAbout_artist$key = {
  readonly " $data"?: ArtistAbout_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistAbout_artist">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v1 = {
  "kind": "Literal",
  "name": "minValue",
  "value": 50
},
v2 = {
  "kind": "Literal",
  "name": "size",
  "value": 3
},
v3 = [
  (v0/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "slug",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistAbout_artist",
  "selections": [
    (v0/*: any*/),
    {
      "alias": "movementGenes",
      "args": [
        {
          "kind": "Literal",
          "name": "geneFamilyID",
          "value": "styles-and-movements"
        },
        (v1/*: any*/),
        (v2/*: any*/)
      ],
      "concreteType": "Gene",
      "kind": "LinkedField",
      "name": "genes",
      "plural": true,
      "selections": (v3/*: any*/),
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
        (v1/*: any*/),
        (v2/*: any*/)
      ],
      "concreteType": "Gene",
      "kind": "LinkedField",
      "name": "genes",
      "plural": true,
      "selections": (v3/*: any*/),
      "storageKey": "genes(geneFamilyID:\"medium-and-techniques\",minValue:50,size:3)"
    }
  ],
  "type": "Artist",
  "abstractKey": null
};
})();

(node as any).hash = "57995893a84237c296886c511ca19c09";

export default node;
