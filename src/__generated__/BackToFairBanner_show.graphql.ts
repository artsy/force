/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type BackToFairBanner_show = {
    readonly fair: {
        readonly name: string | null;
        readonly href: string | null;
    } | null;
    readonly " $refType": "BackToFairBanner_show";
};
export type BackToFairBanner_show$data = BackToFairBanner_show;
export type BackToFairBanner_show$key = {
    readonly " $data"?: BackToFairBanner_show$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"BackToFairBanner_show">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "BackToFairBanner_show",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Fair",
      "kind": "LinkedField",
      "name": "fair",
      "plural": false,
      "selections": [
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
      "storageKey": null
    }
  ],
  "type": "Show",
  "abstractKey": null
};
(node as any).hash = '52b168c06dea8b901032086f4d6377f6';
export default node;
