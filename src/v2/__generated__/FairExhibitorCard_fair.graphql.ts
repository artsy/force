/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairExhibitorCard_fair = {
    readonly href: string | null;
    readonly " $refType": "FairExhibitorCard_fair";
};
export type FairExhibitorCard_fair$data = FairExhibitorCard_fair;
export type FairExhibitorCard_fair$key = {
    readonly " $data"?: FairExhibitorCard_fair$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"FairExhibitorCard_fair">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FairExhibitorCard_fair",
  "selections": [
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
(node as any).hash = 'f01b4590774d36f51baaed9222888184';
export default node;
