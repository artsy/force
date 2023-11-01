/**
 * @generated SignedSource<<d4fa398dfee8d2ba15a2f5de8f0fb163>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebarBiddingClosedMessage_artwork$data = {
  readonly artists: ReadonlyArray<{
    readonly slug: string;
  } | null> | null;
  readonly attributionClass: {
    readonly internalID: string;
  } | null;
  readonly isEligibleToCreateAlert: boolean;
  readonly mediumType: {
    readonly filterGene: {
      readonly slug: string;
    } | null;
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkCreateAlertButton_artwork">;
  readonly " $fragmentType": "ArtworkSidebarBiddingClosedMessage_artwork";
};
export type ArtworkSidebarBiddingClosedMessage_artwork$key = {
  readonly " $data"?: ArtworkSidebarBiddingClosedMessage_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkSidebarBiddingClosedMessage_artwork">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "slug",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkSidebarBiddingClosedMessage_artwork",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkCreateAlertButton_artwork"
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isEligibleToCreateAlert",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Artist",
      "kind": "LinkedField",
      "name": "artists",
      "plural": true,
      "selections": (v0/*: any*/),
      "storageKey": null
    },
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
          "name": "internalID",
          "storageKey": null
        }
      ],
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

(node as any).hash = "7e8c4319c5a7c15a492c13208ee0df1e";

export default node;
