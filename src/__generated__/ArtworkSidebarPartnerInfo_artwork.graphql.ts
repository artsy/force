/**
 * @generated SignedSource<<124b55bd8251c63154885d8354995010>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebarPartnerInfo_artwork$data = {
  readonly internalID: string;
  readonly isInquireable: boolean | null;
  readonly is_in_auction: boolean | null;
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
  readonly " $fragmentType": "ArtworkSidebarPartnerInfo_artwork";
};
export type ArtworkSidebarPartnerInfo_artwork$key = {
  readonly " $data"?: ArtworkSidebarPartnerInfo_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkSidebarPartnerInfo_artwork">;
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
  "name": "ArtworkSidebarPartnerInfo_artwork",
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
      "alias": "is_in_auction",
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

(node as any).hash = "d4a0fbfae7699f4289c0af2a0cd4f7a3";

export default node;
