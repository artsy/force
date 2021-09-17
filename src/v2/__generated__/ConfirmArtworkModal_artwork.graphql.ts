/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ConfirmArtworkModal_artwork = {
    readonly internalID: string;
    readonly isEdition: boolean | null;
    readonly editionSets: ReadonlyArray<{
        readonly internalID: string;
        readonly " $fragmentRefs": FragmentRefs<"EditionSelectBox_edition">;
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
};
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
          "args": null,
          "kind": "FragmentSpread",
          "name": "EditionSelectBox_edition"
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
  "type": "Artwork",
  "abstractKey": null
};
})();
(node as any).hash = 'c0d50a29df5a5234fd379374324d3f3b';
export default node;
