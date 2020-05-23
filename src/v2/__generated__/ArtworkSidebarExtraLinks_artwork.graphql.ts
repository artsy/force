/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebarExtraLinks_artwork = {
    readonly internalID: string;
    readonly is_in_auction: boolean | null;
    readonly is_for_sale: boolean | null;
    readonly is_acquireable: boolean | null;
    readonly is_inquireable: boolean | null;
    readonly artists: ReadonlyArray<{
        readonly is_consignable: boolean | null;
    } | null> | null;
    readonly sale: {
        readonly is_closed: boolean | null;
        readonly isBenefit: boolean | null;
        readonly partner: {
            readonly name: string | null;
        } | null;
    } | null;
    readonly " $refType": "ArtworkSidebarExtraLinks_artwork";
};
export type ArtworkSidebarExtraLinks_artwork$data = ArtworkSidebarExtraLinks_artwork;
export type ArtworkSidebarExtraLinks_artwork$key = {
    readonly " $data"?: ArtworkSidebarExtraLinks_artwork$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkSidebarExtraLinks_artwork">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "ArtworkSidebarExtraLinks_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "internalID",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": "is_in_auction",
      "name": "isInAuction",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": "is_for_sale",
      "name": "isForSale",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": "is_acquireable",
      "name": "isAcquireable",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": "is_inquireable",
      "name": "isInquireable",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "artists",
      "storageKey": null,
      "args": null,
      "concreteType": "Artist",
      "plural": true,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": "is_consignable",
          "name": "isConsignable",
          "args": null,
          "storageKey": null
        }
      ]
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "sale",
      "storageKey": null,
      "args": null,
      "concreteType": "Sale",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": "is_closed",
          "name": "isClosed",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "isBenefit",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "partner",
          "storageKey": null,
          "args": null,
          "concreteType": "Partner",
          "plural": false,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "name",
              "args": null,
              "storageKey": null
            }
          ]
        }
      ]
    }
  ]
};
(node as any).hash = 'bec792d6e1dee8cecdc8ce83584d8d2e';
export default node;
