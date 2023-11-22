/**
 * @generated SignedSource<<70427f24598df4a647a20be1dfc0084b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ShowsShowDates_show$data = {
  readonly endAt: string | null | undefined;
  readonly formattedEndAt: string | null | undefined;
  readonly formattedStartAt: string | null | undefined;
  readonly location: {
    readonly city: string | null | undefined;
  } | null | undefined;
  readonly startAt: string | null | undefined;
  readonly " $fragmentType": "ShowsShowDates_show";
};
export type ShowsShowDates_show$key = {
  readonly " $data"?: ShowsShowDates_show$data;
  readonly " $fragmentSpreads": FragmentRefs<"ShowsShowDates_show">;
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
  "type": "Show",
  "abstractKey": null
};
})();

(node as any).hash = "a06ad08e02543909b1def26e50d86383";

export default node;
