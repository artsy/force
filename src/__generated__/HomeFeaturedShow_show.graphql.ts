/**
 * @generated SignedSource<<ce0fdea759566dd09344e5d8fe30e70d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type HomeFeaturedShow_show$data = {
  readonly internalID: string;
  readonly slug: string;
  readonly " $fragmentSpreads": FragmentRefs<"CellShow_show">;
  readonly " $fragmentType": "HomeFeaturedShow_show";
};
export type HomeFeaturedShow_show$key = {
  readonly " $data"?: HomeFeaturedShow_show$data;
  readonly " $fragmentSpreads": FragmentRefs<"HomeFeaturedShow_show">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "HomeFeaturedShow_show",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CellShow_show"
    },
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
      "name": "slug",
      "storageKey": null
    }
  ],
  "type": "Show",
  "abstractKey": null
};

(node as any).hash = "014d4afd3a3ef6ddcf09f229e5baa2eb";

export default node;
