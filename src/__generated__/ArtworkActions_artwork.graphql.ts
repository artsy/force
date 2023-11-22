/**
 * @generated SignedSource<<4a03a144628f59c5bc311759c99e2d03>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkActions_artwork$data = {
  readonly downloadableImageUrl: string | null | undefined;
  readonly isDownloadable: boolean | null | undefined;
  readonly isHangable: boolean | null | undefined;
  readonly partner: {
    readonly slug: string;
  } | null | undefined;
  readonly slug: string;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkActionsSaveButton_artwork" | "ArtworkDownloadButton_artwork" | "ArtworkSharePanel_artwork" | "ViewInRoom_artwork">;
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
  "argumentDefinitions": [
    {
      "defaultValue": false,
      "kind": "LocalArgument",
      "name": "includeAllImages"
    }
  ],
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
      "name": "ArtworkDownloadButton_artwork"
    },
    {
      "args": [
        {
          "kind": "Variable",
          "name": "includeAllImages",
          "variableName": "includeAllImages"
        }
      ],
      "kind": "FragmentSpread",
      "name": "ArtworkSharePanel_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ViewInRoom_artwork"
    },
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "downloadableImageUrl",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isDownloadable",
      "storageKey": null
    },
    {
      "alias": null,
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
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
})();

(node as any).hash = "b8fc70913bd27a735d1b1e5ab6e2fdfe";

export default node;
