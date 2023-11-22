/**
 * @generated SignedSource<<d0844b62a7eb0dcdd57303a56dd2e288>>
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
  readonly " $fragmentSpreads": FragmentRefs<"TagArtworkFilter_tag" | "TagMeta_tag">;
  readonly " $fragmentType": "TagApp_tag";
};
export type TagApp_tag$key = {
  readonly " $data"?: TagApp_tag$data;
  readonly " $fragmentSpreads": FragmentRefs<"TagApp_tag">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "aggregations"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "input"
    },
    {
      "defaultValue": false,
      "kind": "LocalArgument",
      "name": "shouldFetchCounts"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "TagApp_tag",
  "selections": [
    {
      "args": [
        {
          "kind": "Variable",
          "name": "aggregations",
          "variableName": "aggregations"
        },
        {
          "kind": "Variable",
          "name": "input",
          "variableName": "input"
        },
        {
          "kind": "Variable",
          "name": "shouldFetchCounts",
          "variableName": "shouldFetchCounts"
        }
      ],
      "kind": "FragmentSpread",
      "name": "TagArtworkFilter_tag"
    },
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

(node as any).hash = "15bfda47e4d0588e2e6ffeb5d7c2afdf";

export default node;
