/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type HomeFeaturedGalleriesRail_orderedSet = {
    readonly orderedItemsConnection: {
        readonly edges: ReadonlyArray<{
            readonly node: ({
                readonly __typename: "Profile";
                readonly internalID: string;
                readonly isFollowed: boolean | null;
                readonly name: string | null;
                readonly slug: string;
                readonly href: string | null;
                readonly location: string | null;
                readonly image: {
                    readonly cropped: {
                        readonly src: string;
                        readonly srcSet: string;
                        readonly width: number;
                        readonly height: number;
                    } | null;
                } | null;
                readonly " $fragmentRefs": FragmentRefs<"FollowProfileButton_profile">;
            } | {
                /*This will never be '%other', but we need some
                value in case none of the concrete values match.*/
                readonly __typename: "%other";
            }) | null;
        } | null> | null;
    };
    readonly " $refType": "HomeFeaturedGalleriesRail_orderedSet";
};
export type HomeFeaturedGalleriesRail_orderedSet$data = HomeFeaturedGalleriesRail_orderedSet;
export type HomeFeaturedGalleriesRail_orderedSet$key = {
    readonly " $data"?: HomeFeaturedGalleriesRail_orderedSet$data;
    readonly " $fragmentRefs": FragmentRefs<"HomeFeaturedGalleriesRail_orderedSet">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "HomeFeaturedGalleriesRail_orderedSet",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 20
        }
      ],
      "concreteType": "OrderedSetItemConnection",
      "kind": "LinkedField",
      "name": "orderedItemsConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "OrderedSetItemEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": null,
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "__typename",
                  "storageKey": null
                },
                {
                  "kind": "InlineFragment",
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
                      "name": "isFollowed",
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
                      "name": "location",
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
                              "value": 230
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
                          "storageKey": "cropped(height:230,width:325)"
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
                  "type": "Profile"
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "orderedItemsConnection(first:20)"
    }
  ],
  "type": "OrderedSet"
};
(node as any).hash = 'f8ae1e1bb759b8b9931b20689894a3fc';
export default node;
