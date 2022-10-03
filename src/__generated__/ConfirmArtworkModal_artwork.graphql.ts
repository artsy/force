/**
 * @generated SignedSource<<b412e7a59b437c10c0559d69a410f489>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ConfirmArtworkModal_artwork$data = {
  readonly editionSets: ReadonlyArray<{
    readonly internalID: string;
    readonly " $fragmentSpreads": FragmentRefs<"EditionSelectBox_edition">;
  } | null> | null;
  readonly internalID: string;
  readonly isEdition: boolean | null;
  readonly " $fragmentSpreads": FragmentRefs<"CollapsibleArtworkDetails_artwork" | "ConfirmArtworkButton_artwork">;
  readonly " $fragmentType": "ConfirmArtworkModal_artwork";
};
export type ConfirmArtworkModal_artwork$key = {
  readonly " $data"?: ConfirmArtworkModal_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ConfirmArtworkModal_artwork">;
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
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CollapsibleArtworkDetails_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ConfirmArtworkButton_artwork"
    },
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
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
})();

(node as any).hash = "c0d50a29df5a5234fd379374324d3f3b";

export default node;
