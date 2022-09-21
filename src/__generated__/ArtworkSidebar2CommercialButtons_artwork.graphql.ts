/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebar2CommercialButtons_artwork = {
    readonly saleMessage: string | null;
    readonly isInquireable: boolean | null;
    readonly isAcquireable: boolean | null;
    readonly isOfferable: boolean | null;
    readonly isSold: boolean | null;
    readonly editionSets: ReadonlyArray<{
        readonly id: string;
        readonly isAcquireable: boolean | null;
        readonly isOfferable: boolean | null;
        readonly saleMessage: string | null;
    } | null> | null;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkSidebar2EditionSets_artwork">;
    readonly " $refType": "ArtworkSidebar2CommercialButtons_artwork";
};
export type ArtworkSidebar2CommercialButtons_artwork$data = ArtworkSidebar2CommercialButtons_artwork;
export type ArtworkSidebar2CommercialButtons_artwork$key = {
    readonly " $data"?: ArtworkSidebar2CommercialButtons_artwork$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkSidebar2CommercialButtons_artwork">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "saleMessage",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isAcquireable",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isOfferable",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkSidebar2CommercialButtons_artwork",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isInquireable",
      "storageKey": null
    },
    (v1/*: any*/),
    (v2/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isSold",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "EditionSet",
      "kind": "LinkedField",
      "name": "editionSets",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "id",
          "storageKey": null
        },
        (v1/*: any*/),
        (v2/*: any*/),
        (v0/*: any*/)
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkSidebar2EditionSets_artwork"
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
})();
(node as any).hash = '1294609029e6979329c3938dc223aed6';
export default node;
