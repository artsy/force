/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ShowPartnerEntityHeader_partner = {
    readonly type: string | null;
    readonly slug: string;
    readonly href: string | null;
    readonly name: string | null;
    readonly initials: string | null;
    readonly locations: ReadonlyArray<{
        readonly city: string | null;
    } | null> | null;
    readonly isDefaultProfilePublic: boolean | null;
    readonly profile: {
        readonly icon: {
            readonly url: string | null;
        } | null;
        readonly " $fragmentRefs": FragmentRefs<"FollowProfileButton_profile">;
    } | null;
    readonly " $refType": "ShowPartnerEntityHeader_partner";
};
export type ShowPartnerEntityHeader_partner$data = ShowPartnerEntityHeader_partner;
export type ShowPartnerEntityHeader_partner$key = {
    readonly " $data"?: ShowPartnerEntityHeader_partner$data;
    readonly " $fragmentRefs": FragmentRefs<"ShowPartnerEntityHeader_partner">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ShowPartnerEntityHeader_partner",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "type",
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
      "name": "href",
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
      "name": "initials",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Location",
      "kind": "LinkedField",
      "name": "locations",
      "plural": true,
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isDefaultProfilePublic",
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
          "name": "icon",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": [
                {
                  "kind": "Literal",
                  "name": "version",
                  "value": "square140"
                }
              ],
              "kind": "ScalarField",
              "name": "url",
              "storageKey": "url(version:\"square140\")"
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
  "type": "Partner",
  "abstractKey": null
};
(node as any).hash = '559fa2af9c8ba2f2a09c4ef0b839f940';
export default node;
