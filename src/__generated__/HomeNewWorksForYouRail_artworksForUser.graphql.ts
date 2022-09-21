/**
 * @generated SignedSource<<3dca1ba95609c8dc1e74a888fef04045>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type HomeNewWorksForYouRail_artworksForUser$data = {
  readonly edges: ReadonlyArray<{
    readonly node: {
      readonly internalID: string;
      readonly slug: string;
      readonly " $fragmentSpreads": FragmentRefs<"ShelfArtwork_artwork">;
    } | null;
  } | null> | null;
  readonly " $fragmentType": "HomeNewWorksForYouRail_artworksForUser";
};
export type HomeNewWorksForYouRail_artworksForUser$key = {
  readonly " $data"?: HomeNewWorksForYouRail_artworksForUser$data;
  readonly " $fragmentSpreads": FragmentRefs<"HomeNewWorksForYouRail_artworksForUser">;
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

(node as any).hash = "c80497b8abf280f4f25d4ab38900546f";

export default node;
