/**
 * @generated SignedSource<<4ac8158a6d9eb0374b03663e88180047>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistAbout_artist$data = {
  readonly internalID: string;
  readonly mediumGenes: ReadonlyArray<{
    readonly name: string | null | undefined;
  }>;
  readonly movementGenes: ReadonlyArray<{
    readonly name: string | null | undefined;
  }>;
  readonly " $fragmentType": "ArtistAbout_artist";
};
export type ArtistAbout_artist$key = {
  readonly " $data"?: ArtistAbout_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistAbout_artist">;
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
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "name",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistAbout_artist",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "internalID",
      "storageKey": null
    },
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

(node as any).hash = "3c5657120760a4fe10eabbf3cd73044f";

export default node;
