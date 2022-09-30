/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PartnersFeaturedCarouselCell_profile = {
    readonly internalID: string;
    readonly owner: {
        readonly internalID?: string | undefined;
        readonly href?: string | null | undefined;
        readonly name?: string | null | undefined;
        readonly featuredShow?: {
            readonly href: string | null;
            readonly name: string | null;
            readonly status: string | null;
            readonly statusUpdate: string | null;
            readonly startAt: string | null;
            readonly endAt: string | null;
            readonly isOnlineExclusive: boolean;
            readonly location: {
                readonly city: string | null;
            } | null;
            readonly coverImage: {
                readonly resized: {
                    readonly src: string;
                    readonly srcSet: string;
                } | null;
            } | null;
        } | null | undefined;
    };
    readonly " $refType": "PartnersFeaturedCarouselCell_profile";
};
export type PartnersFeaturedCarouselCell_profile$data = PartnersFeaturedCarouselCell_profile;
export type PartnersFeaturedCarouselCell_profile$key = {
    readonly " $data"?: PartnersFeaturedCarouselCell_profile$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"PartnersFeaturedCarouselCell_profile">;
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
                      "storageKey": "resized(height:500,version:[\"normalized\",\"larger\",\"large\"])"
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
(node as any).hash = '4c89f00625fe836ba767808b0d5941b1';
export default node;
