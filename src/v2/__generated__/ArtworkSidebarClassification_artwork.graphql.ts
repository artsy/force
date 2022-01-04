/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebarClassification_artwork = {
    readonly attributionClass: {
        readonly shortDescription: string | null;
    } | null;
    readonly " $refType": "ArtworkSidebarClassification_artwork";
};
export type ArtworkSidebarClassification_artwork$data = ArtworkSidebarClassification_artwork;
export type ArtworkSidebarClassification_artwork$key = {
    readonly " $data"?: ArtworkSidebarClassification_artwork$data;
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
          "name": "shortDescription",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artwork"
};
(node as any).hash = '6a721c8be12ea96c63dfb430081f0a4a';
export default node;
