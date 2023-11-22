/**
 * @generated SignedSource<<7337a3ff4d18e308fbbcb26e2f7b5a4c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtQuizArtworksCardMetadata_artwork$data = {
  readonly artists: ReadonlyArray<{
    readonly name: string | null | undefined;
  } | null | undefined> | null | undefined;
  readonly culturalMaker: string | null | undefined;
  readonly date: string | null | undefined;
  readonly dominantColors: ReadonlyArray<string>;
  readonly partner: {
    readonly name: string | null | undefined;
  } | null | undefined;
  readonly title: string | null | undefined;
  readonly " $fragmentType": "ArtQuizArtworksCardMetadata_artwork";
};
export type ArtQuizArtworksCardMetadata_artwork$key = {
  readonly " $data"?: ArtQuizArtworksCardMetadata_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtQuizArtworksCardMetadata_artwork">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
v1 = [
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
  "name": "ArtQuizArtworksCardMetadata_artwork",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "date",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "dominantColors",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "culturalMaker",
      "storageKey": null
    },
    {
      "alias": null,
      "args": (v0/*: any*/),
      "concreteType": "Artist",
      "kind": "LinkedField",
      "name": "artists",
      "plural": true,
      "selections": (v1/*: any*/),
      "storageKey": "artists(shallow:true)"
    },
    {
      "alias": null,
      "args": (v0/*: any*/),
      "concreteType": "Partner",
      "kind": "LinkedField",
      "name": "partner",
      "plural": false,
      "selections": (v1/*: any*/),
      "storageKey": "partner(shallow:true)"
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
})();

(node as any).hash = "4bce7199e6b24b1661511ad1b563a7b2";

export default node;
