/**
 * @generated SignedSource<<0888bc0c00a6dc9ba26af28842b51c3d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type HomeNewWorksFromGalleriesYouFollowRail_newWorksFromGalleriesYouFollowConnection$data = {
  readonly edges: ReadonlyArray<{
    readonly node: {
      readonly internalID: string;
      readonly slug: string;
      readonly " $fragmentSpreads": FragmentRefs<"ShelfArtwork_artwork">;
    } | null | undefined;
  } | null | undefined> | null | undefined;
  readonly " $fragmentType": "HomeNewWorksFromGalleriesYouFollowRail_newWorksFromGalleriesYouFollowConnection";
};
export type HomeNewWorksFromGalleriesYouFollowRail_newWorksFromGalleriesYouFollowConnection$key = {
  readonly " $data"?: HomeNewWorksFromGalleriesYouFollowRail_newWorksFromGalleriesYouFollowConnection$data;
  readonly " $fragmentSpreads": FragmentRefs<"HomeNewWorksFromGalleriesYouFollowRail_newWorksFromGalleriesYouFollowConnection">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "HomeNewWorksFromGalleriesYouFollowRail_newWorksFromGalleriesYouFollowConnection",
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
              "args": null,
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

(node as any).hash = "2f8f6448afd9d7beff96368e20f847bd";

export default node;
