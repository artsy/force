/**
 * @generated SignedSource<<f329a8f8d6983db442a3bd100911bb89>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkDetailsAdditionalInfo_artwork$data = {
  readonly canRequestLotConditionsReport: boolean | null;
  readonly category: string | null;
  readonly certificateOfAuthenticity: {
    readonly details: string | null;
    readonly label: string | null;
  } | null;
  readonly conditionDescription: {
    readonly details: string | null;
    readonly label: string | null;
  } | null;
  readonly framed: {
    readonly details: string | null;
    readonly label: string | null;
  } | null;
  readonly image_rights: string | null;
  readonly internalID: string;
  readonly manufacturer: string | null;
  readonly mediumType: {
    readonly __typename: "ArtworkMedium";
  } | null;
  readonly publisher: string | null;
  readonly series: string | null;
  readonly signatureInfo: {
    readonly details: string | null;
    readonly label: string | null;
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkDetailsMediumModal_artwork">;
  readonly " $fragmentType": "ArtworkDetailsAdditionalInfo_artwork";
};
export type ArtworkDetailsAdditionalInfo_artwork$key = {
  readonly " $data"?: ArtworkDetailsAdditionalInfo_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkDetailsAdditionalInfo_artwork">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "label",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "details",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkDetailsAdditionalInfo_artwork",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "category",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "series",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "publisher",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "manufacturer",
      "storageKey": null
    },
    {
      "alias": "image_rights",
      "args": null,
      "kind": "ScalarField",
      "name": "imageRights",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "canRequestLotConditionsReport",
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
      "concreteType": "ArtworkInfoRow",
      "kind": "LinkedField",
      "name": "framed",
      "plural": false,
      "selections": (v0/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ArtworkInfoRow",
      "kind": "LinkedField",
      "name": "signatureInfo",
      "plural": false,
      "selections": (v0/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ArtworkInfoRow",
      "kind": "LinkedField",
      "name": "conditionDescription",
      "plural": false,
      "selections": (v0/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ArtworkInfoRow",
      "kind": "LinkedField",
      "name": "certificateOfAuthenticity",
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
          "kind": "ScalarField",
          "name": "__typename",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkDetailsMediumModal_artwork"
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
})();

(node as any).hash = "161cae3ba06592435e444531a87c7248";

export default node;
