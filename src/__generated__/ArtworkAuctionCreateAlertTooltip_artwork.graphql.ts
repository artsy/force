/**
 * @generated SignedSource<<f715c4fe751f7a6d764e9094b087adb4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkAuctionCreateAlertTooltip_artwork$data = {
  readonly artistNames: string | null;
  readonly attributionClass: {
    readonly name: string | null;
  } | null;
  readonly internalID: string;
  readonly mediumType: {
    readonly filterGene: {
      readonly name: string | null;
    } | null;
  } | null;
  readonly " $fragmentType": "ArtworkAuctionCreateAlertTooltip_artwork";
};
export type ArtworkAuctionCreateAlertTooltip_artwork$key = {
  readonly " $data"?: ArtworkAuctionCreateAlertTooltip_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkAuctionCreateAlertTooltip_artwork">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "name",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkAuctionCreateAlertTooltip_artwork",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "artistNames",
      "storageKey": null
    },
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
      "concreteType": "AttributionClass",
      "kind": "LinkedField",
      "name": "attributionClass",
      "plural": false,
      "selections": (v0/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ArtworkMedium",
      "kind": "LinkedField",
      "name": "mediumType",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Gene",
          "kind": "LinkedField",
          "name": "filterGene",
          "plural": false,
          "selections": (v0/*: any*/),
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
})();

(node as any).hash = "ce99cec37531315e74c886e2dfa51a14";

export default node;
