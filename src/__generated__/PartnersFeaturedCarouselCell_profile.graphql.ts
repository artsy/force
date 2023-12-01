/**
 * @generated SignedSource<<4c2d6a331558c75422cf77b3f4665b55>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PartnersFeaturedCarouselCell_profile$data = {
  readonly internalID: string;
  readonly owner: {
    readonly featuredShow?: {
      readonly coverImage: {
        readonly resized: {
          readonly src: string;
          readonly srcSet: string;
        } | null | undefined;
      } | null | undefined;
      readonly endAt: string | null | undefined;
      readonly href: string | null | undefined;
      readonly isOnlineExclusive: boolean;
      readonly location: {
        readonly city: string | null | undefined;
      } | null | undefined;
      readonly name: string | null | undefined;
      readonly startAt: string | null | undefined;
      readonly status: string | null | undefined;
      readonly statusUpdate: string | null | undefined;
    } | null | undefined;
    readonly href?: string | null | undefined;
    readonly internalID?: string;
    readonly name?: string | null | undefined;
  };
  readonly " $fragmentType": "PartnersFeaturedCarouselCell_profile";
};
export type PartnersFeaturedCarouselCell_profile$key = {
  readonly " $data"?: PartnersFeaturedCarouselCell_profile$data;
  readonly " $fragmentSpreads": FragmentRefs<"PartnersFeaturedCarouselCell_profile">;
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
  "name": "href",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = [
  {
    "kind": "Literal",
    "name": "format",
    "value": "MMM D"
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PartnersFeaturedCarouselCell_profile",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "owner",
      "plural": false,
      "selections": [
        {
          "kind": "InlineFragment",
          "selections": [
            (v0/*: any*/),
            (v1/*: any*/),
            (v2/*: any*/),
            {
              "alias": null,
              "args": null,
              "concreteType": "Show",
              "kind": "LinkedField",
              "name": "featuredShow",
              "plural": false,
              "selections": [
                (v1/*: any*/),
                (v2/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "status",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "statusUpdate",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": (v3/*: any*/),
                  "kind": "ScalarField",
                  "name": "startAt",
                  "storageKey": "startAt(format:\"MMM D\")"
                },
                {
                  "alias": null,
                  "args": (v3/*: any*/),
                  "kind": "ScalarField",
                  "name": "endAt",
                  "storageKey": "endAt(format:\"MMM D\")"
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "isOnlineExclusive",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "Location",
                  "kind": "LinkedField",
                  "name": "location",
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
                },
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "Image",
                  "kind": "LinkedField",
                  "name": "coverImage",
                  "plural": false,
                  "selections": [
                    {
                      "alias": null,
                      "args": [
                        {
                          "kind": "Literal",
                          "name": "height",
                          "value": 500
                        },
                        {
                          "kind": "Literal",
                          "name": "version",
                          "value": [
                            "main",
                            "normalized",
                            "larger",
                            "large"
                          ]
                        }
                      ],
                      "concreteType": "ResizedImageUrl",
                      "kind": "LinkedField",
                      "name": "resized",
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
                      "storageKey": "resized(height:500,version:[\"main\",\"normalized\",\"larger\",\"large\"])"
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
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Profile",
  "abstractKey": null
};
})();

(node as any).hash = "97c53e2f5d640a94d82f056242a2a1b9";

export default node;
