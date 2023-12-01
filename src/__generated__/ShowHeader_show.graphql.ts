/**
 * @generated SignedSource<<9b7f0f7d50a4714f57d00e4527474ac7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ShowHeader_show$data = {
  readonly endAt: string | null | undefined;
  readonly formattedEndAt: string | null | undefined;
  readonly formattedStartAt: string | null | undefined;
  readonly name: string | null | undefined;
  readonly partner: {
    readonly name?: string | null | undefined;
  } | null | undefined;
  readonly startAt: string | null | undefined;
  readonly status: string | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"ShowContextualLink_show">;
  readonly " $fragmentType": "ShowHeader_show";
};
export type ShowHeader_show$key = {
  readonly " $data"?: ShowHeader_show$data;
  readonly " $fragmentSpreads": FragmentRefs<"ShowHeader_show">;
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
          "type": "Partner",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": (v1/*: any*/),
          "type": "ExternalPartner",
          "abstractKey": null
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
  "type": "Show",
  "abstractKey": null
};
})();

(node as any).hash = "e43ae44402dd264c1c959bad52acbb7b";

export default node;
