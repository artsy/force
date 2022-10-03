/**
 * @generated SignedSource<<e6b57dbd82aacfb2b1f7af62d0ede972>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebar2EditionSets_artwork$data = {
  readonly isInquireable: boolean | null;
  readonly isOfferable: boolean | null;
  readonly isAcquireable: boolean | null;
  readonly editionSets: ReadonlyArray<{
    readonly id: string;
    readonly isOfferable: boolean | null;
    readonly isAcquireable: boolean | null;
    readonly saleMessage: string | null;
    readonly " $fragmentSpreads": FragmentRefs<"ArtworkSidebar2SizeInfo_piece">;
  } | null> | null;
  readonly " $fragmentType": "ArtworkSidebar2EditionSets_artwork";
};
export type ArtworkSidebar2EditionSets_artwork$key = {
  readonly " $data"?: ArtworkSidebar2EditionSets_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkSidebar2EditionSets_artwork">;
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
  "name": "ArtworkSidebar2EditionSets_artwork",
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
          "name": "ArtworkSidebar2SizeInfo_piece"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
})();

(node as any).hash = "7caa0d9ba122d91eaf4ccef5c6ec2741";

export default node;
