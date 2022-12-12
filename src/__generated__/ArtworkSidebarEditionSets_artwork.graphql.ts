/**
 * @generated SignedSource<<74b37b95fd843569eb1731c8e333130f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebarEditionSets_artwork$data = {
  readonly editionSets: ReadonlyArray<{
    readonly id: string;
    readonly internalID: string;
    readonly isAcquireable: boolean | null;
    readonly isOfferable: boolean | null;
    readonly saleMessage: string | null;
    readonly " $fragmentSpreads": FragmentRefs<"ArtworkSidebarSizeInfo_piece">;
  } | null> | null;
  readonly isAcquireable: boolean | null;
  readonly isInquireable: boolean | null;
  readonly isOfferable: boolean | null;
  readonly " $fragmentType": "ArtworkSidebarEditionSets_artwork";
};
export type ArtworkSidebarEditionSets_artwork$key = {
  readonly " $data"?: ArtworkSidebarEditionSets_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkSidebarEditionSets_artwork">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isOfferable",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isAcquireable",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkSidebarEditionSets_artwork",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isInquireable",
      "storageKey": null
    },
    (v0/*: any*/),
    (v1/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "EditionSet",
      "kind": "LinkedField",
      "name": "editionSets",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "id",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "internalID",
          "storageKey": null
        },
        (v0/*: any*/),
        (v1/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "saleMessage",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ArtworkSidebarSizeInfo_piece"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
})();

(node as any).hash = "1c387cbaa234401f0b50a84cc6e0a3d3";

export default node;
