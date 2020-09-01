/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairExhibitorRail_show = {
    readonly internalID: string;
    readonly href: string | null;
    readonly partner: {
        readonly name?: string | null;
    } | null;
    readonly counts: {
        readonly artworks: number | null;
    } | null;
    readonly " $refType": "FairExhibitorRail_show";
};
export type FairExhibitorRail_show$data = FairExhibitorRail_show;
export type FairExhibitorRail_show$key = {
    readonly " $data"?: FairExhibitorRail_show$data;
    readonly " $fragmentRefs": FragmentRefs<"FairExhibitorRail_show">;
};



const node: ReaderFragment = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "name",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FairExhibitorRail_show",
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
      "name": "href",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "partner",
      "plural": false,
      "selections": [
        {
          "kind": "InlineFragment",
          "selections": (v0/*: any*/),
          "type": "Partner"
        },
        {
          "kind": "InlineFragment",
          "selections": (v0/*: any*/),
          "type": "ExternalPartner"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ShowCounts",
      "kind": "LinkedField",
      "name": "counts",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "artworks",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Show"
};
})();
(node as any).hash = 'e71391c18cda1f56e8afd4c9ab7856ca';
export default node;
