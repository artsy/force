/**
 * @generated SignedSource<<b3c2776dc98f6814db5c553f06d71bc5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkActions_artwork$data = {
  readonly downloadableImageUrl: string | null;
  readonly isDownloadable: boolean | null;
  readonly isHangable: boolean | null;
  readonly partner: {
    readonly slug: string;
  } | null;
  readonly slug: string;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkActionsSaveButtonOld_artwork" | "ArtworkDownloadButton_artwork" | "ArtworkSharePanel_artwork" | "ViewInRoom_artwork">;
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
      "name": "ArtworkActionsSaveButtonOld_artwork"
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

(node as any).hash = "159ee4145e8bf1e64735d8563e639b0a";

export default node;
