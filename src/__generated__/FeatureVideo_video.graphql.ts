/**
 * @generated SignedSource<<36d6a5485fb73469dc285590bbb9f8ec>>
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
  readonly " $fragmentType": "FeatureVideo_video";
};
export type FeatureVideo_video$key = {
  readonly " $data"?: FeatureVideo_video$data;
  readonly " $fragmentSpreads": FragmentRefs<"FeatureVideo_video">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FeatureVideo_video",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "autoPlay",
          "value": true
        }
      ],
      "kind": "ScalarField",
      "name": "embed",
      "storageKey": "embed(autoPlay:true)"
    }
  ],
  "type": "FeatureVideo",
  "abstractKey": null
};

(node as any).hash = "efee262e33f8b0ecc05304616f598aa6";

export default node;
