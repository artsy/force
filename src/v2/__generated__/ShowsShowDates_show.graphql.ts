/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ShowsShowDates_show = {
    readonly startAt: string | null;
    readonly endAt: string | null;
    readonly formattedStartAt: string | null;
    readonly formattedEndAt: string | null;
    readonly location: {
        readonly city: string | null;
    } | null;
    readonly " $refType": "ShowsShowDates_show";
};
export type ShowsShowDates_show$data = ShowsShowDates_show;
export type ShowsShowDates_show$key = {
    readonly " $data"?: ShowsShowDates_show$data;
    readonly " $fragmentRefs": FragmentRefs<"ShowsShowDates_show">;
};



const node: ReaderFragment = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "format",
    "value": "MMM D"
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ShowsShowDates_show",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "startAt",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "endAt",
      "storageKey": null
    },
    {
      "alias": "formattedStartAt",
      "args": (v0/*: any*/),
      "kind": "ScalarField",
      "name": "startAt",
      "storageKey": "startAt(format:\"MMM D\")"
    },
    {
      "alias": "formattedEndAt",
      "args": (v0/*: any*/),
      "kind": "ScalarField",
      "name": "endAt",
      "storageKey": "endAt(format:\"MMM D\")"
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Location",
      "kind": "LinkedField",
      "name": "location",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "city",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Show"
};
})();
(node as any).hash = 'a06ad08e02543909b1def26e50d86383';
export default node;
