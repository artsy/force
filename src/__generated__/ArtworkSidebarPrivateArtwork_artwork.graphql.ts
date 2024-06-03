/**
 * @generated SignedSource<<d89da0b7728563a90de16bc22d9fbdf3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebarPrivateArtwork_artwork$data = {
  readonly additionalInformation: string | null | undefined;
  readonly isUnlisted: boolean;
  readonly partner: {
    readonly name: string | null | undefined;
    readonly profile: {
      readonly isPubliclyVisible: boolean | null | undefined;
    } | null | undefined;
    readonly slug: string;
  } | null | undefined;
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
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Profile",
          "kind": "LinkedField",
          "name": "profile",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "isPubliclyVisible",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isUnlisted",
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

(node as any).hash = "b6f1139cf123a6d49a6d058ac6d93728";

export default node;
