/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Headline_facet = {
    readonly name?: string | null;
    readonly " $refType": "Headline_facet";
};
export type Headline_facet$data = Headline_facet;
export type Headline_facet$key = {
    readonly " $data"?: Headline_facet$data;
    readonly " $fragmentRefs": FragmentRefs<"Headline_facet">;
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
  "name": "Headline_facet",
  "selections": [
    {
      "kind": "InlineFragment",
      "selections": (v0/*: any*/),
      "type": "Tag"
    },
    {
      "kind": "InlineFragment",
      "selections": (v0/*: any*/),
      "type": "Gene"
    }
  ],
  "type": "ArtworkFilterFacet"
};
})();
(node as any).hash = 'cc39f7348e589619f9da1addd80e0022';
export default node;
