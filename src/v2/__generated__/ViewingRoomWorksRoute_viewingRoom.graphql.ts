/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ViewingRoomWorksRoute_viewingRoom = {
    readonly artworksConnection: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly internalID: string;
                readonly " $fragmentRefs": FragmentRefs<"ViewingRoomCarousel_artwork" | "ViewingRoomArtworkDetails_artwork">;
            } | null;
        } | null> | null;
    } | null;
    readonly " $refType": "ViewingRoomWorksRoute_viewingRoom";
};
export type ViewingRoomWorksRoute_viewingRoom$data = ViewingRoomWorksRoute_viewingRoom;
export type ViewingRoomWorksRoute_viewingRoom$key = {
    readonly " $data"?: ViewingRoomWorksRoute_viewingRoom$data;
    readonly " $fragmentRefs": FragmentRefs<"ViewingRoomWorksRoute_viewingRoom">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "ViewingRoomWorksRoute_viewingRoom",
  "type": "ViewingRoom",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "artworksConnection",
      "storageKey": null,
      "args": null,
      "concreteType": "ArtworkConnection",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "edges",
          "storageKey": null,
          "args": null,
          "concreteType": "ArtworkEdge",
          "plural": true,
          "selections": [
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "node",
              "storageKey": null,
              "args": null,
              "concreteType": "Artwork",
              "plural": false,
              "selections": [
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "internalID",
                  "args": null,
                  "storageKey": null
                },
                {
                  "kind": "FragmentSpread",
                  "name": "ViewingRoomCarousel_artwork",
                  "args": null
                },
                {
                  "kind": "FragmentSpread",
                  "name": "ViewingRoomArtworkDetails_artwork",
                  "args": null
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
(node as any).hash = 'c64e03c30e50e3e2cc05c4715754b414';
export default node;
