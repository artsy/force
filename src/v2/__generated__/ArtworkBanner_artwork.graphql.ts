/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkBanner_artwork = {
    readonly partner: {
        readonly name: string | null;
        readonly initials: string | null;
    } | null;
    readonly sale: {
        readonly is_auction: boolean | null;
        readonly isBenefit: boolean | null;
        readonly isGalleryAuction: boolean | null;
        readonly cover_image: {
            readonly url: string | null;
        } | null;
    } | null;
    readonly context: ({
        readonly __typename: "Sale";
        readonly name: string | null;
        readonly href: string | null;
    } | {
        readonly __typename: "Fair";
        readonly name: string | null;
        readonly href: string | null;
        readonly profile: {
            readonly initials: string | null;
            readonly icon: {
                readonly img: {
                    readonly url: string;
                } | null;
            } | null;
        } | null;
    } | {
        readonly __typename: "Show";
        readonly name: string | null;
        readonly href: string | null;
        readonly status: string | null;
        readonly thumbnail: {
            readonly img: {
                readonly url: string;
            } | null;
        } | null;
    } | {
        /*This will never be '%other', but we need some
        value in case none of the concrete values match.*/
        readonly __typename: "%other";
    }) | null;
    readonly " $refType": "ArtworkBanner_artwork";
};
export type ArtworkBanner_artwork$data = ArtworkBanner_artwork;
export type ArtworkBanner_artwork$key = {
    readonly " $data"?: ArtworkBanner_artwork$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkBanner_artwork">;
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
  "name": "initials",
  "storageKey": null
},
v2 = {
  "kind": "Literal",
  "name": "version",
  "value": "square"
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v4 = [
  {
    "alias": "img",
    "args": [
      {
        "kind": "Literal",
        "name": "height",
        "value": 70
      },
      (v2/*: any*/),
      {
        "kind": "Literal",
        "name": "width",
        "value": 70
      }
    ],
    "concreteType": "ResizedImageUrl",
    "kind": "LinkedField",
    "name": "resized",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "url",
        "storageKey": null
      }
    ],
    "storageKey": "resized(height:70,version:\"square\",width:70)"
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkBanner_artwork",
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
        (v1/*: any*/)
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
        {
          "alias": "is_auction",
          "args": null,
          "kind": "ScalarField",
          "name": "isAuction",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isBenefit",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isGalleryAuction",
          "storageKey": null
        },
        {
          "alias": "cover_image",
          "args": null,
          "concreteType": "Image",
          "kind": "LinkedField",
          "name": "coverImage",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": [
                (v2/*: any*/)
              ],
              "kind": "ScalarField",
              "name": "url",
              "storageKey": "url(version:\"square\")"
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
      "concreteType": null,
      "kind": "LinkedField",
      "name": "context",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "__typename",
          "storageKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            (v0/*: any*/),
            (v3/*: any*/)
          ],
          "type": "Sale"
        },
        {
          "kind": "InlineFragment",
          "selections": [
            (v0/*: any*/),
            (v3/*: any*/),
            {
              "alias": null,
              "args": null,
              "concreteType": "Profile",
              "kind": "LinkedField",
              "name": "profile",
              "plural": false,
              "selections": [
                (v1/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "Image",
                  "kind": "LinkedField",
                  "name": "icon",
                  "plural": false,
                  "selections": (v4/*: any*/),
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "type": "Fair"
        },
        {
          "kind": "InlineFragment",
          "selections": [
            (v0/*: any*/),
            (v3/*: any*/),
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "status",
              "storageKey": null
            },
            {
              "alias": "thumbnail",
              "args": null,
              "concreteType": "Image",
              "kind": "LinkedField",
              "name": "coverImage",
              "plural": false,
              "selections": (v4/*: any*/),
              "storageKey": null
            }
          ],
          "type": "Show"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artwork"
};
})();
(node as any).hash = '6f615caa1957f1bdfb662387e2e3cc46';
export default node;
