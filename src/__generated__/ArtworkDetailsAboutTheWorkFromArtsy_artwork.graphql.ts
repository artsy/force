/**
 * @generated SignedSource<<2cde66a2a734f897f476ef3ccd254435>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkDetailsAboutTheWorkFromArtsy_artwork$data = {
  readonly additionalInformation: string | null | undefined;
  readonly description: string | null | undefined;
  readonly " $fragmentType": "ArtworkDetailsAboutTheWorkFromArtsy_artwork";
};
export type ArtworkDetailsAboutTheWorkFromArtsy_artwork$key = {
  readonly " $data"?: ArtworkDetailsAboutTheWorkFromArtsy_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkDetailsAboutTheWorkFromArtsy_artwork">;
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
  "name": "ArtworkDetailsAboutTheWorkFromArtsy_artwork",
  "selections": [
    {
      "alias": null,
      "args": (v0/*: any*/),
      "kind": "ScalarField",
      "name": "description",
      "storageKey": "description(format:\"HTML\")"
    },
    {
      "alias": null,
      "args": (v0/*: any*/),
      "kind": "ScalarField",
      "name": "additionalInformation",
      "storageKey": "additionalInformation(format:\"HTML\")"
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
})();

(node as any).hash = "d9c920f09b7daa0d6a39a333cb4d0d6e";

export default node;
