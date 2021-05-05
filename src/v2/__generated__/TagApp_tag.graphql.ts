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
          "name": "input",
          "variableName": "input"
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
(node as any).hash = 'a1318a94a4283b018cca3a5d65aca87d';
export default node;
