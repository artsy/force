/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AuctionCard_sale = {
    readonly cover_image: {
        readonly cropped: {
            readonly url: string | null;
        } | null;
    } | null;
    readonly isBenefit: boolean | null;
    readonly isGalleryAuction: boolean | null;
    readonly end_at: string | null;
    readonly href: string | null;
    readonly slug: string;
    readonly is_live_open: boolean | null;
    readonly is_preview: boolean | null;
    readonly live_start_at: string | null;
    readonly registrationStatus: {
        readonly internalID: string;
    } | null;
    readonly is_registration_closed: boolean | null;
    readonly name: string | null;
    readonly start_at: string | null;
    readonly is_closed: boolean | null;
    readonly partner: {
        readonly name: string | null;
    } | null;
    readonly " $refType": "AuctionCard_sale";
};
export type AuctionCard_sale$data = AuctionCard_sale;
export type AuctionCard_sale$key = {
    readonly " $data"?: AuctionCard_sale$data;
    readonly " $fragmentRefs": FragmentRefs<"AuctionCard_sale">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "AuctionCard_sale",
  "type": "Sale",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": "cover_image",
      "name": "coverImage",
      "storageKey": null,
      "args": null,
      "concreteType": "Image",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "cropped",
          "storageKey": "cropped(height:180,width:200)",
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 180
            },
            {
              "kind": "Literal",
              "name": "width",
              "value": 200
            }
          ],
          "concreteType": "CroppedImageUrl",
          "plural": false,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "url",
              "args": null,
              "storageKey": null
            }
          ]
        }
      ]
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "isBenefit",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "isGalleryAuction",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": "end_at",
      "name": "endAt",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "href",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "slug",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": "is_live_open",
      "name": "isLiveOpen",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": "is_preview",
      "name": "isPreview",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": "live_start_at",
      "name": "liveStartAt",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "registrationStatus",
      "storageKey": null,
      "args": null,
      "concreteType": "Bidder",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "internalID",
          "args": null,
          "storageKey": null
        }
      ]
    },
    {
      "kind": "ScalarField",
      "alias": "is_registration_closed",
      "name": "isRegistrationClosed",
      "args": null,
      "storageKey": null
    },
    (v0/*: any*/),
    {
      "kind": "ScalarField",
      "alias": "start_at",
      "name": "startAt",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": "is_closed",
      "name": "isClosed",
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
        (v0/*: any*/)
      ]
    }
  ]
};
})();
(node as any).hash = '8f37c0394eff3ea1633cd5d360966414';
export default node;
