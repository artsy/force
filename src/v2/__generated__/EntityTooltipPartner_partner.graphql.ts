/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type EntityTooltipPartner_partner = {
    readonly href: string | null;
    readonly profile: {
        readonly bio: string | null;
        readonly fullBio: string | null;
        readonly image: {
            readonly cropped: {
                readonly src: string;
                readonly srcSet: string;
                readonly width: number;
                readonly height: number;
            } | null;
        } | null;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"EntityHeaderPartner_partner">;
    readonly " $refType": "EntityTooltipPartner_partner";
};
export type EntityTooltipPartner_partner$data = EntityTooltipPartner_partner;
export type EntityTooltipPartner_partner$key = {
    readonly " $data"?: EntityTooltipPartner_partner$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"EntityTooltipPartner_partner">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "EntityTooltipPartner_partner",
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
      "concreteType": "Profile",
      "kind": "LinkedField",
      "name": "profile",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "bio",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "fullBio",
          "storageKey": null
        },
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
                  "value": 146
                },
                {
                  "kind": "Literal",
                  "name": "version",
                  "value": [
                    "wide",
                    "medium250x165"
                  ]
                },
                {
                  "kind": "Literal",
                  "name": "width",
                  "value": 260
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
                },
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
                }
              ],
              "storageKey": "cropped(height:146,version:[\"wide\",\"medium250x165\"],width:260)"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "EntityHeaderPartner_partner"
    }
  ],
  "type": "Partner",
  "abstractKey": null
};
(node as any).hash = '82bb31bb03b675a6c87f8734d20e1534';
export default node;
