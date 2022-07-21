/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkMeta_artwork = {
    readonly href: string | null;
    readonly isShareable: boolean | null;
    readonly metaImage: {
        readonly resized: {
            readonly width: number | null;
            readonly height: number | null;
            readonly url: string;
        } | null;
    } | null;
    readonly meta: {
        readonly title: string | null;
        readonly description: string | null;
        readonly longDescription: string | null;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"SeoDataForArtwork_artwork" | "ArtworkZendesk_artwork">;
    readonly " $refType": "ArtworkMeta_artwork";
};
export type ArtworkMeta_artwork$data = ArtworkMeta_artwork;
export type ArtworkMeta_artwork$key = {
    readonly " $data"?: ArtworkMeta_artwork$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkMeta_artwork">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkMeta_artwork",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "href",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isShareable",
      "storageKey": null
    },
    {
      "alias": "metaImage",
      "args": null,
      "concreteType": "Image",
      "kind": "LinkedField",
      "name": "image",
      "plural": false,
      "selections": [
        {
          "alias": null,
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
          "kind": "LinkedField",
          "name": "resized",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "width",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "height",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "url",
              "storageKey": null
            }
          ],
          "storageKey": "resized(height:640,version:[\"large\",\"medium\",\"tall\"],width:640)"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ArtworkMeta",
      "kind": "LinkedField",
      "name": "meta",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "title",
          "storageKey": null
        },
        {
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "limit",
              "value": 155
            }
          ],
          "kind": "ScalarField",
          "name": "description",
          "storageKey": "description(limit:155)"
        },
        {
          "alias": "longDescription",
          "args": [
            {
              "kind": "Literal",
              "name": "limit",
              "value": 200
            }
          ],
          "kind": "ScalarField",
          "name": "description",
          "storageKey": "description(limit:200)"
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SeoDataForArtwork_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkZendesk_artwork"
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
(node as any).hash = '06d9ed8a7f9afd95cb581cb3b5adee60';
export default node;
