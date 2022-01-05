/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ExampleArtworkFilterRoute_tag = {
    readonly name: string | null;
    readonly " $fragmentRefs": FragmentRefs<"ExampleArtworkFilter_tag">;
    readonly " $refType": "ExampleArtworkFilterRoute_tag";
};
export type ExampleArtworkFilterRoute_tag$data = ExampleArtworkFilterRoute_tag;
export type ExampleArtworkFilterRoute_tag$key = {
    readonly " $data"?: ExampleArtworkFilterRoute_tag$data;
    readonly " $fragmentRefs": FragmentRefs<"ExampleArtworkFilterRoute_tag">;
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
  "name": "ExampleArtworkFilterRoute_tag",
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
      "name": "ExampleArtworkFilter_tag"
    }
  ],
  "type": "Tag"
};
(node as any).hash = '1a71bd47d5ca838901c6bd1005ec3223';
export default node;
