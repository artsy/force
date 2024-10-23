/**
 * @generated SignedSource<<8fb5061eb13b1c7806af177af352965b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type TagApp_tag$data = {
  readonly name: string | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"TagMeta_tag">;
  readonly " $fragmentType": "TagApp_tag";
};
export type TagApp_tag$key = {
  readonly " $data"?: TagApp_tag$data;
  readonly " $fragmentSpreads": FragmentRefs<"TagApp_tag">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TagApp_tag",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "TagMeta_tag"
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    }
  ],
  "type": "Tag",
  "abstractKey": null
};

(node as any).hash = "c3fa05401742f7dffb327c1f5cd3c66b";

export default node;
