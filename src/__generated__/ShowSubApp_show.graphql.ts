/**
 * @generated SignedSource<<efe2de63109e59fb467cd5f6cdebf62a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ShowSubApp_show$data = {
  readonly href: string | null | undefined;
  readonly id: string;
  readonly internalID: string;
  readonly isFairBooth: boolean | null | undefined;
  readonly name: string | null | undefined;
  readonly partner: {
    readonly name?: string | null | undefined;
  } | null | undefined;
  readonly slug: string;
  readonly " $fragmentSpreads": FragmentRefs<"ShowMeta_show">;
  readonly " $fragmentType": "ShowSubApp_show";
};
export type ShowSubApp_show$key = {
  readonly " $data"?: ShowSubApp_show$data;
  readonly " $fragmentSpreads": FragmentRefs<"ShowSubApp_show">;
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
  "name": "ShowSubApp_show",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
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
      "name": "slug",
      "storageKey": null
    },
    (v0/*: any*/),
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
      "name": "isFairBooth",
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
      "name": "ShowMeta_show"
    }
  ],
  "type": "Show",
  "abstractKey": null
};
})();

(node as any).hash = "caf51c83f9a13f825d772ba7aabd2366";

export default node;
