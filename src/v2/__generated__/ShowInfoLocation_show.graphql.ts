/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ShowInfoLocation_show = {
    readonly fair: {
        readonly location: {
            readonly display: string | null;
            readonly address: string | null;
            readonly address2: string | null;
            readonly city: string | null;
            readonly state: string | null;
            readonly country: string | null;
            readonly summary: string | null;
        } | null;
    } | null;
    readonly location: {
        readonly display: string | null;
        readonly address: string | null;
        readonly address2: string | null;
        readonly city: string | null;
        readonly state: string | null;
        readonly country: string | null;
        readonly summary: string | null;
    } | null;
    readonly " $refType": "ShowInfoLocation_show";
};
export type ShowInfoLocation_show$data = ShowInfoLocation_show;
export type ShowInfoLocation_show$key = {
    readonly " $data"?: ShowInfoLocation_show$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ShowInfoLocation_show">;
};



const node: ReaderFragment = (function(){
var v0 = {
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
      "name": "display",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "address",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "address2",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "city",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "state",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "country",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "summary",
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ShowInfoLocation_show",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Fair",
      "kind": "LinkedField",
      "name": "fair",
      "plural": false,
      "selections": [
        (v0/*: any*/)
      ],
      "storageKey": null
    },
    (v0/*: any*/)
  ],
  "type": "Show",
  "abstractKey": null
};
})();
(node as any).hash = '85703778e703310bfac0d88513c68778';
export default node;
