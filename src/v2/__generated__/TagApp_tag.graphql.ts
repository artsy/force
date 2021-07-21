/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type TagApp_tag = {
    readonly name: string | null;
    readonly " $fragmentRefs": FragmentRefs<"TagArtworkFilter_tag" | "TagMeta_tag">;
    readonly " $refType": "TagApp_tag";
};
export type TagApp_tag$data = TagApp_tag;
export type TagApp_tag$key = {
    readonly " $data"?: TagApp_tag$data;
    readonly " $fragmentRefs": FragmentRefs<"TagApp_tag">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "input",
      "type": "FilterArtworksInput"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "aggregations",
      "type": "[ArtworkAggregation]"
    },
    {
      "defaultValue": false,
      "kind": "LocalArgument",
      "name": "shouldFetchCounts",
      "type": "Boolean!"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "TagApp_tag",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
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
    }
  ],
  "type": "Tag"
};
(node as any).hash = '15bfda47e4d0588e2e6ffeb5d7c2afdf';
export default node;
