/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ShowSubApp_show = {
    readonly id: string;
    readonly internalID: string;
    readonly slug: string;
    readonly name: string | null;
    readonly href: string | null;
    readonly isFairBooth: boolean | null;
    readonly partner: {
        readonly name?: string | null;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"ShowMeta_show">;
    readonly " $refType": "ShowSubApp_show";
};
export type ShowSubApp_show$data = ShowSubApp_show;
export type ShowSubApp_show$key = {
    readonly " $data"?: ShowSubApp_show$data;
    readonly " $fragmentRefs": FragmentRefs<"ShowSubApp_show">;
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
      "name": "ShowMeta_show"
    }
  ],
  "type": "Show"
};
})();
(node as any).hash = 'caf51c83f9a13f825d772ba7aabd2366';
export default node;
