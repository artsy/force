/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkBanner_artwork = {
    readonly internalID: string;
    readonly sale: {
        readonly " $fragmentRefs": FragmentRefs<"CascadingEndTimesBanner_sale">;
    } | null;
    readonly " $refType": "ArtworkBanner_artwork";
};
export type ArtworkBanner_artwork$data = ArtworkBanner_artwork;
export type ArtworkBanner_artwork$key = {
    readonly " $data"?: ArtworkBanner_artwork$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkBanner_artwork">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkBanner_artwork",
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
      "concreteType": "Sale",
      "kind": "LinkedField",
      "name": "sale",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "CascadingEndTimesBanner_sale"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
(node as any).hash = 'ce4d2d98a361b7e42da03b31a390ddba';
export default node;
