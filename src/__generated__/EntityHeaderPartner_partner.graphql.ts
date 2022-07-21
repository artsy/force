/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type EntityHeaderPartner_partner = {
    readonly internalID: string;
    readonly type: string | null;
    readonly slug: string;
    readonly href: string | null;
    readonly name: string | null;
    readonly initials: string | null;
    readonly locationsConnection: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly city: string | null;
            } | null;
        } | null> | null;
    } | null;
    readonly categories: ReadonlyArray<{
        readonly name: string | null;
        readonly slug: string;
    } | null> | null;
    readonly profile: {
        readonly avatar: {
            readonly cropped: {
                readonly src: string;
                readonly srcSet: string;
            } | null;
        } | null;
        readonly icon: {
            readonly cropped: {
                readonly src: string;
                readonly srcSet: string;
            } | null;
        } | null;
        readonly " $fragmentRefs": FragmentRefs<"FollowProfileButton_profile">;
    } | null;
    readonly " $refType": "EntityHeaderPartner_partner";
};
export type EntityHeaderPartner_partner$data = EntityHeaderPartner_partner;
export type EntityHeaderPartner_partner$key = {
    readonly " $data"?: EntityHeaderPartner_partner$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"EntityHeaderPartner_partner">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v2 = {
  "kind": "Literal",
  "name": "height",
  "value": 45
},
v3 = {
  "kind": "Literal",
  "name": "width",
  "value": 45
},
v4 = [
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
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "EntityHeaderPartner_partner",
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
      "name": "type",
      "storageKey": null
    },
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "href",
      "storageKey": null
    },
    (v1/*: any*/),
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
      "concreteType": "PartnerCategory",
      "kind": "LinkedField",
      "name": "categories",
      "plural": true,
      "selections": [
        (v1/*: any*/),
        (v0/*: any*/)
      ],
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
          "alias": "avatar",
          "args": null,
          "concreteType": "Image",
          "kind": "LinkedField",
          "name": "image",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": [
                (v2/*: any*/),
                (v3/*: any*/)
              ],
              "concreteType": "CroppedImageUrl",
              "kind": "LinkedField",
              "name": "cropped",
              "plural": false,
              "selections": (v4/*: any*/),
              "storageKey": "cropped(height:45,width:45)"
            }
          ],
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
              "args": [
                (v2/*: any*/),
                {
                  "kind": "Literal",
                  "name": "version",
                  "value": [
                    "untouched-png",
                    "large",
                    "square"
                  ]
                },
                (v3/*: any*/)
              ],
              "concreteType": "CroppedImageUrl",
              "kind": "LinkedField",
              "name": "cropped",
              "plural": false,
              "selections": (v4/*: any*/),
              "storageKey": "cropped(height:45,version:[\"untouched-png\",\"large\",\"square\"],width:45)"
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
})();
(node as any).hash = '7f4e8871facf3f86981d91a011a74e42';
export default node;
