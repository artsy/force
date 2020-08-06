/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebarClassification_artwork = {
    readonly attribution_class: {
        readonly short_description: string | null;
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
      "alias": "attribution_class",
      "args": null,
      "concreteType": "AttributionClass",
      "kind": "LinkedField",
      "name": "attributionClass",
      "plural": false,
      "selections": [
        {
          "alias": "short_description",
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
(node as any).hash = '8207b17fc2db26e6b886dd476a7920bf';
export default node;
