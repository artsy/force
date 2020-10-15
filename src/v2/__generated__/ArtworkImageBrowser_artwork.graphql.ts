/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkImageBrowser_artwork = {
    readonly image_alt: string | null;
    readonly image: {
        readonly internalID: string | null;
    } | null;
    readonly images: ReadonlyArray<{
        readonly internalID: string | null;
        readonly uri: string | null;
        readonly placeholder: {
            readonly url: string;
        } | null;
        readonly aspectRatio: number;
        readonly is_zoomable: boolean | null;
        readonly is_default: boolean | null;
        readonly deepZoom: {
            readonly Image: {
                readonly xmlns: string | null;
                readonly Url: string | null;
                readonly Format: string | null;
                readonly TileSize: number | null;
                readonly Overlap: number | null;
                readonly Size: {
                    readonly Width: number | null;
                    readonly Height: number | null;
                } | null;
            } | null;
        } | null;
    } | null> | null;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkActions_artwork">;
    readonly " $refType": "ArtworkImageBrowser_artwork";
};
export type ArtworkImageBrowser_artwork$data = ArtworkImageBrowser_artwork;
export type ArtworkImageBrowser_artwork$key = {
    readonly " $data"?: ArtworkImageBrowser_artwork$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkImageBrowser_artwork">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkImageBrowser_artwork",
  "selections": [
    {
      "alias": "image_alt",
      "args": null,
      "kind": "ScalarField",
      "name": "formattedMetadata",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Image",
      "kind": "LinkedField",
      "name": "image",
      "plural": false,
      "selections": [
        (v0/*: any*/)
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Image",
      "kind": "LinkedField",
      "name": "images",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        {
          "alias": "uri",
          "args": [
            {
              "kind": "Literal",
              "name": "version",
              "value": [
                "large"
              ]
            }
          ],
          "kind": "ScalarField",
          "name": "url",
          "storageKey": "url(version:[\"large\"])"
        },
        {
          "alias": "placeholder",
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 30
            },
            {
              "kind": "Literal",
              "name": "version",
              "value": "small"
            },
            {
              "kind": "Literal",
              "name": "width",
              "value": 30
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
          "storageKey": "resized(height:30,version:\"small\",width:30)"
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "aspectRatio",
          "storageKey": null
        },
        {
          "alias": "is_zoomable",
          "args": null,
          "kind": "ScalarField",
          "name": "isZoomable",
          "storageKey": null
        },
        {
          "alias": "is_default",
          "args": null,
          "kind": "ScalarField",
          "name": "isDefault",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "DeepZoom",
          "kind": "LinkedField",
          "name": "deepZoom",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "DeepZoomImage",
              "kind": "LinkedField",
              "name": "Image",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "xmlns",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "Url",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "Format",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "TileSize",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "Overlap",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "DeepZoomImageSize",
                  "kind": "LinkedField",
                  "name": "Size",
                  "plural": false,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "Width",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "Height",
                      "storageKey": null
                    }
                  ],
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkActions_artwork"
    }
  ],
  "type": "Artwork"
};
})();
(node as any).hash = '20fbbc2e9bc8fb1c04cab4d72db8d396';
export default node;
