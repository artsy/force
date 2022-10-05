/**
 * @generated SignedSource<<7d2ead9d7fcd5d8d58e6d1b1252d2dcf>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebar2PartnerInfo_artwork$data = {
  readonly internalID: string;
  readonly isInAuction: boolean | null;
  readonly isInquireable: boolean | null;
  readonly partner: {
    readonly cities: ReadonlyArray<string | null> | null;
    readonly href: string | null;
    readonly name: string | null;
    readonly partnerType: string | null;
  } | null;
  readonly sale: {
    readonly href: string | null;
    readonly name: string | null;
  } | null;
  readonly slug: string;
  readonly " $fragmentType": "ArtworkSidebar2PartnerInfo_artwork";
};
export type ArtworkSidebar2PartnerInfo_artwork$key = {
  readonly " $data"?: ArtworkSidebar2PartnerInfo_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkSidebar2PartnerInfo_artwork">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkSidebar2PartnerInfo_artwork",
  "selections": [
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
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isInquireable",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isInAuction",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Partner",
      "kind": "LinkedField",
      "name": "partner",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        (v1/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "cities",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "partnerType",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Sale",
      "kind": "LinkedField",
      "name": "sale",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        (v1/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
})();

(node as any).hash = "5e604e5a91edeb0d7c08737045277701";

export default node;
