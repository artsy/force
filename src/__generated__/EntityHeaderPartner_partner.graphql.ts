/**
 * @generated SignedSource<<bb979efba5ba37fa605790c1efefc883>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EntityHeaderPartner_partner$data = {
  readonly categories: ReadonlyArray<{
    readonly name: string | null | undefined;
    readonly slug: string;
  } | null | undefined> | null | undefined;
  readonly href: string | null | undefined;
  readonly initials: string | null | undefined;
  readonly internalID: string;
  readonly locationsConnection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly city: string | null | undefined;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly name: string | null | undefined;
  readonly profile: {
    readonly avatar: {
      readonly cropped: {
        readonly src: string;
        readonly srcSet: string;
      } | null | undefined;
    } | null | undefined;
    readonly icon: {
      readonly cropped: {
        readonly src: string;
        readonly srcSet: string;
      } | null | undefined;
    } | null | undefined;
    readonly internalID: string;
  } | null | undefined;
  readonly slug: string;
  readonly type: string | null | undefined;
  readonly " $fragmentType": "EntityHeaderPartner_partner";
};
export type EntityHeaderPartner_partner$key = {
  readonly " $data"?: EntityHeaderPartner_partner$data;
  readonly " $fragmentSpreads": FragmentRefs<"EntityHeaderPartner_partner">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = {
  "kind": "Literal",
  "name": "height",
  "value": 45
},
v4 = {
  "kind": "Literal",
  "name": "width",
  "value": 45
},
v5 = [
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
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "type",
      "storageKey": null
    },
    (v1/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "href",
      "storageKey": null
    },
    (v2/*: any*/),
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
        (v2/*: any*/),
        (v1/*: any*/)
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
        (v0/*: any*/),
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
                (v3/*: any*/),
                (v4/*: any*/)
              ],
              "concreteType": "CroppedImageUrl",
              "kind": "LinkedField",
              "name": "cropped",
              "plural": false,
              "selections": (v5/*: any*/),
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
                (v3/*: any*/),
                {
                  "kind": "Literal",
                  "name": "version",
                  "value": [
                    "untouched-png",
                    "large",
                    "square"
                  ]
                },
                (v4/*: any*/)
              ],
              "concreteType": "CroppedImageUrl",
              "kind": "LinkedField",
              "name": "cropped",
              "plural": false,
              "selections": (v5/*: any*/),
              "storageKey": "cropped(height:45,version:[\"untouched-png\",\"large\",\"square\"],width:45)"
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
})();

(node as any).hash = "1fa70f0591ef3f427adcdc0e0633bfe5";

export default node;
