/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ConfirmArtworkModal_artwork = {
    readonly internalID: string;
    readonly isEdition: boolean | null;
    readonly editionSets: ReadonlyArray<{
        readonly internalID: string;
        readonly editionOf: string | null;
        readonly isOfferableFromInquiry: boolean | null;
        readonly listPrice: {
            readonly display?: string | null;
        } | null;
        readonly dimensions: {
            readonly cm: string | null;
            readonly in: string | null;
        } | null;
    } | null> | null;
    readonly " $fragmentRefs": FragmentRefs<"CollapsibleArtworkDetails_artwork" | "ConfirmArtworkButton_artwork">;
    readonly " $refType": "ConfirmArtworkModal_artwork";
};
export type ConfirmArtworkModal_artwork$data = ConfirmArtworkModal_artwork;
export type ConfirmArtworkModal_artwork$key = {
    readonly " $data"?: ConfirmArtworkModal_artwork$data;
    readonly " $fragmentRefs": FragmentRefs<"ConfirmArtworkModal_artwork">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v1 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ConfirmArtworkModal_artwork",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isEdition",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "EditionSet",
      "kind": "LinkedField",
      "name": "editionSets",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "editionOf",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isOfferableFromInquiry",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": null,
          "kind": "LinkedField",
          "name": "listPrice",
          "plural": false,
          "selections": [
            {
              "kind": "InlineFragment",
              "selections": (v1/*: any*/),
              "type": "Money"
            },
            {
              "kind": "InlineFragment",
              "selections": (v1/*: any*/),
              "type": "PriceRange"
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "dimensions",
          "kind": "LinkedField",
          "name": "dimensions",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "cm",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "in",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CollapsibleArtworkDetails_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ConfirmArtworkButton_artwork"
    }
  ],
  "type": "Artwork"
};
})();
(node as any).hash = '8d9646495e546189524d9e579463a5e8';
export default node;
