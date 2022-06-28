/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type HomeNewWorksForYouRail_artworksForUser = {
    readonly edges: ReadonlyArray<{
        readonly node: {
            readonly internalID: string;
            readonly slug: string;
            readonly " $fragmentRefs": FragmentRefs<"ShelfArtwork_artwork">;
        } | null;
    } | null> | null;
    readonly " $refType": "HomeNewWorksForYouRail_artworksForUser";
};
export type HomeNewWorksForYouRail_artworksForUser$data = HomeNewWorksForYouRail_artworksForUser;
export type HomeNewWorksForYouRail_artworksForUser$key = {
    readonly " $data"?: HomeNewWorksForYouRail_artworksForUser$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"HomeNewWorksForYouRail_artworksForUser">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "HomeNewWorksForYouRail_artworksForUser",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ArtworkEdge",
      "kind": "LinkedField",
      "name": "edges",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Artwork",
          "kind": "LinkedField",
          "name": "node",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "internalID",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "slug",
              "storageKey": null
            },
            {
              "args": [
                {
                  "kind": "Literal",
                  "name": "width",
                  "value": 210
                }
              ],
              "kind": "FragmentSpread",
              "name": "ShelfArtwork_artwork"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ArtworkConnection",
  "abstractKey": null
};
(node as any).hash = 'c80497b8abf280f4f25d4ab38900546f';
export default node;
