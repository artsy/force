/**
 * @generated SignedSource<<1d8be5a4bc240be9778fe05fad2baed0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PrivateArtworkAdditionalInfo_artwork$data = {
  readonly attributionClass: {
    readonly name: string | null | undefined;
  } | null | undefined;
  readonly canRequestLotConditionsReport: boolean | null | undefined;
  readonly category: string | null | undefined;
  readonly certificateOfAuthenticity: {
    readonly details: string | null | undefined;
    readonly label: string | null | undefined;
  } | null | undefined;
  readonly conditionDescription: {
    readonly details: string | null | undefined;
    readonly label: string | null | undefined;
  } | null | undefined;
  readonly dimensions: {
    readonly cm: string | null | undefined;
    readonly in: string | null | undefined;
  } | null | undefined;
  readonly framed: {
    readonly details: string | null | undefined;
    readonly label: string | null | undefined;
  } | null | undefined;
  readonly image_rights: string | null | undefined;
  readonly internalID: string;
  readonly isUnlisted: boolean;
  readonly manufacturer: string | null | undefined;
  readonly medium: string | null | undefined;
  readonly mediumType: {
    readonly __typename: "ArtworkMedium";
  } | null | undefined;
  readonly publisher: string | null | undefined;
  readonly series: string | null | undefined;
  readonly signatureInfo: {
    readonly details: string | null | undefined;
    readonly label: string | null | undefined;
  } | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkDetailsMediumModal_artwork">;
  readonly " $fragmentType": "PrivateArtworkAdditionalInfo_artwork";
};
export type PrivateArtworkAdditionalInfo_artwork$key = {
  readonly " $data"?: PrivateArtworkAdditionalInfo_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"PrivateArtworkAdditionalInfo_artwork">;
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
  "name": "PrivateArtworkAdditionalInfo_artwork",
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
      "kind": "ScalarField",
      "name": "isUnlisted",
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
          "name": "in",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "cm",
          "storageKey": null
        }
      ],
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
          "name": "name",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "medium",
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

(node as any).hash = "c91cc81c99bca583d41b3c75486eb225";

export default node;
