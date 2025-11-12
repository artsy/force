/**
 * @generated SignedSource<<c6279533e46fd46e2113e0933e0fc21f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FeatureSetVideo_video$data = {
  readonly description: string | null | undefined;
  readonly height: number;
  readonly id: string;
  readonly playerUrl: string;
  readonly videoTitle: string;
  readonly width: number;
  readonly " $fragmentType": "FeatureSetVideo_video";
};
export type FeatureSetVideo_video$key = {
  readonly " $data"?: FeatureSetVideo_video$data;
  readonly " $fragmentSpreads": FragmentRefs<"FeatureSetVideo_video">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FeatureSetVideo_video",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "playerUrl",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "width",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "height",
      "storageKey": null
    },
    {
      "alias": "videoTitle",
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "format",
          "value": "HTML"
        }
      ],
      "kind": "ScalarField",
      "name": "description",
      "storageKey": "description(format:\"HTML\")"
    }
  ],
  "type": "Video",
  "abstractKey": null
};

(node as any).hash = "bfc0b3f3e2e0b4897965370aa60527d1";

export default node;
