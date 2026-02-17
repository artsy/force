/**
 * @generated SignedSource<<03e0507dec2fb4d3272c150728b36ed5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SettingsEditProfileImage_me$data = {
  readonly icon: {
    readonly cropped: {
      readonly src: string;
      readonly srcSet: string;
    } | null | undefined;
    readonly internalID: string | null | undefined;
    readonly versions: ReadonlyArray<string | null | undefined> | null | undefined;
  } | null | undefined;
  readonly initials: string | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"CollectorProfileHeaderAvatar_me">;
  readonly " $fragmentType": "SettingsEditProfileImage_me";
};
export type SettingsEditProfileImage_me$key = {
  readonly " $data"?: SettingsEditProfileImage_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"SettingsEditProfileImage_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SettingsEditProfileImage_me",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CollectorProfileHeaderAvatar_me"
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "initials",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Image",
      "kind": "LinkedField",
      "name": "icon",
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
          "args": null,
          "kind": "ScalarField",
          "name": "versions",
          "storageKey": null
        },
        {
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "cachePolicy",
              "value": "short"
            },
            {
              "kind": "Literal",
              "name": "height",
              "value": 100
            },
            {
              "kind": "Literal",
              "name": "width",
              "value": 100
            }
          ],
          "concreteType": "CroppedImageUrl",
          "kind": "LinkedField",
          "name": "cropped",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "src",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "srcSet",
              "storageKey": null
            }
          ],
          "storageKey": "cropped(cachePolicy:\"short\",height:100,width:100)"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "9f7f9830acf3ac274818021f942b5ba8";

export default node;
