/**
 * @generated SignedSource<<39fa2bb83a98d1962f36ed1bfdd152b0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkDetails_artwork$data = {
  readonly exhibition_history: string | null | undefined;
  readonly literature: string | null | undefined;
  readonly provenance: string | null | undefined;
  readonly slug: string;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkDetailsAboutTheWorkFromArtsy_artwork" | "ArtworkDetailsAdditionalInfo_artwork">;
  readonly " $fragmentType": "ArtworkDetails_artwork";
};
export type ArtworkDetails_artwork$key = {
  readonly " $data"?: ArtworkDetails_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkDetails_artwork">;
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
  "name": "ArtworkDetails_artwork",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkDetailsAboutTheWorkFromArtsy_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkDetailsAdditionalInfo_artwork"
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": null,
      "args": (v0/*: any*/),
      "kind": "ScalarField",
      "name": "literature",
      "storageKey": "literature(format:\"HTML\")"
    },
    {
      "alias": "exhibition_history",
      "args": (v0/*: any*/),
      "kind": "ScalarField",
      "name": "exhibitionHistory",
      "storageKey": "exhibitionHistory(format:\"HTML\")"
    },
    {
      "alias": null,
      "args": (v0/*: any*/),
      "kind": "ScalarField",
      "name": "provenance",
      "storageKey": "provenance(format:\"HTML\")"
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
})();

(node as any).hash = "a26cdc602532281178f9e470eb2edd0a";

export default node;
