/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
export type Headline_facet = {
    readonly name?: string | null;
};



const node: ConcreteFragment = (function(){
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
      "kind": "ScalarField",
      "alias": null,
      "name": "__id",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "InlineFragment",
      "type": "ArtworkFilterGene",
      "selections": v0
    },
    {
      "kind": "InlineFragment",
      "type": "ArtworkFilterTag",
      "selections": v0
    }
  ]
};
})();
(node as any).hash = 'fe0e6f752ce23f2a03e177de220f2ed6';
export default node;
