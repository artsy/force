/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkMeta_artwork = {
    readonly href: string | null;
    readonly internalID: string;
    readonly date: string | null;
    readonly artist_names: string | null;
    readonly sale_message: string | null;
    readonly partner: {
        readonly name: string | null;
    } | null;
    readonly image_rights: string | null;
    readonly is_in_auction: boolean | null;
    readonly is_acquireable: boolean | null;
    readonly is_shareable: boolean | null;
    readonly meta_image: {
        readonly resized: {
            readonly width: number | null;
            readonly height: number | null;
            readonly url: string | null;
        } | null;
    } | null;
    readonly meta: {
        readonly title: string | null;
        readonly description: string | null;
        readonly long_description: string | null;
    } | null;
    readonly context: ({
        readonly __typename: "Fair";
        readonly slug: string;
        readonly name: string | null;
    } | {
        /*This will never be '%other', but we need some
        value in case none of the concrete values match.*/
        readonly __typename: "%other";
    }) | null;
    readonly " $fragmentRefs": FragmentRefs<"SeoDataForArtwork_artwork">;
    readonly " $refType": "ArtworkMeta_artwork";
};
export type ArtworkMeta_artwork$data = ArtworkMeta_artwork;
export type ArtworkMeta_artwork$key = {
    readonly " $data"?: ArtworkMeta_artwork$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkMeta_artwork">;
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
  "name": "ArtworkMeta_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
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
      "name": "internalID",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "date",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": "artist_names",
      "name": "artistNames",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": "sale_message",
      "name": "saleMessage",
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
    },
    {
      "kind": "ScalarField",
      "alias": "image_rights",
      "name": "imageRights",
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
      "alias": "is_acquireable",
      "name": "isAcquireable",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": "is_shareable",
      "name": "isShareable",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": "meta_image",
      "name": "image",
      "storageKey": null,
      "args": null,
      "concreteType": "Image",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "resized",
          "storageKey": "resized(height:640,version:[\"large\",\"medium\",\"tall\"],width:640)",
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 640
            },
            {
              "kind": "Literal",
              "name": "version",
              "value": [
                "large",
                "medium",
                "tall"
              ]
            },
            {
              "kind": "Literal",
              "name": "width",
              "value": 640
            }
          ],
          "concreteType": "ResizedImageUrl",
          "plural": false,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "width",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "height",
              "args": null,
              "storageKey": null
            },
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
      "kind": "LinkedField",
      "alias": null,
      "name": "meta",
      "storageKey": null,
      "args": null,
      "concreteType": "ArtworkMeta",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "title",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "description",
          "args": [
            {
              "kind": "Literal",
              "name": "limit",
              "value": 155
            }
          ],
          "storageKey": "description(limit:155)"
        },
        {
          "kind": "ScalarField",
          "alias": "long_description",
          "name": "description",
          "args": [
            {
              "kind": "Literal",
              "name": "limit",
              "value": 200
            }
          ],
          "storageKey": "description(limit:200)"
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
          "type": "Fair",
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "slug",
              "args": null,
              "storageKey": null
            },
            (v0/*: any*/)
          ]
        }
      ]
    },
    {
      "kind": "FragmentSpread",
      "name": "SeoDataForArtwork_artwork",
      "args": null
    }
  ]
};
})();
(node as any).hash = '3270b3c87f1d4d01b50b768608dc420e';
export default node;
