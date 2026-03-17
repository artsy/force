/**
 * @generated SignedSource<<af6e0f12bbadcff57759559bb8552444>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CellPartner_partner$data = {
  readonly href: string | null | undefined;
  readonly initials: string | null | undefined;
  readonly profile: {
    readonly image: {
      readonly cropped: {
        readonly src: string;
        readonly srcSet: string;
      } | null | undefined;
    } | null | undefined;
  } | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"EntityHeaderPartner_partner">;
  readonly " $fragmentType": "CellPartner_partner";
};
export type CellPartner_partner$key = {
  readonly " $data"?: CellPartner_partner$data;
  readonly " $fragmentSpreads": FragmentRefs<"CellPartner_partner">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CellPartner_partner",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "EntityHeaderPartner_partner"
    },
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
      "name": "initials",
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
                  "value": 334
                },
                {
                  "kind": "Literal",
                  "name": "version",
                  "value": [
                    "wide",
                    "large",
                    "featured",
                    "larger"
                  ]
                },
                {
                  "kind": "Literal",
                  "name": "width",
                  "value": 445
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
              "storageKey": "cropped(height:334,version:[\"wide\",\"large\",\"featured\",\"larger\"],width:445)"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Partner",
  "abstractKey": null
};

(node as any).hash = "4532457cf05e07c10799062ca93d89c0";

export default node;
