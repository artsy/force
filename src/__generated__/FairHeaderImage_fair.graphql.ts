/**
 * @generated SignedSource<<414d9eaae12724b7d60140aa062035e6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FairHeaderImage_fair$data = {
  readonly image: {
    readonly url: string | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "FairHeaderImage_fair";
};
export type FairHeaderImage_fair$key = {
  readonly " $data"?: FairHeaderImage_fair$data;
  readonly " $fragmentSpreads": FragmentRefs<"FairHeaderImage_fair">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FairHeaderImage_fair",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Image",
      "kind": "LinkedField",
      "name": "image",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "version",
              "value": "wide"
            }
          ],
          "kind": "ScalarField",
          "name": "url",
          "storageKey": "url(version:\"wide\")"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Fair",
  "abstractKey": null
};

(node as any).hash = "40752f782c9a021ce3c61024afab0962";

export default node;
