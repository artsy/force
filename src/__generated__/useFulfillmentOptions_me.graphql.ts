/**
 * @generated SignedSource<<dce14140b0fe49cd911624300527f998>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useFulfillmentOptions_me$data = {
  readonly location: {
    readonly countryCode: string | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "useFulfillmentOptions_me";
};
export type useFulfillmentOptions_me$key = {
  readonly " $data"?: useFulfillmentOptions_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"useFulfillmentOptions_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "useFulfillmentOptions_me",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "MyLocation",
      "kind": "LinkedField",
      "name": "location",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "countryCode",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "e7c8d7ad6707c91533caa477d5a69035";

export default node;
