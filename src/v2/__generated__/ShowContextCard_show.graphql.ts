/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ShowContextCard_show = {
    readonly isFairBooth: boolean | null;
    readonly fair: {
        readonly href: string | null;
        readonly name: string | null;
        readonly " $fragmentRefs": FragmentRefs<"FairTiming_fair" | "FairCard_fair">;
    } | null;
    readonly " $refType": "ShowContextCard_show";
};
export type ShowContextCard_show$data = ShowContextCard_show;
export type ShowContextCard_show$key = {
    readonly " $data"?: ShowContextCard_show$data;
    readonly " $fragmentRefs": FragmentRefs<"ShowContextCard_show">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ShowContextCard_show",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isFairBooth",
      "storageKey": null
    },
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
          "name": "href",
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
          "args": null,
          "kind": "FragmentSpread",
          "name": "FairTiming_fair"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "FairCard_fair"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Show"
};
(node as any).hash = 'ea85047a36b8c234f951d098a1f0218f';
export default node;
