/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebarClassification_artwork = {
    readonly attributionClass: {
        readonly shortArrayDescription: ReadonlyArray<string | null> | null;
    } | null;
    readonly " $refType": "ArtworkSidebarClassification_artwork";
};
export type ArtworkSidebarClassification_artwork$data = ArtworkSidebarClassification_artwork;
export type ArtworkSidebarClassification_artwork$key = {
    readonly " $data"?: ArtworkSidebarClassification_artwork$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkSidebarClassification_artwork">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkSidebarClassification_artwork",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "AttributionClass",
      "kind": "LinkedField",
      "name": "attributionClass",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "shortArrayDescription",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
(node as any).hash = 'f9a288295e18df0165f1f881a6bff63b';
export default node;
