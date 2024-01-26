/**
 * @generated SignedSource<<92071011ba7c2193364cab11d6472d1d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NotificationArtworkList_artworksConnection$data = {
  readonly edges: ReadonlyArray<{
    readonly node: {
      readonly internalID: string;
      readonly " $fragmentSpreads": FragmentRefs<"NotificationArtwork_artwork">;
    } | null | undefined;
  } | null | undefined> | null | undefined;
  readonly " $fragmentType": "NotificationArtworkList_artworksConnection";
};
export type NotificationArtworkList_artworksConnection$key = {
  readonly " $data"?: NotificationArtworkList_artworksConnection$data;
  readonly " $fragmentSpreads": FragmentRefs<"NotificationArtworkList_artworksConnection">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NotificationArtworkList_artworksConnection",
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
              "args": null,
              "kind": "FragmentSpread",
              "name": "NotificationArtwork_artwork"
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "internalID",
              "storageKey": null
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

(node as any).hash = "58123c4686453bf60a5a0d6fe107ae37";

export default node;
