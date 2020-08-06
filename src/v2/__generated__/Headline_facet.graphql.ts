/* tslint:disable */

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
    "kind": "ScalarField",
    "alias": null,
    "name": "name",
    "args": null,
    "storageKey": null
  }
];
return {
  "kind": "Fragment",
  "name": "Headline_facet",
  "type": "ArtworkFilterFacet",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "InlineFragment",
      "type": "Tag",
      "selections": (v0/*: any*/)
    },
    {
      "kind": "InlineFragment",
      "type": "Gene",
      "selections": (v0/*: any*/)
    }
  ]
};
})();
(node as any).hash = 'cc39f7348e589619f9da1addd80e0022';
export default node;
