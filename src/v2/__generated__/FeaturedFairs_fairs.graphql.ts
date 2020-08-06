/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FeaturedFairs_fairs = ReadonlyArray<{
    readonly internalID: string;
    readonly name: string | null;
    readonly href: string | null;
    readonly " $refType": "FeaturedFairs_fairs";
}>;
export type FeaturedFairs_fairs$data = FeaturedFairs_fairs;
export type FeaturedFairs_fairs$key = ReadonlyArray<{
    readonly " $data"?: FeaturedFairs_fairs$data;
    readonly " $fragmentRefs": FragmentRefs<"FeaturedFairs_fairs">;
}>;



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "FeaturedFairs_fairs",
  "type": "Fair",
  "metadata": {
    "plural": true
  },
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "internalID",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "name",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "href",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = '52dfbf0cf61e285fd9a85c6015098cd0';
export default node;
