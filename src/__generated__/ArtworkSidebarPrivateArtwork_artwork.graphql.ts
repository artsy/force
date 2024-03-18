/**
 * @generated SignedSource<<9ff3b27e80002ec2df5dd8b6de08f358>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type Visibility = "LISTED" | "UNLISTED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebarPrivateArtwork_artwork$data = {
  readonly additionalInformation: string | null | undefined;
  readonly partner: {
    readonly name: string | null | undefined;
    readonly slug: string;
  } | null | undefined;
  readonly visibilityLevel: Visibility | null | undefined;
  readonly " $fragmentType": "ArtworkSidebarPrivateArtwork_artwork";
};
export type ArtworkSidebarPrivateArtwork_artwork$key = {
  readonly " $data"?: ArtworkSidebarPrivateArtwork_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkSidebarPrivateArtwork_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkSidebarPrivateArtwork_artwork",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Partner",
      "kind": "LinkedField",
      "name": "partner",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "slug",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "visibilityLevel",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "additionalInformation",
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "36a3d135f0df1038a6b1277192d349dc";

export default node;
