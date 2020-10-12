/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ShowInfoLocation_show = {
    readonly fair: {
        readonly location: {
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
    readonly " $data"?: ShowInfoLocation_show$data;
    readonly " $fragmentRefs": FragmentRefs<"ShowInfoLocation_show">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "address",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "address2",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "city",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "state",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "country",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "summary",
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
        {
          "alias": null,
          "args": null,
          "concreteType": "Location",
          "kind": "LinkedField",
          "name": "location",
          "plural": false,
          "selections": [
            (v0/*: any*/),
            (v1/*: any*/),
            (v2/*: any*/),
            (v3/*: any*/),
            (v4/*: any*/),
            (v5/*: any*/)
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
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
          "name": "display",
          "storageKey": null
        },
        (v0/*: any*/),
        (v1/*: any*/),
        (v2/*: any*/),
        (v3/*: any*/),
        (v4/*: any*/),
        (v5/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "Show"
};
})();
(node as any).hash = '32f8e92fef4dc6b8d0d82dac3e7291c5';
export default node;
