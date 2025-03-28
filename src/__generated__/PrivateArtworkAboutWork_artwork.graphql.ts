/**
 * @generated SignedSource<<73c4ae7cdaf1ab86827a3907132ae667>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PrivateArtworkAboutWork_artwork$data = {
  readonly additionalInformationHTML: string | null | undefined;
  readonly " $fragmentType": "PrivateArtworkAboutWork_artwork";
};
export type PrivateArtworkAboutWork_artwork$key = {
  readonly " $data"?: PrivateArtworkAboutWork_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"PrivateArtworkAboutWork_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PrivateArtworkAboutWork_artwork",
  "selections": [
    {
      "alias": "additionalInformationHTML",
      "args": [
        {
          "kind": "Literal",
          "name": "format",
          "value": "HTML"
        }
      ],
      "kind": "ScalarField",
      "name": "additionalInformation",
      "storageKey": "additionalInformation(format:\"HTML\")"
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "e3532607652ba56989bc78f2e2e6d223";

export default node;
