/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

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
    readonly " $data"?: FeaturedFairs_fairs$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"FeaturedFairs_fairs">;
}>;



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "FeaturedFairs_fairs",
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
      "name": "href",
      "storageKey": null
    }
  ],
  "type": "Fair",
  "abstractKey": null
};
(node as any).hash = '52dfbf0cf61e285fd9a85c6015098cd0';
export default node;
