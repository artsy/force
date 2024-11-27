/**
 * @generated SignedSource<<97a22a0e5d0af92501e054b237a85e64>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FairCollections_fair$data = {
  readonly marketingCollections: ReadonlyArray<{
    readonly id: string;
    readonly slug: string;
    readonly " $fragmentSpreads": FragmentRefs<"FairCollection_collection">;
  } | null | undefined>;
  readonly " $fragmentType": "FairCollections_fair";
};
export type FairCollections_fair$key = {
  readonly " $data"?: FairCollections_fair$data;
  readonly " $fragmentSpreads": FragmentRefs<"FairCollections_fair">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FairCollections_fair",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "size",
          "value": 5
        }
      ],
      "concreteType": "MarketingCollection",
      "kind": "LinkedField",
      "name": "marketingCollections",
      "plural": true,
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
          "name": "slug",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "FairCollection_collection"
        }
      ],
      "storageKey": "marketingCollections(size:5)"
    }
  ],
  "type": "Fair",
  "abstractKey": null
};

(node as any).hash = "8ecebb5e5de44baf510cad3eaceda047";

export default node;
