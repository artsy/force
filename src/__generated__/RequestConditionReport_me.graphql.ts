/**
 * @generated SignedSource<<ac63981c5cfb42bd48e4c0503deb520b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RequestConditionReport_me$data = {
  readonly email: string | null | undefined;
  readonly internalID: string;
  readonly " $fragmentType": "RequestConditionReport_me";
};
export type RequestConditionReport_me$key = {
  readonly " $data"?: RequestConditionReport_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"RequestConditionReport_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RequestConditionReport_me",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "email",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "internalID",
      "storageKey": null
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "258c05430e9b3e8a98d4422132c12e82";

export default node;
