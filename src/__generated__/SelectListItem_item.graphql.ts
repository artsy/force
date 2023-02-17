/**
 * @generated SignedSource<<e93db2957326b07eed67ea2f967b0042>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SelectListItem_item$data = {
  readonly artworksCount: number;
  readonly internalID: string;
  readonly name: string;
  readonly " $fragmentType": "SelectListItem_item";
};
export type SelectListItem_item$key = {
  readonly " $data"?: SelectListItem_item$data;
  readonly " $fragmentSpreads": FragmentRefs<"SelectListItem_item">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SelectListItem_item",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "internalID",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "artworksCount",
      "storageKey": null
    }
  ],
  "type": "Collection",
  "abstractKey": null
};

(node as any).hash = "277abec86cfa010e4644d6720cfd5295";

export default node;
