/**
 * @generated SignedSource<<cad170304e86bd8267c47d6d47773050>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistAbout_artist$data = {
  readonly biographyBlurb: {
    readonly credit: string | null | undefined;
    readonly text: string | null | undefined;
  } | null | undefined;
  readonly mediumGenes: ReadonlyArray<{
    readonly internalID: string;
    readonly name: string | null | undefined;
    readonly slug: string;
  }>;
  readonly movementGenes: ReadonlyArray<{
    readonly internalID: string;
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
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "internalID",
    "storageKey": null
  },
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
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "format",
          "value": "HTML"
        }
      ],
      "concreteType": "ArtistBlurb",
      "kind": "LinkedField",
      "name": "biographyBlurb",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "text",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "credit",
          "storageKey": null
        }
      ],
      "storageKey": "biographyBlurb(format:\"HTML\")"
    },
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

(node as any).hash = "f7fee9c511e64f9ff2462580fed1bed1";

export default node;
