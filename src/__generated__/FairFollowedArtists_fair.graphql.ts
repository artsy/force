/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairFollowedArtists_fair = {
    readonly internalID: string;
    readonly slug: string;
    readonly followedArtistArtworks: {
        readonly edges: ReadonlyArray<{
            readonly artwork: {
                readonly internalID: string;
                readonly slug: string;
                readonly " $fragmentRefs": FragmentRefs<"FillwidthItem_artwork">;
            } | null;
        } | null> | null;
    } | null;
    readonly " $refType": "FairFollowedArtists_fair";
};
export type FairFollowedArtists_fair$data = FairFollowedArtists_fair;
export type FairFollowedArtists_fair$key = {
    readonly " $data"?: FairFollowedArtists_fair$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"FairFollowedArtists_fair">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FairFollowedArtists_fair",
  "selections": [
    (v0/*: any*/),
    (v1/*: any*/),
    {
      "alias": "followedArtistArtworks",
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 20
        },
        {
          "kind": "Literal",
          "name": "includeArtworksByFollowedArtists",
          "value": true
        }
      ],
      "concreteType": "FilterArtworksConnection",
      "kind": "LinkedField",
      "name": "filterArtworksConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "FilterArtworksEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": "artwork",
              "args": null,
              "concreteType": "Artwork",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                (v0/*: any*/),
                (v1/*: any*/),
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "FillwidthItem_artwork"
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "filterArtworksConnection(first:20,includeArtworksByFollowedArtists:true)"
    }
  ],
  "type": "Fair",
  "abstractKey": null
};
})();
(node as any).hash = '7ae10ce6625902d40dcc690d39252781';
export default node;
