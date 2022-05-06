/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairEditorial_fair = {
    readonly " $fragmentRefs": FragmentRefs<"FairEditorialRailArticles_fair">;
    readonly " $refType": "FairEditorial_fair";
};
export type FairEditorial_fair$data = FairEditorial_fair;
export type FairEditorial_fair$key = {
    readonly " $data"?: FairEditorial_fair$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"FairEditorial_fair">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FairEditorial_fair",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FairEditorialRailArticles_fair"
    }
  ],
  "type": "Fair",
  "abstractKey": null
};
(node as any).hash = '8d6ab09c42c4704e6198dfbc121de06d';
export default node;
