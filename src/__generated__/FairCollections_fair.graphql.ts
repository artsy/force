/**
 * @generated SignedSource<<8c8f928a8d2a9add1596ee59453be902>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FairCollections_fair$data = {
  readonly marketingCollections: ReadonlyArray<{
    readonly id: string;
    readonly slug: string;
    readonly " $fragmentSpreads": FragmentRefs<"FairCollection_collection">;
  } | null>;
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
