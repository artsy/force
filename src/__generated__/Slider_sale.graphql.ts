/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
export type Slider_sale = {
    readonly artworks: ReadonlyArray<({
        readonly image: ({
            readonly aspect_ratio: number | null;
        }) | null;
    }) | null> | null;
};



const node: ConcreteFragment = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "Slider_sale",
  "type": "Sale",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "artworks",
      "storageKey": null,
      "args": null,
      "concreteType": "Artwork",
      "plural": true,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "image",
          "storageKey": null,
          "args": null,
          "concreteType": "Image",
          "plural": false,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "aspect_ratio",
              "args": null,
              "storageKey": null
            }
          ]
        },
        {
          "kind": "FragmentSpread",
          "name": "FillwidthItem_artwork",
          "args": null
        },
        v0
      ]
    },
    v0
  ]
};
})();
(node as any).hash = 'b5b12d888859091241dbdeda73f3c972';
export default node;
