/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ShowHeader_show = {
    readonly name: string | null;
    readonly startAt: string | null;
    readonly endAt: string | null;
    readonly status: string | null;
    readonly formattedStartAt: string | null;
    readonly formattedEndAt: string | null;
    readonly partner: {
        readonly name?: string | null;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"ShowContextualLink_show">;
    readonly " $refType": "ShowHeader_show";
};
export type ShowHeader_show$data = ShowHeader_show;
export type ShowHeader_show$key = {
    readonly " $data"?: ShowHeader_show$data;
    readonly " $fragmentRefs": FragmentRefs<"ShowHeader_show">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v1 = [
  (v0/*: any*/)
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ShowHeader_show",
  "selections": [
    (v0/*: any*/),
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
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "status",
      "storageKey": null
    },
    {
      "alias": "formattedStartAt",
      "args": [
        {
          "kind": "Literal",
          "name": "format",
          "value": "MMMM D"
        }
      ],
      "kind": "ScalarField",
      "name": "startAt",
      "storageKey": "startAt(format:\"MMMM D\")"
    },
    {
      "alias": "formattedEndAt",
      "args": [
        {
          "kind": "Literal",
          "name": "format",
          "value": "MMMM D, YYYY"
        }
      ],
      "kind": "ScalarField",
      "name": "endAt",
      "storageKey": "endAt(format:\"MMMM D, YYYY\")"
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
          "selections": (v1/*: any*/),
          "type": "Partner"
        },
        {
          "kind": "InlineFragment",
          "selections": (v1/*: any*/),
          "type": "ExternalPartner"
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ShowContextualLink_show"
    }
  ],
  "type": "Show"
};
})();
(node as any).hash = 'e43ae44402dd264c1c959bad52acbb7b';
export default node;
