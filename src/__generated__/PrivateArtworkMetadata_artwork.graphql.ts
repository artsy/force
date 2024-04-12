/**
 * @generated SignedSource<<5a9e7951a591bcedb6fdfca2774d5794>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PrivateArtworkMetadata_artwork$data = {
  readonly conditionDescription: {
    readonly details: string | null | undefined;
  } | null | undefined;
  readonly exhibitionHistory: string | null | undefined;
  readonly provenance: string | null | undefined;
  readonly " $fragmentType": "PrivateArtworkMetadata_artwork";
};
export type PrivateArtworkMetadata_artwork$key = {
  readonly " $data"?: PrivateArtworkMetadata_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"PrivateArtworkMetadata_artwork">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "format",
    "value": "HTML"
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PrivateArtworkMetadata_artwork",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ArtworkInfoRow",
      "kind": "LinkedField",
      "name": "conditionDescription",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "details",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": (v0/*: any*/),
      "kind": "ScalarField",
      "name": "provenance",
      "storageKey": "provenance(format:\"HTML\")"
    },
    {
      "alias": null,
      "args": (v0/*: any*/),
      "kind": "ScalarField",
      "name": "exhibitionHistory",
      "storageKey": "exhibitionHistory(format:\"HTML\")"
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
})();

(node as any).hash = "36ee7b3f157ea9312cd5947abc2fc82e";

export default node;
