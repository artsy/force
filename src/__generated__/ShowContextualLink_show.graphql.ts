/**
 * @generated SignedSource<<ccc554045184cf30b8bd05d2b9a53484>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ShowContextualLink_show$data = {
  readonly fair: {
    readonly href: string | null | undefined;
    readonly isActive: boolean | null | undefined;
    readonly name: string | null | undefined;
  } | null | undefined;
  readonly isFairBooth: boolean | null | undefined;
  readonly partner: {
    readonly href?: string | null | undefined;
    readonly isLinkable?: boolean | null | undefined;
    readonly name?: string | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "ShowContextualLink_show";
};
export type ShowContextualLink_show$key = {
  readonly " $data"?: ShowContextualLink_show$data;
  readonly " $fragmentSpreads": FragmentRefs<"ShowContextualLink_show">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ShowContextualLink_show",
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
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isActive",
          "storageKey": null
        },
        (v1/*: any*/)
      ],
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
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "isLinkable",
              "storageKey": null
            },
            (v1/*: any*/),
            (v0/*: any*/)
          ],
          "type": "Partner",
          "abstractKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Show",
  "abstractKey": null
};
})();

(node as any).hash = "650b5a3e83cb5f0cd65c87b33c8db18e";

export default node;
