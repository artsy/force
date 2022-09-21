/**
 * @generated SignedSource<<5f2bec106f31dd5dd94146dd35b79126>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkActions_artwork$data = {
  readonly artists: ReadonlyArray<{
    readonly name: string | null;
  } | null> | null;
  readonly date: string | null;
  readonly dimensions: {
    readonly cm: string | null;
  } | null;
  readonly slug: string;
  readonly image: {
    readonly internalID: string | null;
    readonly url: string | null;
    readonly height: number | null;
    readonly width: number | null;
  } | null;
  readonly downloadableImageUrl: string | null;
  readonly is_downloadable: boolean | null;
  readonly is_hangable: boolean | null;
  readonly partner: {
    readonly slug: string;
  } | null;
  readonly title: string | null;
  readonly sale: {
    readonly is_closed: boolean | null;
    readonly is_auction: boolean | null;
  } | null;
  readonly is_saved: boolean | null;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkActionsSaveButton_artwork" | "ArtworkSharePanel_artwork" | "ViewInRoom_artwork">;
  readonly " $fragmentType": "ArtworkActions_artwork";
};
export type ArtworkActions_artwork$key = {
  readonly " $data"?: ArtworkActions_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkActions_artwork">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkActions_artwork",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkActionsSaveButton_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkSharePanel_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ViewInRoom_artwork"
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Artist",
      "kind": "LinkedField",
      "name": "artists",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "date",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "dimensions",
      "kind": "LinkedField",
      "name": "dimensions",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "cm",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Image",
      "kind": "LinkedField",
      "name": "image",
      "plural": false,
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
          "args": [
            {
              "kind": "Literal",
              "name": "version",
              "value": "larger"
            }
          ],
          "kind": "ScalarField",
          "name": "url",
          "storageKey": "url(version:\"larger\")"
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
          "name": "width",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "downloadableImageUrl",
      "storageKey": null
    },
    {
      "alias": "is_downloadable",
      "args": null,
      "kind": "ScalarField",
      "name": "isDownloadable",
      "storageKey": null
    },
    {
      "alias": "is_hangable",
      "args": null,
      "kind": "ScalarField",
      "name": "isHangable",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Partner",
      "kind": "LinkedField",
      "name": "partner",
      "plural": false,
      "selections": [
        (v0/*: any*/)
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
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
          "alias": "is_closed",
          "args": null,
          "kind": "ScalarField",
          "name": "isClosed",
          "storageKey": null
        },
        {
          "alias": "is_auction",
          "args": null,
          "kind": "ScalarField",
          "name": "isAuction",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": "is_saved",
      "args": null,
      "kind": "ScalarField",
      "name": "isSaved",
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
})();

(node as any).hash = "26c251982bdcff889e2e3995c70cc533";

export default node;
