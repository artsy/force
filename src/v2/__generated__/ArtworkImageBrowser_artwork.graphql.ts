/* tslint:disable */

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
            readonly url: string | null;
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
  "kind": "ScalarField",
  "alias": null,
  "name": "internalID",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "ArtworkImageBrowser_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": "image_alt",
      "name": "formattedMetadata",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "image",
      "storageKey": null,
      "args": null,
      "concreteType": "Image",
      "plural": false,
      "selections": [
        (v0/*: any*/)
      ]
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "images",
      "storageKey": null,
      "args": null,
      "concreteType": "Image",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        {
          "kind": "ScalarField",
          "alias": "uri",
          "name": "url",
          "args": [
            {
              "kind": "Literal",
              "name": "version",
              "value": [
                "large"
              ]
            }
          ],
          "storageKey": "url(version:[\"large\"])"
        },
        {
          "kind": "LinkedField",
          "alias": "placeholder",
          "name": "resized",
          "storageKey": "resized(height:30,version:\"small\",width:30)",
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
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "aspectRatio",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": "is_zoomable",
          "name": "isZoomable",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": "is_default",
          "name": "isDefault",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "deepZoom",
          "storageKey": null,
          "args": null,
          "concreteType": "DeepZoom",
          "plural": false,
          "selections": [
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "Image",
              "storageKey": null,
              "args": null,
              "concreteType": "DeepZoomImage",
              "plural": false,
              "selections": [
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "xmlns",
                  "args": null,
                  "storageKey": null
                },
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "Url",
                  "args": null,
                  "storageKey": null
                },
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "Format",
                  "args": null,
                  "storageKey": null
                },
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "TileSize",
                  "args": null,
                  "storageKey": null
                },
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "Overlap",
                  "args": null,
                  "storageKey": null
                },
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "Size",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "DeepZoomImageSize",
                  "plural": false,
                  "selections": [
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "name": "Width",
                      "args": null,
                      "storageKey": null
                    },
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "name": "Height",
                      "args": null,
                      "storageKey": null
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtworkActions_artwork",
      "args": null
    }
  ]
};
})();
(node as any).hash = '20fbbc2e9bc8fb1c04cab4d72db8d396';
export default node;
