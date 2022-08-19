/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type MyCollectionArtworkDemandIndex_artwork = {
    readonly marketPriceInsights: {
        readonly demandRank: number | null;
    } | null;
    readonly " $refType": "MyCollectionArtworkDemandIndex_artwork";
};
export type MyCollectionArtworkDemandIndex_artwork$data = MyCollectionArtworkDemandIndex_artwork;
export type MyCollectionArtworkDemandIndex_artwork$key = {
    readonly " $data"?: MyCollectionArtworkDemandIndex_artwork$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"MyCollectionArtworkDemandIndex_artwork">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MyCollectionArtworkDemandIndex_artwork",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ArtworkPriceInsights",
      "kind": "LinkedField",
      "name": "marketPriceInsights",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "demandRank",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
(node as any).hash = '61d851b973191874536d1442113aa469';
export default node;
