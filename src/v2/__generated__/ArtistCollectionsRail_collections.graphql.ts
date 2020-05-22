/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistCollectionsRail_collections = ReadonlyArray<{
    readonly " $fragmentRefs": FragmentRefs<"ArtistCollectionEntity_collection">;
    readonly " $refType": "ArtistCollectionsRail_collections";
}>;
export type ArtistCollectionsRail_collections$data = ArtistCollectionsRail_collections;
export type ArtistCollectionsRail_collections$key = ReadonlyArray<{
    readonly " $data"?: ArtistCollectionsRail_collections$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtistCollectionsRail_collections">;
}>;



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "ArtistCollectionsRail_collections",
  "type": "MarketingCollection",
  "metadata": {
    "plural": true
  },
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "FragmentSpread",
      "name": "ArtistCollectionEntity_collection",
      "args": null
    }
  ]
};
(node as any).hash = '321de31247fea0486faf7cdbe0016219';
export default node;
