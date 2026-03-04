/**
 * @generated SignedSource<<e69eaa8d155f3538f048a59e47a2f391>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkActions_artwork$data = {
  readonly downloadableImageUrl: string | null | undefined;
  readonly isDownloadable: boolean | null | undefined;
  readonly isHangable: boolean | null | undefined;
  readonly isUnlisted: boolean;
  readonly partner: {
    readonly slug: string;
  } | null | undefined;
  readonly slug: string;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkActionsSaveButton_artwork" | "ArtworkDownloadButton_artwork" | "ArtworkSharePanel_artwork" | "ViewInRoom_artwork" | "useShouldShowCreateAlertCTA_artwork">;
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
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "useShouldShowCreateAlertCTA_artwork"
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isUnlisted",
      "storageKey": null
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

(node as any).hash = "075803f5f13a36bbcf2dec0cd22e8b82";

export default node;
