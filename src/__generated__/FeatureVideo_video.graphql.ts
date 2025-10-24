/**
 * @generated SignedSource<<eaeed1b226052f23ec1bcd3562848e1c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FeatureVideo_video$data = {
  readonly embed: string | null | undefined;
  readonly fallbackEmbed: string | null | undefined;
  readonly " $fragmentType": "FeatureVideo_video";
};
export type FeatureVideo_video$key = {
  readonly " $data"?: FeatureVideo_video$data;
  readonly " $fragmentSpreads": FragmentRefs<"FeatureVideo_video">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "autoPlay",
    "value": true
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FeatureVideo_video",
  "selections": [
    {
      "alias": null,
      "args": (v0/*: any*/),
      "kind": "ScalarField",
      "name": "embed",
      "storageKey": "embed(autoPlay:true)"
    },
    {
      "alias": "fallbackEmbed",
      "args": (v0/*: any*/),
      "kind": "ScalarField",
      "name": "embed",
      "storageKey": "embed(autoPlay:true)"
    }
  ],
  "type": "FeatureVideo",
  "abstractKey": null
};
})();

(node as any).hash = "1f849676cc2086cc8050d4c6561791e4";

export default node;
