/**
 * @generated SignedSource<<4de02bd282263f330c78f183f330df63>>
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
  readonly isInquireable: boolean | null | undefined;
  readonly partner: {
    readonly cities: ReadonlyArray<string | null | undefined> | null | undefined;
    readonly href: string | null | undefined;
    readonly isInquireable: boolean;
    readonly name: string | null | undefined;
  } | null | undefined;
  readonly sale: {
    readonly href: string | null | undefined;
    readonly name: string | null | undefined;
  } | null | undefined;
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
  "name": "isInquireable",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v2 = {
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
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Partner",
      "kind": "LinkedField",
      "name": "partner",
      "plural": false,
      "selections": [
        (v1/*: any*/),
        (v2/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "cities",
          "storageKey": null
        },
        (v0/*: any*/)
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
        (v1/*: any*/),
        (v2/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
})();

(node as any).hash = "da5b640e870574e095613971197caded";

export default node;
