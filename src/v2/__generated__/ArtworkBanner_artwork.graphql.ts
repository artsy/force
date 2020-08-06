/* tslint:disable */

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
                    readonly url: string | null;
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
                readonly url: string | null;
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
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "initials",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "Literal",
  "name": "version",
  "value": "square"
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "href",
  "args": null,
  "storageKey": null
},
v4 = [
  {
    "kind": "LinkedField",
    "alias": "img",
    "name": "resized",
    "storageKey": "resized(height:70,version:\"square\",width:70)",
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
];
return {
  "kind": "Fragment",
  "name": "ArtworkBanner_artwork",
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
        (v1/*: any*/)
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
          "alias": "is_auction",
          "name": "isAuction",
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
          "kind": "ScalarField",
          "alias": null,
          "name": "isGalleryAuction",
          "args": null,
          "storageKey": null
        },
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
              "kind": "ScalarField",
              "alias": null,
              "name": "url",
              "args": [
                (v2/*: any*/)
              ],
              "storageKey": "url(version:\"square\")"
            }
          ]
        }
      ]
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "context",
      "storageKey": null,
      "args": null,
      "concreteType": null,
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "__typename",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "InlineFragment",
          "type": "Sale",
          "selections": [
            (v0/*: any*/),
            (v3/*: any*/)
          ]
        },
        {
          "kind": "InlineFragment",
          "type": "Fair",
          "selections": [
            (v0/*: any*/),
            (v3/*: any*/),
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "profile",
              "storageKey": null,
              "args": null,
              "concreteType": "Profile",
              "plural": false,
              "selections": [
                (v1/*: any*/),
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "icon",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "Image",
                  "plural": false,
                  "selections": (v4/*: any*/)
                }
              ]
            }
          ]
        },
        {
          "kind": "InlineFragment",
          "type": "Show",
          "selections": [
            (v0/*: any*/),
            (v3/*: any*/),
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "status",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "LinkedField",
              "alias": "thumbnail",
              "name": "coverImage",
              "storageKey": null,
              "args": null,
              "concreteType": "Image",
              "plural": false,
              "selections": (v4/*: any*/)
            }
          ]
        }
      ]
    }
  ]
};
})();
(node as any).hash = '6f615caa1957f1bdfb662387e2e3cc46';
export default node;
