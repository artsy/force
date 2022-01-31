/**
 * @generated SignedSource<<bd4694d1cc038a9727fae4e3fad3530f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebarPartnerInfo_artwork$data = {
  readonly partner: {
    readonly name: string | null;
    readonly href: string | null;
    readonly locations: ReadonlyArray<{
      readonly city: string | null;
    } | null> | null;
  } | null;
  readonly sale: {
    readonly name: string | null;
    readonly href: string | null;
  } | null;
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
          "concreteType": "Location",
          "kind": "LinkedField",
          "name": "locations",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "city",
              "storageKey": null
            }
          ],
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

(node as any).hash = "806a61f16b48333cb19accd4017590d0";

export default node;
