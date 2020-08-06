/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebarPartnerInfo_artwork = {
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
    readonly " $refType": "ArtworkSidebarPartnerInfo_artwork";
};
export type ArtworkSidebarPartnerInfo_artwork$data = ArtworkSidebarPartnerInfo_artwork;
export type ArtworkSidebarPartnerInfo_artwork$key = {
    readonly " $data"?: ArtworkSidebarPartnerInfo_artwork$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkSidebarPartnerInfo_artwork">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "href",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "ArtworkSidebarPartnerInfo_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "partner",
      "storageKey": null,
      "args": null,
      "concreteType": "Partner",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        (v1/*: any*/),
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "locations",
          "storageKey": null,
          "args": null,
          "concreteType": "Location",
          "plural": true,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "city",
              "args": null,
              "storageKey": null
            }
          ]
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
        (v0/*: any*/),
        (v1/*: any*/)
      ]
    }
  ]
};
})();
(node as any).hash = '806a61f16b48333cb19accd4017590d0';
export default node;
