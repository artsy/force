/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PartnerCell_partner = {
    readonly internalID: string;
    readonly slug: string;
    readonly name: string | null;
    readonly href: string | null;
    readonly initials: string | null;
    readonly locationsConnection: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly city: string | null;
            } | null;
        } | null> | null;
    } | null;
    readonly profile: {
        readonly isFollowed: boolean | null;
        readonly image: {
            readonly cropped: {
                readonly src: string;
                readonly srcSet: string;
            } | null;
        } | null;
        readonly " $fragmentRefs": FragmentRefs<"FollowProfileButton_profile">;
    } | null;
    readonly " $refType": "PartnerCell_partner";
};
export type PartnerCell_partner$data = PartnerCell_partner;
export type PartnerCell_partner$key = {
    readonly " $data"?: PartnerCell_partner$data;
    readonly " $fragmentRefs": FragmentRefs<"PartnerCell_partner">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PartnerCell_partner",
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
      "name": "slug",
      "storageKey": null
    },
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
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 15
        }
      ],
      "concreteType": "LocationConnection",
      "kind": "LinkedField",
      "name": "locationsConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "LocationEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Location",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "city",
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "locationsConnection(first:15)"
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
          "name": "isFollowed",
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
                  "value": 244
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
                  "value": 325
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
              "storageKey": "cropped(height:244,version:[\"wide\",\"large\",\"featured\",\"larger\"],width:325)"
            }
          ],
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "FollowProfileButton_profile"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Partner"
};
(node as any).hash = '495d4620a9747f42d1cb6fb93b7365d0';
export default node;
